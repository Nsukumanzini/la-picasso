type Review = {
  name: string;
  quote: string;
  rating: string;
};

type PropertyReviewsProps = {
  reviews: Review[];
};

export default function PropertyReviews({ reviews }: PropertyReviewsProps) {
  return (
    <section id="reviews" className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
        Reviews
      </p>
      <h2 className="mt-2 font-serif text-2xl text-neutral-900">
        What students say
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <div key={review.name} className="rounded-2xl border border-white/40 bg-white/70 p-4">
            <p className="text-sm text-neutral-700">&ldquo;{review.quote}&rdquo;</p>
            <div className="mt-3 flex items-center justify-between text-xs font-semibold text-neutral-800">
              <span>{review.name}</span>
              <span className="text-picasso-brown">{review.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
