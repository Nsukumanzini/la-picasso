"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

const labels: Record<string, string> = {
  submitted: "Under review",
  under_review: "Under review",
  shortlisted: "Under review",
  approved: "Approved",
  waitlisted: "Under review",
  declined: "Declined",
  withdrawn: "Declined",
};

type Lookup = {
  application_number: string;
  status: string;
  submitted_at: string;
  residence_name: string | null;
  review_notes: Array<{ body: string; created_at: string }> | null;
};

export default function ApplicationStatusChecker() {
  const [idNumber, setIdNumber] = useState("");
  const [result, setResult] = useState<Lookup | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function checkStatus(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = idNumber.trim();
    setResult(null);
    if (!/^\d{13}$/.test(value)) {
      setMessage("Enter your 13-digit South African ID number.");
      return;
    }
    setLoading(true);
    setMessage(null);
    const { data, error } = await supabase.rpc("lookup_application_status_by_id", { p_id_number: value });
    setLoading(false);
    if (error) {
      setMessage("We could not check your application right now. Please try again shortly.");
      return;
    }
    const application = (data?.[0] as Lookup | undefined) ?? null;
    if (!application) {
      setMessage("We could not find an application with that ID number.");
      return;
    }
    setResult(application);
  }

  return (
    <section id="check-status" className="rounded-3xl border border-[#e8dfd8] bg-white p-5 shadow-sm sm:p-8" aria-labelledby="status-heading">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-picasso-brown">Already applied?</p>
      <h2 id="status-heading" className="mt-2 font-serif text-3xl text-neutral-900">Check your application status</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">Enter the South African ID number used in your application to see your residence, status, applied date and any update shared by our staff.</p>
      <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={checkStatus}>
        <label className="flex-1">
          <span className="sr-only">South African ID number</span>
          <input value={idNumber} onChange={(event) => setIdNumber(event.target.value.replace(/\D/g, "").slice(0, 13))} inputMode="numeric" autoComplete="off" placeholder="13-digit South African ID number" className="h-12 w-full rounded-xl border border-[#d9ccc3] bg-white px-4 text-base text-neutral-900 outline-none transition focus:border-picasso-brown focus:ring-2 focus:ring-picasso-light" />
        </label>
        <button type="submit" disabled={loading} className="rounded-full bg-picasso-brown px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3d2924] disabled:opacity-60">{loading ? "Checking…" : "Check status"}</button>
      </form>
      {message ? <p role="status" className="mt-4 text-sm text-neutral-700">{message}</p> : null}
      {result ? <div className="mt-5 rounded-2xl border border-[#dbe7dd] bg-[#f3faf4] p-5 text-sm text-neutral-800"><p className="font-semibold text-[#287343]">{labels[result.status] ?? result.status}</p><p className="mt-1">Reference: {result.application_number}</p><p className="mt-1">Residence: {result.residence_name ?? "Not recorded"}</p><p className="mt-1">Applied: {new Intl.DateTimeFormat("en-ZA", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(result.submitted_at))}</p>{result.review_notes?.length ? <div className="mt-4 border-t border-[#cfe3d3] pt-4"><p className="font-semibold">Review updates</p><div className="mt-2 space-y-2">{result.review_notes.map((note, index) => <p key={`${note.created_at}-${index}`} className="rounded-xl bg-white/80 p-3 leading-6">{note.body}</p>)}</div></div> : null}</div> : null}
    </section>
  );
}
