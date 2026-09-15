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
const input = "mt-2 h-12 w-full rounded-xl border border-[#d9ccc3] bg-white px-4 text-base text-neutral-900 outline-none focus:border-picasso-brown focus:ring-2 focus:ring-picasso-light";
const errorText = "mt-1 block text-sm text-rose-600";

export default function SimpleApplyClient() {
  const [sent, setSent] = React.useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });
  const onSubmit = () => setSent(true);

  if (sent) {
    return <div className="rounded-3xl border border-[#cfe3d3] bg-[#f3faf4] p-8 shadow-sm sm:p-10" role="status">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#287343]">Application received</p>
      <h2 className="mt-3 font-serif text-3xl text-neutral-900">Thanks — we have your details.</h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-neutral-600">Our team will contact you about your viewing and next steps. If you need help now, call +27 76 988 3928.</p>
    </div>;
  }

  return <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-[#e8dfd8] bg-white p-5 shadow-sm sm:p-8">
    <div className="flex flex-wrap items-center gap-2 border-b border-[#eee6e0] pb-6 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500"><span className="rounded-full bg-picasso-brown px-3 py-2 text-white">Step 1 · Your details</span><span>Step 2 · Residence</span><span>Step 3 · Proof</span></div>
    <section className="border-b border-[#eee6e0] py-7" aria-labelledby="details-heading"><p id="details-heading" className="text-lg font-semibold text-neutral-900">Tell us about yourself</p><p className="mt-1 text-sm text-neutral-600">We’ll use these details to contact you about your 2027 application.</p><div className="mt-5 grid gap-5 sm:grid-cols-2">{([['firstName','First name'],['lastName','Last name'],['email','Email address'],['phone','Phone number'],['nationalId','SA ID number']] as const).map(([name,label]) => <label key={name} className={name === "nationalId" ? "sm:col-span-2" : ""}>{label}<input {...register(name)} type={name === "email" ? "email" : "text"} autoComplete={name === "firstName" ? "given-name" : name === "lastName" ? "family-name" : name === "email" ? "email" : name === "phone" ? "tel" : "off"} className={input} />{errors[name] && <span className={errorText}>{errors[name]?.message as string}</span>}</label>)}</div></section>
    <section className="py-7" aria-labelledby="residence-heading"><p id="residence-heading" className="text-lg font-semibold text-neutral-900">Choose your next step</p><p className="mt-1 text-sm text-neutral-600">Pick a residence and tell us when you’d like to visit.</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><label>Preferred residence<select {...register("property")} className={input}><option value="">Select a residence</option>{propertyRecords.map((property) => <option key={property.id} value={property.slug}>{property.name}</option>)}</select>{errors.property && <span className={errorText}>{errors.property.message}</span>}</label><label>Preferred viewing<select {...register("viewingWindow")} className={input}><option value="">Select a time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select>{errors.viewingWindow && <span className={errorText}>{errors.viewingWindow.message}</span>}</label><label className="sm:col-span-2">NSFAS proof<span className="mt-2 block text-sm leading-6 text-neutral-600">Upload a PDF, photo or screenshot of your proof of funding. Maximum 10MB.</span><input {...register("nsfasProof")} type="file" accept="image/*,.pdf" className="mt-3 block w-full rounded-xl border border-dashed border-[#cdbfb5] bg-[#fbfaf8] p-4 text-sm" />{errors.nsfasProof && <span className={errorText}>{errors.nsfasProof.message as string}</span>}</label></div></section>
    <div className="flex flex-col gap-4 border-t border-[#eee6e0] pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-md text-sm leading-6 text-neutral-500">Your information is used only to process your accommodation enquiry.</p><button type="submit" disabled={isSubmitting} className="rounded-full bg-picasso-brown px-6 py-3 text-sm font-semibold text-white shadow-md shadow-picasso-brown/15 transition hover:-translate-y-0.5 hover:bg-[#3d2924] disabled:opacity-60">Send 2027 application</button></div>
  </form>;
}