import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-10 py-5 border-b border-white/[0.08]">
      <Link href="/" className="font-serif text-2xl tracking-tight text-upfit-text">
        Up<span className="text-accent">Fit</span>
      </Link>
      <div className="flex items-center gap-7">
        <Link href="/services" className="text-upfit-muted text-sm hover:text-upfit-text transition-colors">
          Services
        </Link>
        <Link href="/vehicles" className="text-upfit-muted text-sm hover:text-upfit-text transition-colors">
          Vehicles
        </Link>
        <Link href="/how-it-works" className="text-upfit-muted text-sm hover:text-upfit-text transition-colors">
          How it works
        </Link>
        <Link href="/reviews" className="text-upfit-muted text-sm hover:text-upfit-text transition-colors">
          Reviews
        </Link>
        <Link
          href="/book"
          className="bg-accent text-bg text-sm font-medium px-4 py-2 rounded-md hover:bg-accent-dark transition-colors"
        >
          Book an install
        </Link>
      </div>
    </nav>
  );
}
