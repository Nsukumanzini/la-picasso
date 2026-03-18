"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Building2, Home, Images, Info, Phone } from "lucide-react";

type TabItem = {
  key: string;
  label: string;
  href: string;
  icon: typeof Home;
  external?: boolean;
  match?: (pathname: string) => boolean;
};

const tabs: TabItem[] = [
  {
    key: "home",
    label: "Home",
    href: "/",
    icon: Home,
    match: (pathname) => pathname === "/",
  },
  {
    key: "places",
    label: "Our Places",
    href: "/properties",
    icon: Building2,
    match: (pathname) => pathname.startsWith("/properties"),
  },
  {
    key: "gallery",
    label: "Gallery",
    href: "/gallery",
    icon: Images,
    match: (pathname) => pathname.startsWith("/gallery"),
  },
  {
    key: "about",
    label: "About",
    href: "/about",
    icon: Info,
    match: (pathname) => pathname.startsWith("/about"),
  },
  {
    key: "contact",
    label: "Contact",
    href: "/contact",
    icon: Phone,
    match: (pathname) => pathname.startsWith("/contact"),
  },
];

export default function MobileBottomBar() {
  const pathname = usePathname();
  const activeKey = useMemo(() => {
    const match = tabs.find((tab) => (tab.match ? tab.match(pathname) : false));
    return match?.key ?? "home";
  }, [pathname]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 block md:hidden">
      <div className="rounded-full bg-[#5D4037] px-4 py-3 shadow-2xl shadow-black/40">
        <div className="flex items-center text-[10px] font-semibold uppercase tracking-[0.08em]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeKey === tab.key;
            const content = (
              <div className="relative flex flex-1 flex-col items-center gap-1 text-center">
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -inset-x-3 -inset-y-2 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <motion.span
                  className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full ${
                    isActive ? "text-[#5D4037]" : "text-white/60"
                  }`}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.span>
                <span
                  className={`relative z-10 max-w-[64px] ${
                    isActive ? "text-[#5D4037]" : "text-white/60"
                  }`}
                >
                  {tab.label}
                </span>
              </div>
            );

            if (tab.external) {
              return (
                <a
                  key={tab.key}
                  href={tab.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={tab.key} href={tab.href} className="flex-1">
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
