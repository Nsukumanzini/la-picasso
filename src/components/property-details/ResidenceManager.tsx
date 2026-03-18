type ResidenceManagerProps = {
  name: string;
  phone: string;
  email: string;
};

export default function ResidenceManager({
  name,
  phone,
  email,
}: ResidenceManagerProps) {
  return (
    <section className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
        Res Manager
      </p>
      <div className="mt-4 flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-picasso-light/60 to-white/40" />
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">{name}</h3>
          <p className="text-sm text-neutral-600">Available to assist daily</p>
        </div>
      </div>
      <div className="mt-4 space-y-1 text-sm text-neutral-700">
        <p>Phone: {phone}</p>
        <p>Email: {email}</p>
      </div>
    </section>
  );
}
