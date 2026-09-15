"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertyRecords } from "../properties/propertiesData";

const schema = z.object({
  firstName: z.string().min(2, "Enter your first name"),
  lastName: z.string().min(2, "Enter your last name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(9, "Enter a valid phone number"),
  nationalId: z.string().regex(/^\d{13}$/, "Enter your 13-digit SA ID"),
  property: z.string().min(1, "Choose a residence"),
  viewingWindow: z.string().min(1, "Choose a viewing time"),
  nsfasProof: z.any()
    .refine((files) => files?.length > 0, "Upload your NSFAS proof")
    .refine((files) => !files?.[0] || files[0].size <= 10_000_000, "Keep the file under 10MB"),
});

type Values = z.infer<typeof schema>;
type Step = 1 | 2 | 3;
const input = "mt-2 h-12 w-full rounded-xl border border-[#d9ccc3] bg-white px-4 text-base text-neutral-900 outline-none focus:border-picasso-brown focus:ring-2 focus:ring-picasso-light";
const errorText = "mt-1 block text-sm text-rose-600";

const steps = [
  { number: 1, label: "Your details" },
  { number: 2, label: "Choose a home" },
  { number: 3, label: "Upload proof" },
] as const;

export default function SimpleApplyClient() {
  const [step, setStep] = React.useState<Step>(1);
  const [sent, setSent] = React.useState(false);
  const { register, handleSubmit, trigger, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema), mode: "onTouched" });
  const onSubmit = () => setSent(true);

  const goNext = async () => {
    const valid = step === 1
      ? await trigger(["firstName", "lastName", "email", "phone", "nationalId"])
      : await trigger(["property", "viewingWindow"]);
    if (valid) setStep((current) => (current + 1) as Step);
  };

  if (sent) {
    return <div className="rounded-3xl border border-[#cfe3d3] bg-[#f3faf4] p-8 shadow-sm sm:p-10" role="status">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#287343]">Application received</p>
      <h2 className="mt-3 font-serif text-3xl text-neutral-900">Thanks — we have your details.</h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-neutral-600">Our team will contact you about your viewing and next steps. If you need help now, call +27 76 988 3928.</p>
    </div>;
  }

  return <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-[#e8dfd8] bg-white p-5 shadow-sm sm:p-8">
    <div className="rounded-2xl border border-[#eadfce] bg-[#fbf7ef] p-5 sm:p-6"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-picasso-brown">Before you start</p><p className="mt-2 text-sm leading-6 text-neutral-700">Have these ready so your application is quick and complete:</p><ul className="mt-4 grid gap-3 text-sm text-neutral-700 sm:grid-cols-2"><li className="flex gap-2"><span className="font-semibold text-picasso-brown">01</span><span>Your first name and surname</span></li><li className="flex gap-2"><span className="font-semibold text-picasso-brown">02</span><span>Your 13-digit South African ID number</span></li><li className="flex gap-2"><span className="font-semibold text-picasso-brown">03</span><span>Your phone number and email address</span></li><li className="flex gap-2"><span className="font-semibold text-picasso-brown">04</span><span>Your NSFAS proof as a PDF, photo or screenshot</span></li></ul></div>
    <div className="mt-7 flex items-center justify-between gap-2 border-b border-[#eee6e0] pb-6" aria-label="Application progress">{steps.map((item) => <div key={item.number} className="flex items-center gap-2"><span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${step >= item.number ? "bg-picasso-brown text-white" : "bg-[#eee7e1] text-neutral-500"}`}>{item.number}</span><span className={`hidden text-xs font-semibold sm:inline ${step >= item.number ? "text-picasso-brown" : "text-neutral-500"}`}>{item.label}</span>{item.number < 3 ? <span className="mx-1 h-px w-5 bg-[#d9ccc3] sm:w-12" /> : null}</div>)}</div>
    {step === 1 ? <section className="py-7" aria-labelledby="details-heading"><p id="details-heading" className="text-lg font-semibold text-neutral-900">Step 1 · Tell us about yourself</p><p className="mt-1 text-sm text-neutral-600">We need your details so our team can contact you about your 2027 application.</p><div className="mt-5 grid gap-5 sm:grid-cols-2">{([['firstName','First name','given-name'],['lastName','Surname','family-name'],['email','Email address','email'],['phone','Phone number','tel'],['nationalId','South African ID number','off']] as const).map(([name,label,autoComplete]) => <label key={name} className={name === "nationalId" ? "sm:col-span-2" : ""}>{label}<input {...register(name)} type={name === "email" ? "email" : "text"} autoComplete={autoComplete} className={input} />{errors[name] && <span className={errorText}>{errors[name]?.message as string}</span>}</label>)}</div></section> : null}
    {step === 2 ? <section className="py-7" aria-labelledby="residence-heading"><p id="residence-heading" className="text-lg font-semibold text-neutral-900">Step 2 · Choose your home</p><p className="mt-1 text-sm text-neutral-600">Choose the residence you prefer and a convenient time for a viewing.</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><label>Preferred residence<select {...register("property")} className={input}><option value="">Select a residence</option>{propertyRecords.map((property) => <option key={property.id} value={property.slug}>{property.name}</option>)}</select>{errors.property && <span className={errorText}>{errors.property.message}</span>}</label><label>Preferred viewing<select {...register("viewingWindow")} className={input}><option value="">Select a time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select>{errors.viewingWindow && <span className={errorText}>{errors.viewingWindow.message}</span>}</label></div></section> : null}
    {step === 3 ? <section className="py-7" aria-labelledby="proof-heading"><p id="proof-heading" className="text-lg font-semibold text-neutral-900">Step 3 · Upload your NSFAS proof</p><p className="mt-1 text-sm leading-6 text-neutral-600">Upload your proof of funding so we can help match your application. Accepted formats: PDF, JPG, PNG or another common image format. Maximum 10MB.</p><label className="mt-5 block">NSFAS proof document<input {...register("nsfasProof")} type="file" accept="image/*,.pdf" className="mt-3 block w-full rounded-xl border border-dashed border-[#cdbfb5] bg-[#fbfaf8] p-4 text-sm" />{errors.nsfasProof && <span className={errorText}>{errors.nsfasProof.message as string}</span>}</label></section> : null}
    <div className="flex flex-col-reverse gap-3 border-t border-[#eee6e0] pt-6 sm:flex-row sm:items-center sm:justify-between">{step > 1 ? <button type="button" onClick={() => setStep((current) => (current - 1) as Step)} className="rounded-full border border-picasso-brown/30 px-6 py-3 text-sm font-semibold text-picasso-brown transition hover:bg-[#fbf7ef]">Back</button> : <p className="max-w-md text-sm leading-6 text-neutral-500">Your information is used only to process your accommodation enquiry.</p>}{step < 3 ? <button type="button" onClick={goNext} className="rounded-full bg-picasso-brown px-6 py-3 text-sm font-semibold text-white shadow-md shadow-picasso-brown/15 transition hover:-translate-y-0.5 hover:bg-[#3d2924]">Continue <span aria-hidden="true">→</span></button> : <button type="submit" disabled={isSubmitting} className="rounded-full bg-picasso-brown px-6 py-3 text-sm font-semibold text-white shadow-md shadow-picasso-brown/15 transition hover:-translate-y-0.5 hover:bg-[#3d2924] disabled:opacity-60">Send 2027 application</button>}</div>
  </form>;
}