import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import InstallerCalculator from "@/components/InstallerCalculator";
import InstallerApplicationForm from "@/components/InstallerApplicationForm";

export const metadata = {
  title: "Join Our Installer Network | Mobile Car Accessory Installer Jobs — UpFit",
  description:
    "UpFit sends pre-booked, pre-priced car accessory installation jobs to vetted mobile installers across Australia. No quoting, no chasing leads — just clean installs and guaranteed pay within 3 business days.",
};

const faq = [
  {
    q: "What kind of jobs does UpFit send?",
    a: "Head units, Apple CarPlay upgrades, parking sensors, reverse cameras, and dash cams. Each job is pre-booked by the customer and pre-priced based on the specific vehicle — you see the vehicle, service, and your pay rate before you accept.",
  },
  {
    q: "Do I need to quote or chase leads?",
    a: "No. We handle all customer acquisition, quoting, and payment. You receive a confirmed job with all the details — you just show up and install.",
  },
  {
    q: "How and when do I get paid?",
    a: "Within 3 business days of completing the job, every time. No invoicing, no waiting on customers to pay.",
  },
  {
    q: "What areas are you currently sending jobs in?",
    a: "We're building our network across Sydney, Melbourne, Brisbane, Perth, and Adelaide, with more regions coming. Apply regardless of location — if we're not active in your area yet, you'll be first in line when we expand.",
  },
  {
    q: "Do I need a workshop, or can I be fully mobile?",
    a: "Both work. Most of our installers are mobile — they go to the customer's home or workplace. If you have a workshop that's also fine.",
  },
  {
    q: "Is there a minimum number of jobs I need to take?",
    a: "No. You choose which jobs to accept based on your availability. We work around your schedule.",
  },
];

export default function InstallersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Mobile Car Accessory Installer",
    description:
      "UpFit is looking for experienced mobile car accessory installers across Australia. Install head units, parking sensors, dash cams, and reverse cameras. Jobs are pre-booked and pre-priced — no quoting, no lead chasing. Get paid within 3 business days.",
    hiringOrganization: {
      "@type": "Organization",
      name: "UpFit",
      sameAs: "https://upfit.au",
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Australia",
    },
    employmentType: "CONTRACTOR",
    datePosted: "2026-01-01",
    jobBenefits:
      "No quoting or lead generation required. Pre-booked jobs. Guaranteed payment within 3 business days. Flexible schedule — accept only the jobs that suit you.",
    responsibilities:
      "Install car accessories including head units, parking sensors, dash cams, and reverse cameras at customer locations across Australia.",
    qualifications:
      "Experience installing car electronics. Ability to work independently. Own tools and transport.",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      {/* 1 — Hero */}
      <section className="px-6 md:px-10 py-16 md:py-24 border-b border-white/[0.08] max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Installer partnership · Australia-wide
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-normal leading-tight mb-5">
          Pre-booked installs,
          <br />
          <em className="text-accent not-italic">no quoting required.</em>
        </h1>
        <p className="text-upfit-muted text-base md:text-lg font-light leading-relaxed max-w-xl mb-8">
          UpFit connects vetted mobile car accessory installers with confirmed, pre-priced jobs across Australia.
          You focus on the install — we handle the customers, quoting, and payment.
        </p>
        <a
          href="#apply"
          className="btn-primary"
        >
          Apply to join →
        </a>
      </section>

      {/* 2 — Who we're looking for */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Who we&apos;re looking for</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            {
              title: "Mobile installers",
              body: "You travel to customers — home, workplace, wherever suits them. You bring your own tools and work independently.",
            },
            {
              title: "Auto electricians",
              body: "You already have the skills. UpFit gives you a reliable pipeline of car electronics jobs without the sales overhead.",
            },
            {
              title: "Workshop techs",
              body: "You have a fixed location and want to fill quiet days with confirmed bookings rather than waiting on walk-ins.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
              <h3 className="font-medium text-upfit-text mb-2">{item.title}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto mt-6">
          <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
            <p className="text-xs text-upfit-muted uppercase tracking-widest mb-3">Services we send</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Head units", "Apple CarPlay upgrades", "Android Auto", "Parking sensors",
                "Reverse cameras", "Dash cams", "Speakers & amplifiers",
              ].map((tag) => (
                <span key={tag} className="text-xs bg-bg-4 text-upfit-muted px-3 py-1 rounded-full border border-white/[0.06]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Calculator */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">What&apos;s your time actually worth?</p>
        <p className="text-sm text-upfit-muted max-w-3xl mx-auto mb-10 -mt-6">
          Many installers are earning significantly less per hour than they think, once quoting overhead is factored in.
        </p>
        <div className="max-w-3xl mx-auto">
          <InstallerCalculator />
        </div>
      </section>

      {/* 4 — How it works */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">How it works</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            {
              step: "01",
              title: "We send you the job",
              body: "Pre-booked, pre-priced, customer confirmed. You see the vehicle, service, and your pay before you accept.",
            },
            {
              step: "02",
              title: "You do what you&apos;re good at",
              body: "Show up, install, done. No quoting, no chasing, no admin. Just clean installs.",
            },
            {
              step: "03",
              title: "You get paid",
              body: "Within 3 business days of completion, every time. No invoicing, no waiting on customers.",
            },
          ].map((item) => (
            <div key={item.step} className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
              <p className="text-xs text-accent uppercase tracking-widest mb-4">{item.step}</p>
              <h3 className="font-medium text-upfit-text mb-2" dangerouslySetInnerHTML={{ __html: item.title }} />
              <p className="text-sm text-upfit-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 — FAQ */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Common questions</p>
        <div className="max-w-3xl mx-auto space-y-4">
          {faq.map((item) => (
            <div key={item.q} className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
              <h3 className="font-medium text-upfit-text mb-2 text-sm">{item.q}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 — Application form */}
      <section id="apply" className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Apply to join</p>
        <div className="max-w-3xl mx-auto mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-3">Sound like a fit?</h2>
          <p className="text-upfit-muted max-w-md">
            Tell us a bit about yourself and how you work. We&apos;ll review your application and be in touch within a couple of business days.
          </p>
        </div>
        <InstallerApplicationForm />
      </section>

      <Footer />
    </main>
  );
}
