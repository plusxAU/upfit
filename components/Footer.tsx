import Link from "next/link";

const links = [
  { label: "Services", href: "/services" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Reviews", href: "/reviews" },
  { label: "Privacy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="px-10 py-7 flex items-center justify-between">
      <Link href="/" className="font-serif text-base text-upfit-muted">
        Up<span className="text-accent">Fit</span>
      </Link>

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
        © {new Date().getFullYear()} UpFit · ABN XX XXX XXX XXX
      </p>
    </footer>
  );
}
