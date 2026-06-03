import Link from "next/link";

const links = [
  { label: "Services", href: "/services" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Reviews", href: "/reviews" },
  { label: "Install with us", href: "/installers" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10 border-t border-white/[0.08]">
      {/* Mobile layout */}
      <div className="flex flex-col gap-5 md:hidden">
        <Link href="/" className="font-serif text-base text-upfit-muted">
          Up<span className="text-accent">Fit</span>
        </Link>
        <div className="flex flex-col gap-1.5">
          <a href="tel:1300877342" className="text-xs text-upfit-muted hover:text-accent transition-colors">
            1300 877 342
          </a>
          <a href="mailto:team@upfit.au" className="text-xs text-upfit-muted hover:text-accent transition-colors">
            team@upfit.au
          </a>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-upfit-muted hover:text-upfit-text transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-xs text-upfit-faint">
          © {new Date().getFullYear()} UpFit
        </p>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <Link href="/" className="font-serif text-base text-upfit-muted">
            Up<span className="text-accent">Fit</span>
          </Link>
          <a href="tel:1300877342" className="text-xs text-upfit-muted hover:text-accent transition-colors">
            1300 877 342
          </a>
          <a href="mailto:team@upfit.au" className="text-xs text-upfit-muted hover:text-accent transition-colors">
            team@upfit.au
          </a>
        </div>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-upfit-muted hover:text-upfit-text transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-xs text-upfit-muted">
          © {new Date().getFullYear()} UpFit
        </p>
      </div>
    </footer>
  );
}
