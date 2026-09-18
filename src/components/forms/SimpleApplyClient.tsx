"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertyRecords } from "../properties/propertiesData";

const schema = z.object({
  property: z.string().min(1, "Choose a residence"),
  fullName: z.string().min(2, "Enter your full name"),
  surname: z.string().min(2, "Enter your surname"),
  idNumber: z.string().regex(/^\d{13}$/, "Enter your 13-digit South African ID number"),
  dateOfBirth: z.string().min(1, "Choose your date of birth"),
  gender: z.string().min(1, "Choose an option"),
  cellphone: z.string().min(9, "Enter a valid cellphone number"),
  guardianName: z.string().min(2, "Enter the parent or guardian name"),
  guardianCellphone: z.string().min(9, "Enter a valid parent or guardian cellphone number"),
  homeAddress: z.string().min(8, "Enter your home address"),
  declaration: z.literal(true, { errorMap: () => ({ message: "Please read and accept the declaration" }) }),
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
  const [slide, setSlide] = React.useState(0);
  const [declarationOpen, setDeclarationOpen] = React.useState(false);
  const { register, handleSubmit, trigger, control, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { declaration: false },
  });
  const selectedSlug = useWatch({ control, name: "property" });
  const selectedProperty = propertyRecords.find((property) => property.slug === selectedSlug) ?? propertyRecords[0];
  const selectedImages = imagesFor(selectedProperty);

  React.useEffect(() => {
    setSlide(0);
  }, [selectedSlug]);

  React.useEffect(() => {
    if (selectedImages.length < 2) return;
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % selectedImages.length), 1800);
    return () => window.clearInterval(timer);
  }, [selectedSlug, selectedImages.length]);

  const onSubmit = () => setSent(true);
  const goNext = async () => {
    const fields = step === 1
      ? ["property"]
      : step === 2
        ? ["fullName", "surname", "idNumber", "dateOfBirth", "gender", "cellphone"]
        : step === 3
          ? ["guardianName", "guardianCellphone"]
          : ["homeAddress", "declaration"];
    const valid = await trigger(fields as (keyof Values)[]);
    if (valid && step < 4) setStep((current) => (current + 1) as Step);
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
            <p className="mt-3 text-base leading-7 text-neutral-600">Thank you for applying. Our team will review your details and contact you using the cellphone number provided.</p>
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
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-[#e8dfd8] bg-white p-5 shadow-sm sm:p-8">
      <div className="flex items-center justify-between gap-3 border-b border-[#eee6e0] pb-6" aria-label="Application progress">
        <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-picasso-brown">Apply for 2027</p><p className="mt-1 text-sm text-neutral-600">Step {step} of 4</p></div>
        <div className="flex items-center gap-1.5 sm:gap-2">{steps.map((item) => <React.Fragment key={item.number}><span title={item.label} className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${step >= item.number ? "bg-picasso-brown text-white" : "bg-[#eee7e1] text-neutral-500"}`}>{item.number}</span>{item.number < 4 ? <span className={`h-px w-3 sm:w-8 ${step > item.number ? "bg-picasso-brown" : "bg-[#d9ccc3]"}`} /> : null}</React.Fragment>)}</div>
      </div>

      {step === 1 ? <section className="py-7" aria-labelledby="residence-heading"><p id="residence-heading" className="text-lg font-semibold text-neutral-900">Choose your residence</p><p className="mt-1 text-sm leading-6 text-neutral-600">Select a residence to see a quick slideshow before continuing.</p><div className="mt-5 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"><label>Residence<select {...register("property")} className={input}><option value="">Select a residence</option>{propertyRecords.map((property) => <option key={property.id} value={property.slug}>{property.name}</option>)}</select>{errors.property && <span className={errorText}>{errors.property.message}</span>}</label><div className="relative h-64 overflow-hidden rounded-2xl bg-[#eee7e1] sm:h-72">{selectedImages.slice(0, 6).map((image, index) => <img key={image} src={image} alt={`${selectedProperty.name} preview ${index + 1}`} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === slide % Math.min(selectedImages.length, 6) ? "opacity-100" : "opacity-0"}`} />)}<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5"><p className="font-semibold text-white">{selectedProperty.name}</p><p className="mt-1 text-xs text-white/85">Previewing the residence</p></div></div></div></section> : null}

      {step === 2 ? <section className="py-7" aria-labelledby="applicant-heading"><p id="applicant-heading" className="text-lg font-semibold text-neutral-900">Your details</p><p className="mt-1 text-sm text-neutral-600">Use the details exactly as they appear on your official records.</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><label>Full name/s<input {...register("fullName")} autoComplete="given-name" className={input} />{errors.fullName && <span className={errorText}>{errors.fullName.message}</span>}</label><label>Surname<input {...register("surname")} autoComplete="family-name" className={input} />{errors.surname && <span className={errorText}>{errors.surname.message}</span>}</label><label>South African ID number<input {...register("idNumber")} inputMode="numeric" autoComplete="off" className={input} />{errors.idNumber && <span className={errorText}>{errors.idNumber.message}</span>}</label><label>Date of birth<input {...register("dateOfBirth")} type="date" className={input} />{errors.dateOfBirth && <span className={errorText}>{errors.dateOfBirth.message}</span>}</label><label>Gender<select {...register("gender")} className={input}><option value="">Choose an option</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></select>{errors.gender && <span className={errorText}>{errors.gender.message}</span>}</label><label>Cellphone number<input {...register("cellphone")} type="tel" inputMode="tel" autoComplete="tel" className={input} />{errors.cellphone && <span className={errorText}>{errors.cellphone.message}</span>}</label></div></section> : null}

      {step === 3 ? <section className="py-7" aria-labelledby="guardian-heading"><p id="guardian-heading" className="text-lg font-semibold text-neutral-900">Parent or guardian contact</p><p className="mt-1 text-sm leading-6 text-neutral-600">Please provide someone we can contact if we need to confirm your application.</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><label>Parent/guardian name and surname<input {...register("guardianName")} autoComplete="name" className={input} />{errors.guardianName && <span className={errorText}>{errors.guardianName.message}</span>}</label><label>Parent/guardian cell number<input {...register("guardianCellphone")} type="tel" inputMode="tel" autoComplete="tel" className={input} />{errors.guardianCellphone && <span className={errorText}>{errors.guardianCellphone.message}</span>}</label></div></section> : null}

      {step === 4 ? <section className="py-7" aria-labelledby="address-heading"><p id="address-heading" className="text-lg font-semibold text-neutral-900">Home address and declaration</p><p className="mt-1 text-sm leading-6 text-neutral-600">Finish with your current home address and confirm that you understand the application.</p><label className="mt-5 block">Home address<textarea {...register("homeAddress")} rows={4} autoComplete="street-address" className="mt-2 w-full rounded-xl border border-[#d9ccc3] bg-white px-4 py-3 text-base text-neutral-900 outline-none transition focus:border-picasso-brown focus:ring-2 focus:ring-picasso-light" />{errors.homeAddress && <span className={errorText}>{errors.homeAddress.message}</span>}</label><div className="mt-6 rounded-2xl border border-[#eadfce] bg-[#fbf7ef] p-5"><button type="button" onClick={() => setDeclarationOpen((open) => !open)} className="text-left text-sm font-semibold text-picasso-brown underline underline-offset-4">Read the student declaration {declarationOpen ? "↑" : "↓"}</button>{declarationOpen ? <p className="mt-4 text-sm leading-7 text-neutral-700">I declare that the information provided in this application is true and complete to the best of my knowledge. I understand that submitting an application does not guarantee placement, and that La Picasso may contact me or my parent/guardian to verify the information supplied. I agree to follow the residence rules and provide any further information requested during the placement process.</p> : null}<label className="mt-5 flex items-start gap-3 text-sm leading-6 text-neutral-700"><input {...register("declaration")} type="checkbox" className="mt-1 h-5 w-5 rounded border-[#d9ccc3] accent-[#6c4435]" /> <span>I have read and understood the student declaration.</span></label>{errors.declaration && <span className={errorText}>{errors.declaration.message}</span>}</div></section> : null}

      <div className="flex flex-col-reverse gap-3 border-t border-[#eee6e0] pt-6 sm:flex-row sm:items-center sm:justify-between">{step > 1 ? <button type="button" onClick={() => setStep((current) => (current - 1) as Step)} className="rounded-full border border-picasso-brown/30 px-6 py-3 text-sm font-semibold text-picasso-brown transition hover:bg-[#fbf7ef]">Back</button> : <p className="max-w-md text-sm leading-6 text-neutral-500">No documents are required for this application enquiry.</p>}{step < 4 ? <button type="button" onClick={goNext} className="rounded-full bg-picasso-brown px-6 py-3 text-sm font-semibold text-white shadow-md shadow-picasso-brown/15 transition hover:-translate-y-0.5 hover:bg-[#3d2924]">Continue <span aria-hidden="true">→</span></button> : <button type="submit" disabled={isSubmitting} className="rounded-full bg-picasso-brown px-6 py-3 text-sm font-semibold text-white shadow-md shadow-picasso-brown/15 transition hover:-translate-y-0.5 hover:bg-[#3d2924] disabled:opacity-60">Submit application</button>}</div>
    </form>
  );
}
