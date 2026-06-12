import Link from "next/link";

const services = [
  {
    tag: "No screen replacement",
    title: "CarPlay Activation",
    description:
      "Add wireless CarPlay & Android Auto to your existing factory screen. No head unit replacement needed. Best for 2016+ vehicles.",
    fromPrice: 350,
    priceNote: "Module + installation · GST incl. · varies by vehicle",
    href: "/services/carplay-installation",
    time: "~1 hour",
  },
  {
    tag: "Most popular",
    title: "CarPlay & Android Auto Upgrade",
    description:
      "Full head unit replacement with a premium touchscreen. Wired cleanly using OEM harness adaptors. Installed at your door.",
    fromPrice: 450,
    priceNote: "Unit + installation · GST incl. · price varies by model",
    href: "/services/carplay-installation",
    time: "1.5–2 hours",
  },
  {
    tag: "Fast install",
    title: "Dashcam installation",
    description:
      "Front and rear dashcam hardwired and fitted cleanly. No loose cables. Done in under an hour.",
    fromPrice: 349,
    priceNote: "Front + rear cameras + installation · GST incl.",
    href: "/services/dashcam-installation",
    time: "~1 hour",
  },
  {
    tag: "45 min install",
    title: "Reverse camera",
    description:
      "Wired reverse camera integrated with your existing or new display. Crystal clear image, triggers on reverse.",
    fromPrice: 320,
    priceNote: "Camera + installation · GST incl.",
    href: "/services/reverse-camera-installation",
    time: "~45 minutes",
  },
  {
    tag: "Park with confidence",
    title: "Parking sensors",
    description:
      "Front and/or rear ultrasonic parking sensors with audible alert. Natural bundle with reverse camera.",
    fromPrice: 620,
    priceNote: "Sensors + installation · GST incl. · drilling required",
    href: "/services/parking-sensors",
    time: "1–1.5 hours",
  },
];

export default function Services() {
  return (
    <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
      <p className="section-label">Services — fixed pricing on supported models</p>

      {/* Mobile: stacked */}
      <div className="flex flex-col gap-3 md:hidden">
        {services.map((service) => (
          <div
            key={service.href}
            className="bg-bg-2 border border-white/[0.08] rounded-xl p-6 flex flex-col"
          >
            <p className="text-[11px] text-accent uppercase tracking-wider font-medium mb-3">
              {service.tag}
            </p>
            <h3 className="font-serif text-2xl font-normal leading-snug mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-upfit-muted leading-relaxed mb-4 flex-1">
              {service.description}
            </p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] text-upfit-faint uppercase tracking-wider mb-1">From</p>
                <p className="font-serif text-3xl leading-none text-upfit-text">${service.fromPrice}</p>
                <p className="text-xs text-upfit-muted mt-1">{service.priceNote}</p>
              </div>
              <Link
                href={service.href}
                className="text-sm text-accent font-medium border border-accent/25 px-4 py-2 rounded-md hover:bg-accent/[0.08] transition-all whitespace-nowrap"
              >
                See details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.href + service.title}
            className="bg-bg-2 border border-white/[0.08] rounded-xl p-8 flex flex-col hover:bg-bg-3 transition-colors"
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
              <p className="text-[10px] text-upfit-faint uppercase tracking-wider mb-1">From</p>
              <p className="font-serif text-[34px] leading-none text-upfit-text">${service.fromPrice}</p>
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
