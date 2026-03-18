"use client";

import { AnimatePresence, motion } from "framer-motion";

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-neutral-900/50 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md rounded-3xl border border-white/30 bg-white/90 p-6 text-center shadow-xl"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
          >
            <h3 className="font-serif text-2xl text-neutral-900">
              Application received
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Thank you for applying. Our team will contact you shortly with the
              next steps.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-picasso-brown px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white shadow-md"
              >
                Done
              </button>
              <a
                href="https://wa.me/27769883928?text=Hi%20La%20Picasso%2C%20I%20just%20applied%20and%20would%20love%20to%20follow%20up"
                className="rounded-full border border-picasso-brown/40 bg-white/80 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-picasso-brown"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp us
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
