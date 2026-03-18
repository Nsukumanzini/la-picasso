import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import MobileBottomBar from "@/components/navigation/MobileBottomBar";
import GlobalBackButton from "@/components/navigation/GlobalBackButton";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { ToastProvider } from "@/components/ui/Toast";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lapicasso.co.za"),
  title: {
    default: "La Picasso Property Group (Pty) Ltd | Student Homes in [City]",
    template: "%s | La Picasso Property Group (Pty) Ltd",
  },
  description:
    "Premium student homes in [City] with modern features, secure living, and a campus-ready lifestyle.",
  keywords: [
    "Student homes",
    "La Picasso",
    "Student res",
    "Campus living",
    "[City]",
  ],
  openGraph: {
    title: "La Picasso Property Group (Pty) Ltd",
    description:
      "Premium student homes in [City] from La Picasso Property Group (Pty) Ltd.",
    type: "website",
    images: [
      {
        url: "/assets/og-default.jpeg",
        width: 1200,
        height: 630,
        alt: "La Picasso Property Group",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} bg-picasso-light/30 text-neutral-900 antialiased`}
      >
        <ToastProvider>
          <ScrollProgress />
          <Navbar />
          <GlobalBackButton />
          <main className="min-h-screen pt-24 pb-24">{children}</main>
          <Footer />
          <WhatsAppButton />
          <MobileBottomBar />
        </ToastProvider>
      </body>
    </html>
  );
}
