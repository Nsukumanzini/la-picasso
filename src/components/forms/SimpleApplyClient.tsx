"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle, Phone, X } from "lucide-react";
import { propertyRecords } from "../properties/propertiesData";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  property: z.string().min(1, "Choose a residence"),
  hasStayedBefore: z.enum(["yes", "no"], { required_error: "Choose an option" }),
  previousProperty: z.string().optional(),
  fullName: z.string().min(2, "Enter your full name"),
  surname: z.string().min(2, "Enter your surname"),
  email: z.string().email("Enter a valid email address").or(z.literal("")),
  idNumber: z.string().regex(/^\d{13}$/, "Enter your 13-digit South African ID number"),
  dateOfBirth: z.string().min(1, "Choose your date of birth"),
  gender: z.string().min(1, "Choose an option"),
  cellphone: z.string().min(9, "Enter a valid cellphone number"),
  guardianName: z.string().min(2, "Enter the parent or guardian name"),
  guardianCellphone: z.string().min(9, "Enter a valid parent or guardian cellphone number"),
  street: z.string().min(3, "Enter your street address"),
  town: z.string().min(2, "Enter your town"),
  declaration: z.literal(true, { errorMap: () => ({ message: "Please read and accept the declaration" }) }),
}).superRefine((values, context) => {
  if (values.hasStayedBefore === "yes" && !values.previousProperty) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ["previousProperty"], message: "Choose the residence you stayed at" });
  }
});

type Values = z.infer<typeof schema>;
type Step = 1 | 2 | 3 | 4;

const input = "mt-2 h-12 w-full rounded-xl border border-[#d9ccc3] bg-white px-4 text-base text-neutral-900 outline-none transition focus:border-picasso-brown focus:ring-2 focus:ring-picasso-light";
const errorText = "mt-1 block text-sm text-rose-600";
const steps = [
  { number: 1, label: "Residence" },
  { number: 2, label: "Your details" },
  { number: 3, label: "Guardian" },
  { number: 4, label: "Address" },
] as const;

function imagesFor(property: (typeof propertyRecords)[number]) {
  return Array.from(new Set([
    property.mainImage,
    ...(property.gallery?.rooms ?? []),
    ...(property.gallery?.kitchen ?? []),
    ...(property.gallery?.sittingAreas ?? []),
    ...(property.gallery?.outside ?? []),
    ...(property.images ?? []),
  ])).filter(Boolean);
}

export default function SimpleApplyClient() {
  const [step, setStep] = React.useState<Step>(1);
  const [sent, setSent] = React.useState(false);
  const [submittedEmail, setSubmittedEmail] = React.useState("");
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [duplicateId, setDuplicateId] = React.useState<string | null>(null);
  const [slide, setSlide] = React.useState(0);
  const [declarationOpen, setDeclarationOpen] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const focusNextStep = React.useRef(false);
  const { register, handleSubmit, trigger, control, setValue, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { declaration: false },
  });
  const selectedSlug = useWatch({ control, name: "property" });
  const hasStayedBefore = useWatch({ control, name: "hasStayedBefore" });
  const selectedProperty = propertyRecords.find((property) => property.slug === selectedSlug) ?? propertyRecords[0];
  const selectedImages = imagesFor(selectedProperty);

  React.useEffect(() => {
    setSlide(0);
  }, [selectedSlug]);

  React.useEffect(() => {
    if (!focusNextStep.current) return;
    focusNextStep.current = false;

    window.requestAnimationFrame(() => {
      const firstField = formRef.current?.querySelector<HTMLElement>("input:not([type=hidden]), select, textarea");
      firstField?.closest("section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      firstField?.focus({ preventScroll: true });
    });
  }, [step]);

  React.useEffect(() => {
    if (selectedImages.length < 2) return;
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % selectedImages.length), 1800);
    return () => window.clearInterval(timer);
  }, [selectedSlug, selectedImages.length]);

  const onSubmit = async (values: Values) => {
    setSubmitError(null);
    try {
      const idNumber = values.idNumber.trim();
      const { data: existingApplications, error: lookupError } = await supabase.rpc("lookup_application_status_by_id", { p_id_number: idNumber });
      if (lookupError) throw lookupError;
      if (existingApplications?.length) {
        setDuplicateId(idNumber);
        return;
      }

      const propertySlugs = [values.property, values.previousProperty].filter(Boolean) as string[];
      const { data: properties, error: propertyError } = await supabase.from("properties").select("id, slug").in("slug", propertySlugs);
      const property = properties?.find((record) => record.slug === values.property);
      const previousProperty = properties?.find((record) => record.slug === values.previousProperty);
      if (propertyError || !property || (values.hasStayedBefore === "yes" && !previousProperty)) throw propertyError ?? new Error("Residence not found");

      const { error } = await supabase.from("applications").insert({
        first_name: values.fullName.trim(),
        last_name: values.surname.trim(),
        email: values.email.trim() || null,
        phone: values.cellphone.trim(),
        id_number: idNumber,
        date_of_birth: values.dateOfBirth,
        gender: values.gender,
        preferred_property_id: property.id,
        has_stayed_before: values.hasStayedBefore === "yes",
        previous_property_id: previousProperty?.id ?? null,
        parent_guardian_name: values.guardianName.trim(),
        parent_guardian_cellphone: values.guardianCellphone.trim(),
        street: values.street.trim(),
        town: values.town.trim(),
        home_address: `${values.street.trim()}, ${values.town.trim()}`,
        declaration_accepted: values.declaration,
      });

      if (error) throw error;
      setSubmittedEmail(values.email.trim());
      setSent(true);
    } catch {
      setSubmitError("We could not submit your application. Please try again.");
    }
  };
  const goNext = async () => {
    const fields = step === 1
      ? ["property", "hasStayedBefore", "previousProperty"]
      : step === 2
        ? ["fullName", "surname", "email", "idNumber", "dateOfBirth", "gender", "cellphone"]
        : step === 3
          ? ["guardianName", "guardianCellphone"]
          : ["street", "town", "declaration"];
    const valid = await trigger(fields as (keyof Values)[]);
    if (valid && step < 4) {
      focusNextStep.current = true;
      setStep((current) => (current + 1) as Step);
    }
  };

  if (sent) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-[#cfe3d3] bg-[#f3faf4] p-5 shadow-sm sm:p-8" role="status">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {["left-8 top-8", "left-1/4 top-16", "right-1/4 top-6", "right-10 top-24", "left-1/2 bottom-10", "right-1/3 bottom-16"].map((position, index) => <span key={position} className={`absolute ${position} h-7 w-5 animate-bounce rounded-full ${index % 3 === 0 ? "bg-[#ef806d]" : index % 3 === 1 ? "bg-[#e5b75b]" : "bg-[#6599b5]"}`} style={{ animationDelay: `${index * 120}ms`, animationDuration: "2.2s" }} />)}
        </div>
        <div className="relative grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#287343]">Application received</p>
            <h2 className="mt-3 font-serif text-3xl text-neutral-900">You’re on your way to {selectedProperty.name}.</h2>
            <p className="mt-3 text-base leading-7 text-neutral-600">Thank you for applying. Our team will review your details and contact you using the cellphone number provided{submittedEmail ? " and your email address" : ""}.</p>
            <button type="button" onClick={() => { setSent(false); setStep(1); }} className="mt-6 rounded-full bg-picasso-brown px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3d2924]">Start another application</button>
          </div>
          <div className="relative h-64 overflow-hidden rounded-2xl bg-neutral-200 sm:h-80">
            {selectedImages.slice(0, 5).map((image, index) => <img key={image} src={image} alt={`${selectedProperty.name} preview ${index + 1}`} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === slide % Math.min(selectedImages.length, 5) ? "opacity-100" : "opacity-0"}`} />)}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5"><p className="text-sm font-semibold text-white">A glimpse of your chosen residence</p></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-[#e8dfd8] bg-white p-5 shadow-sm sm:p-8">
      <div className="flex items-center justify-between gap-3 border-b border-[#eee6e0] pb-6" aria-label="Application progress">
        <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-picasso-brown">Apply for 2027</p><p className="mt-1 text-sm text-neutral-600">Step {step} of 4</p></div>
        <div className="flex items-center gap-1.5 sm:gap-2">{steps.map((item) => <React.Fragment key={item.number}><span title={item.label} className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${step >= item.number ? "bg-picasso-brown text-white" : "bg-[#eee7e1] text-neutral-500"}`}>{item.number}</span>{item.number < 4 ? <span className={`h-px w-3 sm:w-8 ${step > item.number ? "bg-picasso-brown" : "bg-[#d9ccc3]"}`} /> : null}</React.Fragment>)}</div>
      </div>

      {step === 1 ? <section className="py-7" aria-labelledby="residence-heading"><p id="residence-heading" className="text-lg font-semibold text-neutral-900">Your La Picasso residence</p><p className="mt-1 text-sm leading-6 text-neutral-600">Tell us whether you have stayed with La Picasso before, then choose the residence you would like to apply for.</p><fieldset className="mt-5"><legend className="text-sm font-semibold text-neutral-900">Are you currently staying, or have you previously stayed, at a La Picasso residence?</legend><div className="mt-3 flex flex-col gap-3 sm:flex-row"><label className="flex items-center gap-2 rounded-xl border border-[#d9ccc3] px-4 py-3 text-sm"><input {...register("hasStayedBefore")} type="radio" value="yes" /> Yes</label><label className="flex items-center gap-2 rounded-xl border border-[#d9ccc3] px-4 py-3 text-sm"><input {...register("hasStayedBefore")} type="radio" value="no" /> No</label></div>{errors.hasStayedBefore && <span className={errorText}>{errors.hasStayedBefore.message}</span>}</fieldset>{hasStayedBefore === "yes" ? <label className="mt-5 block">Which La Picasso residence did you stay at?<select {...register("previousProperty")} className={input}><option value="">Select the previous/current residence</option>{propertyRecords.map((property) => <option key={property.id} value={property.slug}>{property.name}</option>)}</select>{errors.previousProperty && <span className={errorText}>{errors.previousProperty.message}</span>}</label> : null}<div className="mt-5 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"><label>Which residence would you like to live in?<select {...register("property")} className={input}><option value="">Select a residence</option>{propertyRecords.map((property) => <option key={property.id} value={property.slug}>{property.name}</option>)}</select>{errors.property && <span className={errorText}>{errors.property.message}</span>}</label><div className="relative h-64 overflow-hidden rounded-2xl bg-[#eee7e1] sm:h-72">{selectedImages.slice(0, 6).map((image, index) => <img key={image} src={image} alt={`${selectedProperty.name} preview ${index + 1}`} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === slide % Math.min(selectedImages.length, 6) ? "opacity-100" : "opacity-0"}`} />)}<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5"><p className="font-semibold text-white">{selectedProperty.name}</p><p className="mt-1 text-xs text-white/85">Previewing the residence</p></div></div></div></section> : null}

      {step === 2 ? <section className="py-7" aria-labelledby="applicant-heading"><p id="applicant-heading" className="text-lg font-semibold text-neutral-900">Your details</p><p className="mt-1 text-sm text-neutral-600">Use the details exactly as they appear on your official records. Email is optional, but lets us send application updates.</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><label>Full name/s<input {...register("fullName")} autoComplete="given-name" className={input} />{errors.fullName && <span className={errorText}>{errors.fullName.message}</span>}</label><label>Surname<input {...register("surname")} autoComplete="family-name" className={input} />{errors.surname && <span className={errorText}>{errors.surname.message}</span>}</label><label>Email address <span className="text-neutral-500">(optional)</span><input {...register("email")} type="email" autoComplete="email" className={input} />{errors.email && <span className={errorText}>{errors.email.message}</span>}</label><label>South African ID number<input {...register("idNumber")} inputMode="numeric" autoComplete="off" className={input} />{errors.idNumber && <span className={errorText}>{errors.idNumber.message}</span>}</label><label>Date of birth<input {...register("dateOfBirth")} type="date" className={input} />{errors.dateOfBirth && <span className={errorText}>{errors.dateOfBirth.message}</span>}</label><label>Gender<select {...register("gender")} className={input}><option value="">Choose an option</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></select>{errors.gender && <span className={errorText}>{errors.gender.message}</span>}</label><label>Cellphone number<input {...register("cellphone")} type="tel" inputMode="tel" autoComplete="tel" className={input} />{errors.cellphone && <span className={errorText}>{errors.cellphone.message}</span>}</label></div></section> : null}

      {step === 3 ? <section className="py-7" aria-labelledby="guardian-heading"><p id="guardian-heading" className="text-lg font-semibold text-neutral-900">Parent or guardian contact</p><p className="mt-1 text-sm leading-6 text-neutral-600">Please provide someone we can contact if we need to confirm your application.</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><label>Parent/guardian name and surname<input {...register("guardianName")} autoComplete="name" className={input} />{errors.guardianName && <span className={errorText}>{errors.guardianName.message}</span>}</label><label>Parent/guardian cell number<input {...register("guardianCellphone")} type="tel" inputMode="tel" autoComplete="tel" className={input} />{errors.guardianCellphone && <span className={errorText}>{errors.guardianCellphone.message}</span>}</label></div></section> : null}

      {step === 4 ? <section className="py-7" aria-labelledby="address-heading"><p id="address-heading" className="text-lg font-semibold text-neutral-900">Home address and declaration</p><p className="mt-1 text-sm leading-6 text-neutral-600">Finish with your current home address and confirm that you understand the application.</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><label>Street<input {...register("street")} autoComplete="street-address" className={input} />{errors.street && <span className={errorText}>{errors.street.message}</span>}</label><label>Town<input {...register("town")} autoComplete="address-level2" className={input} />{errors.town && <span className={errorText}>{errors.town.message}</span>}</label></div><div className="mt-6 rounded-2xl border border-[#eadfce] bg-[#fbf7ef] p-5"><button type="button" onClick={() => setDeclarationOpen((open) => !open)} className="text-left text-sm font-semibold text-picasso-brown underline underline-offset-4">Read the student declaration {declarationOpen ? "↑" : "↓"}</button>{declarationOpen ? <p className="mt-4 text-sm leading-7 text-neutral-700">I declare that the information provided in this application is true and complete to the best of my knowledge. I understand that submitting an application does not guarantee placement, and that La Picasso may contact me or my parent/guardian to verify the information supplied. I agree to follow the residence rules and provide any further information requested during the placement process.</p> : null}<label className="mt-5 flex items-start gap-3 text-sm leading-6 text-neutral-700"><input {...register("declaration")} type="checkbox" className="mt-1 h-5 w-5 rounded border-[#d9ccc3] accent-[#6c4435]" /> <span>I have read and understood the student declaration.</span></label>{errors.declaration && <span className={errorText}>{errors.declaration.message}</span>}</div></section> : null}

      {submitError ? <p role="alert" className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{submitError}</p> : null}
      <div className="flex flex-col-reverse gap-3 border-t border-[#eee6e0] pt-6 sm:flex-row sm:items-center sm:justify-between">{step > 1 ? <button type="button" onClick={() => setStep((current) => (current - 1) as Step)} className="rounded-full border border-picasso-brown/30 px-6 py-3 text-sm font-semibold text-picasso-brown transition hover:bg-[#fbf7ef]">Back</button> : <p className="max-w-md text-sm leading-6 text-neutral-500">No documents are required for this application enquiry.</p>}{step < 4 ? <button type="button" onClick={goNext} className="rounded-full bg-picasso-brown px-6 py-3 text-sm font-semibold text-white shadow-md shadow-picasso-brown/15 transition hover:-translate-y-0.5 hover:bg-[#3d2924]">Continue <span aria-hidden="true">→</span></button> : <button type="submit" disabled={isSubmitting} className="rounded-full bg-picasso-brown px-6 py-3 text-sm font-semibold text-white shadow-md shadow-picasso-brown/15 transition hover:-translate-y-0.5 hover:bg-[#3d2924] disabled:opacity-60">Submit application</button>}</div>
      </form>

      {duplicateId ? <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 p-4" role="dialog" aria-modal="true" aria-labelledby="duplicate-id-title">
        <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
          <button type="button" onClick={() => setDuplicateId(null)} className="absolute right-4 top-4 rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900" aria-label="Close duplicate application message"><X className="h-5 w-5" /></button>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-picasso-brown">Application already received</p>
          <h2 id="duplicate-id-title" className="mt-2 font-serif text-3xl text-neutral-900">This ID number has already applied.</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">An application has already been received for ID number ending in {duplicateId.slice(-4)}. Please check its status, or use another ID number only if you are applying for a different student.</p>
          <p className="mt-4 rounded-2xl bg-[#fbf7ef] p-4 text-sm leading-6 text-neutral-700">To change a residence or any application information, please contact the La Picasso group. Do not submit a second application.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href={`/apply#check-status`} onClick={() => setDuplicateId(null)} className="rounded-full bg-picasso-brown px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#3d2924]">Check application status</a>
            <button type="button" onClick={() => { setValue("idNumber", ""); setDuplicateId(null); setStep(2); window.requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>("input[name='idNumber']")?.focus()); }} className="rounded-full border border-picasso-brown/30 px-5 py-3 text-sm font-semibold text-picasso-brown transition hover:bg-[#fbf7ef]">Use another ID</button>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <a href="https://wa.me/27769883928?text=Hello%2C%20I%20need%20to%20change%20my%20La%20Picasso%20application." target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1fb657]"><MessageCircle className="h-4 w-4" /> WhatsApp La Picasso</a>
            <a href="tel:+27769883928" className="flex items-center justify-center gap-2 rounded-full border border-picasso-brown/30 px-5 py-3 text-sm font-semibold text-picasso-brown transition hover:bg-[#fbf7ef]"><Phone className="h-4 w-4" /> Call La Picasso</a>
          </div>
        </div>
      </div> : null}
    </>
  );
}
