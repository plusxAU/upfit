"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Services", href: "/services" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Reviews", href: "/reviews" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-white/[0.08] relative z-50">
      {/* Main bar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-4 md:py-5">
        <Link
          href="/"
          className="font-serif text-xl md:text-2xl tracking-tight text-upfit-text flex-shrink-0"
        >
          Up<span className="text-accent">Fit</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-upfit-muted text-sm hover:text-upfit-text transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:0435508050"
            className="text-upfit-muted text-sm hover:text-accent transition-colors whitespace-nowrap"
          >
            0435 508 050
          </a>
          <Link
            href="/book"
            className="bg-accent text-bg text-sm font-medium px-4 py-2 rounded-md hover:bg-accent-dark transition-colors whitespace-nowrap"
          >
            Book an install
          </Link>
        </div>

        {/* Mobile: Book CTA + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/book"
            className="bg-accent text-bg text-xs font-medium px-3 py-1.5 rounded-md hover:bg-accent-dark transition-colors whitespace-nowrap"
          >
            Book now
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="text-upfit-muted p-1 hover:text-upfit-text transition-colors"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden border-t border-white/[0.08] bg-bg-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-sm text-upfit-muted hover:text-upfit-text border-b border-white/[0.06] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 py-4">
            <a
              href="tel:0435508050"
              className="block text-sm text-upfit-muted hover:text-accent transition-colors mb-3"
            >
              Call 0435 508 050
            </a>
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="block bg-accent text-bg text-sm font-medium px-4 py-3 rounded-md hover:bg-accent-dark transition-colors text-center"
            >
              Book an install
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
