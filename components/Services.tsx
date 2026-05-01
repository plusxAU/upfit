import Link from "next/link";

const services = [
  {
    tag: "Most popular",
    title: "Apple CarPlay & Android Auto",
    description:
      "Retrofit any supported vehicle with a factory-quality head unit. Wired cleanly, installed at your door.",
    fromPrice: 450,
    priceNote: "Unit + installation · GST incl. · price varies by model",
    href: "/services/carplay-installation",
    time: "1.5–2 hours",
  },
  {
    tag: "Fast install",
    title: "Dashcam installation",
    description:
      "Front and rear dashcam fitted and wired cleanly. No loose cables. Done in under an hour.",
    fromPrice: 280,
    priceNote: "Front + rear cameras + installation · GST incl.",
    href: "/services/dashcam-installation",
    time: "~1 hour",
  },
  {
    tag: "45 min install",
    title: "Reverse camera",
    description:
      "Wired reverse camera integrated with your existing display or a new screen. Crystal clear image.",
    fromPrice: 220,
    priceNote: "Camera + installation · GST incl.",
    href: "/services/reverse-camera-installation",
    time: "~45 minutes",
  },
];

export default function Services() {
  return (
    <section className="px-10 py-16 border-b border-white/[0.08]">
      <p className="section-label">Services — fixed pricing on supported models</p>

      <div className="grid grid-cols-3 divide-x divide-white/[0.08] border border-white/[0.08] rounded-xl overflow-hidden">
        {services.map((service) => (
          <div
            key={service.href}
            className="bg-bg-2 p-8 flex flex-col hover:bg-bg-3 transition-colors"
          >
            <p className="text-[11px] text-accent uppercase tracking-wider font-medium mb-5">
              {service.tag}
            </p>

            <h3 className="font-serif text-2xl font-normal leading-snug mb-3">
              {service.title}
            </h3>

            <p className="text-sm text-upfit-muted leading-relaxed mb-6 flex-1">
              {service.description}
            </p>

            <div className="mb-6">
              <p className="text-[10px] text-upfit-faint uppercase tracking-wider mb-1">
                From
              </p>
              <p className="font-serif text-[34px] leading-none text-upfit-text">
                ${service.fromPrice}
              </p>
              <p className="text-xs text-upfit-muted mt-1.5">{service.priceNote}</p>
            </div>

            <Link
              href={service.href}
              className="inline-flex items-center gap-1.5 text-sm text-accent font-medium border border-accent/25 px-4 py-2.5 rounded-md hover:bg-accent/[0.08] transition-all w-fit"
            >
              Check your vehicle →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
