const steps = [
  {
    number: "01",
    title: "Check your vehicle + book online",
    body: "Enter your make and model to confirm compatibility and see your exact price. Pick a time that suits. No phone calls, no waiting for quotes.",
  },
  {
    number: "02",
    title: "We come to you",
    body: "Your installer arrives at your home, office, or wherever the car is parked. You don't need to go anywhere or leave the car anywhere.",
  },
  {
    number: "03",
    title: "Drive away upgraded",
    body: "Installation takes 45 minutes to 2 hours depending on the service. We tidy up, you test it, done. Looks and feels completely factory-fitted.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
      <p className="section-label">How it works</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-5 md:block">
            <p className="font-serif text-4xl md:text-5xl text-white/[0.08] leading-none mb-0 md:mb-4 flex-shrink-0 w-12 md:w-auto">
              {step.number}
            </p>
            <div>
              <h3 className="text-base font-medium text-upfit-text mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
