import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#3f2b25] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <p className="text-lg font-semibold tracking-wide">
            La Picasso Property Group
          </p>
          <p className="text-sm text-white/70">
            We are a student accommodation group with four (4) unique properties.
            All our properties are 100% NSFAS Accredited, and each one is situated within a short walking distance to the Ermelo campus.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Properties
          </p>
          <ul className="space-y-2 text-white/80">
            <li>
              <Link className="transition hover:text-white" href="/properties/legends-lodge">
                Legends Lodge
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/properties/la-picasso">
                La Picasso Guest House
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/properties/pablo">
                Pablo Guest house
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/properties/28">
                28 Genl Hertzog
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Quick Links
          </p>
          <ul className="space-y-2 text-white/80">
            <li>
              <Link className="transition hover:text-white" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/properties">
                Properties
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/gallery">
                Gallery
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/#faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/apply">
                Apply Now
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/properties">
                Virtual Tours
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Get in Touch
          </p>
          <ul className="space-y-2 text-white/80">
            <li>
              <a
                className="transition hover:text-white"
                href="https://www.google.com/maps/search/?api=1&query=37a%20Voortrekker%20St%2C%20Ermelo%2C%202351"
                target="_blank"
                rel="noreferrer"
              >
                37a Voortrekker St, Ermelo, 2351
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="mailto:alufabrico@outlook.com">
                lapicassoproperty.com
              </a>
            </li>
            <li>
              <a className="transition hover:text-white" href="tel:+27769883928">
                +27 76 988 3928
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Business Hours
          </p>
          <ul className="space-y-2 text-white/80">
            <li>Mon-Fri: 08:30 - 20:00</li>
            <li>Sat: 08:30 - 17:00</li>
            <li>Sun: 08:30 - 14:30</li>
          </ul>
          <div className="pt-2 text-xs text-white/60">
            <Link className="transition hover:text-white" href="/privacy">
              Privacy Policy
            </Link>
            <span className="px-2">•</span>
            <Link className="transition hover:text-white" href="/terms">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/60">
        © 2026 La Picasso Property Group (Pty) Ltd. All rights reserved.
      </div>
    </footer>
  );
}
