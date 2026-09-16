import ApplyClient from "@/components/forms/SimpleApplyClient";

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-picasso-light/20 pb-24 pt-28">
      <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-picasso-brown">Apply for 2027 accommodation</p>
          <h1 className="font-serif text-4xl text-neutral-900">Your next step starts here.</h1>
          <p className="max-w-2xl text-base leading-7 text-neutral-600">Share your details, choose a residence and tell us what you need. Our team will guide you through the next steps—no documents are required for this first enquiry.</p>
        </header>
        <ApplyClient />
      </div>
    </div>
  );
}
