"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import SuccessModal from "./SuccessModal";
import { propertyRecords } from "../properties/propertiesData";

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(9, "Enter a valid phone number"),
  nationalId: z
    .string()
    .regex(/^\d{13}$/, "Enter a valid 13-digit SA ID"),
  property: z.string().min(1, "Select a property"),
  viewingWindow: z.string().min(1, "Select a viewing window"),
  funding: z.literal("NSFAS"),
  nsfasProof: z
    .any()
    .refine((files) => files && files.length > 0, "NSFAS proof is required"),
});

type FormValues = z.infer<typeof schema>;

const stepFields: Array<Array<keyof FormValues>> = [
  ["firstName", "lastName", "email", "phone", "nationalId"],
  ["property", "viewingWindow"],
  ["funding", "nsfasProof"],
];

const stepLabels = ["Details", "Visit", "NSFAS"];

type ApplicationWizardProps = {
  onPropertyChange?: (value: string) => void;
};

export default function ApplicationWizard({
  onPropertyChange,
}: ApplicationWizardProps) {
  const [step, setStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      funding: "NSFAS",
    },
  });

  const selectedPropertyValue = watch("property");
  const selectedProperty = useMemo(() => {
    return propertyRecords.find(
      (record) =>
        record.slug === selectedPropertyValue ||
        record.name === selectedPropertyValue
    );
  }, [selectedPropertyValue]);

  useEffect(() => {
    if (onPropertyChange) onPropertyChange(selectedPropertyValue);
  }, [onPropertyChange, selectedPropertyValue]);

  const progress = useMemo(() => ((step + 1) / stepFields.length) * 100, [step]);

  const nextStep = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((prev) => Math.min(prev + 1, stepFields.length - 1));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = () => {
    setIsSuccess(true);
    reset();
    setStep(0);
  };

  return (
    <div className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
          Book Your Spot
        </p>
        <h1 className="font-serif text-3xl text-neutral-900">
          Book your spot
        </h1>
        <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full bg-picasso-brown transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          {stepLabels.map((label, index) => (
            <span
              key={label}
              className={
                index === step
                  ? "text-picasso-brown"
                  : "text-neutral-400"
              }
            >
              {label}
              {index < stepLabels.length - 1 ? " •" : ""}
            </span>
          ))}
        </div>
      </div>

      <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                First Name
              </label>
              <input
                {...register("firstName")}
                className="mt-1 h-11 w-full rounded-xl border border-neutral-200 bg-white/80 px-3 text-sm text-neutral-800 outline-none focus:border-picasso-brown"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Last Name
              </label>
              <input
                {...register("lastName")}
                className="mt-1 h-11 w-full rounded-xl border border-neutral-200 bg-white/80 px-3 text-sm text-neutral-800 outline-none focus:border-picasso-brown"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="mt-1 h-11 w-full rounded-xl border border-neutral-200 bg-white/80 px-3 text-sm text-neutral-800 outline-none focus:border-picasso-brown"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Phone
              </label>
              <input
                {...register("phone")}
                className="mt-1 h-11 w-full rounded-xl border border-neutral-200 bg-white/80 px-3 text-sm text-neutral-800 outline-none focus:border-picasso-brown"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                SA ID
              </label>
              <input
                {...register("nationalId")}
                className="mt-1 h-11 w-full rounded-xl border border-neutral-200 bg-white/80 px-3 text-sm text-neutral-800 outline-none focus:border-picasso-brown"
              />
              {errors.nationalId && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.nationalId.message}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Preferred Property
              </label>
              <select
                {...register("property")}
                className="mt-1 h-11 w-full rounded-xl border border-neutral-200 bg-white/80 px-3 text-sm text-neutral-800 outline-none focus:border-picasso-brown"
              >
                <option value="">Select property</option>
                <option value="legends-lodge">Legends Lodge</option>
                <option value="la-picasso">La Picasso</option>
                <option value="pablo">Pablo</option>
                <option value="28">28</option>
              </select>
              {errors.property && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.property.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Preferred viewing window
              </label>
              <select
                {...register("viewingWindow")}
                className="mt-1 h-11 w-full rounded-xl border border-neutral-200 bg-white/80 px-3 text-sm text-neutral-800 outline-none focus:border-picasso-brown"
              >
                <option value="">Select window</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
              {errors.viewingWindow && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.viewingWindow.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <div className="rounded-2xl border border-white/40 bg-white/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Preview
                </p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="relative h-16 w-24 overflow-hidden rounded-xl bg-gradient-to-br from-picasso-light/60 to-white/40">
                    {selectedProperty?.mainImage ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${selectedProperty.mainImage})` }}
                      />
                    ) : null}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {selectedProperty?.name ?? "Select a res"}
                    </p>
                    <p className="text-xs text-neutral-600">
                      {selectedProperty?.distance ?? "Less than 2km to campus"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl border border-picasso-brown/30 bg-white/80 px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">
                  Need help?
                </span>
                <a
                  href="tel:+27769883928"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-picasso-brown"
                >
                  Call us now
                </a>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <input type="hidden" value="NSFAS" {...register("funding")} />
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Funding Source
              </label>
              <div className="mt-1 flex h-11 items-center rounded-xl border border-neutral-200 bg-white/80 px-3 text-sm font-semibold text-neutral-800">
                NSFAS Only
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                We process all funding directly with NSFAS.
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                NSFAS Funding Status / Proof
              </label>
              <input
                type="file"
                accept="image/*,application/pdf"
                {...register("nsfasProof")}
                className="mt-1 block w-full rounded-xl border border-neutral-200 bg-white/80 px-3 py-2 text-sm text-neutral-700 file:mr-4 file:rounded-full file:border-0 file:bg-picasso-brown file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:text-white"
              />
              <p className="mt-2 text-xs text-neutral-500">
                Upload your NSFAS status screenshot.
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                PDF/picture/screenshot, max 10MB.
              </p>
              {errors.nsfasProof && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.nsfasProof.message as string}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={prevStep}
            className="rounded-full border border-picasso-brown/40 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-picasso-brown"
            disabled={step === 0}
          >
            Back
          </button>
          {step < stepFields.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="rounded-full bg-picasso-brown px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-md"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-full bg-picasso-brown px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-md"
            >
              Apply Now
            </button>
          )}
        </div>
      </form>

      <SuccessModal isOpen={isSuccess} onClose={() => setIsSuccess(false)} />
    </div>
  );
}
