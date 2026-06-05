import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import InstallerCalculator from "@/components/InstallerCalculator";
import InstallerApplicationForm from "@/components/InstallerApplicationForm";

export const metadata = {
  title: "Install with UpFit — Confirmed Installation Work, No Selling Required",
  description:
    "UpFit sends vetted mobile installers confirmed, pre-priced car accessory installation jobs across Australia. No quoting, no chasing, no lead fees.",
};

const existingFaq = [
  {
    q: "What kind of jobs does UpFit send?",
    a: "Head units, Apple CarPlay upgrades, parking sensors, reverse cameras, and dash cams. Each job is pre-booked by the customer and pre-priced based on the specific vehicle — you see the vehicle, service, and your install payout before you accept.",
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

const newFaq = [
  {
    q: "Is UpFit a lead platform?",
    a: "No. A lead platform sends you an enquiry and you quote, chase, and convert it yourself. UpFit sends confirmed installation jobs — the customer has already been quoted, charged a deposit, and scheduled. You accept the job or you don't.",
  },
  {
    q: "Do I pay UpFit a commission or lead fee?",
    a: "No. UpFit sells the installation to the customer, supplies the parts, and pays you a fixed install payout to complete the work. There is no fee deducted from your payout.",
  },
  {
    q: "What about hardware margin — I usually make money on parts too?",
    a: "On your own jobs, absolutely — keep doing that. UpFit jobs work differently: UpFit supplies the product, handles the quote, and pays you a fixed install payout. You're not buying or selling parts. The calculator above shows how UpFit compares to your real effective hourly earnings once all unpaid time is factored in.",
  },
  {
    q: "Can I keep doing my own jobs?",
    a: "Yes — UpFit works around your existing schedule. Accept the jobs that fit. Decline the ones that don't. Most installers use UpFit to fill quiet days with confirmed work, not replace their existing customer base.",
  },
];

const allFaq = [...existingFaq, ...newFaq];

const tableRows = [
  {
    label: "Who spends time and budget on customer acquisition",
    own: "You",
    upfit: "UpFit — powerful advertising across all locations",
    highlightInstall: false,
  },
  {
    label: "Who handles initial enquiry and questions",
    own: "You",
    upfit: "UpFit",
    highlightInstall: false,
  },
  {
    label: "Who maps the right solution to their vehicle",
    own: "You",
    upfit: "UpFit — vehicle-specific compatibility research, parts mapping and fitment verification",
    highlightInstall: false,
  },
  {
    label: "Who sources parts and checks availability",
    own: "You",
    upfit: "UpFit — parts ordered and delivered to the customer before you arrive",
    highlightInstall: false,
  },
  {
    label: "Who resolves compatibility issues before the job",
    own: "You",
    upfit: "UpFit — researched and confirmed before you see the job",
    highlightInstall: false,
  },
  {
    label: "Who builds the quote",
    own: "You",
    upfit: "UpFit",
    highlightInstall: false,
  },
  {
    label: "Who handles scheduling and reminders",
    own: "You",
    upfit: "UpFit",
    highlightInstall: false,
  },
  {
    label: "Who does the install",
    own: "You",
    upfit: "You",
    highlightInstall: true,
  },
  {
    label: "Time investment",
    own: "Finding + researching + selling + installing",
    upfit: "Installing only",
    highlightInstall: false,
  },
  {
    label: "Best for",
    own: "Building your own pipeline",
    upfit: "Filling available capacity",
    highlightInstall: false,
  },
];

const leftHandled = [
  "Answering customer questions",
  "Mapping the right solution to their vehicle",
  "Verifying parts compatibility",
  "Sourcing and ordering parts",
  "Building the quote",
  "Confirming the booking time",
];

const rightHandled = [
  "Sending customer reminders",
  "Rescheduling when needed",
  "Warranty coordination",
  "Post-install customer follow-up",
  "Managing disputes",
  "Customer support calls",
];

export default function InstallersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Mobile Car Accessory Installer",
    description:
      "UpFit is looking for experienced mobile car accessory installers across Australia. Install head units, parking sensors, dash cams, and reverse cameras. Jobs are confirmed and pre-priced — no quoting, no lead chasing. Get paid within 3 business days.",
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
      "No quoting or lead generation required. Confirmed pre-priced jobs. Guaranteed payment within 3 business days. Flexible schedule — accept only the jobs that suit you.",
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
          Booked installation work.
          <br />
          <em className="text-accent not-italic">No selling required.</em>
        </h1>
        <p className="text-upfit-muted text-base md:text-lg font-light leading-relaxed max-w-xl mb-8">
          Confirmed, pre-priced installation jobs sent directly to you. You show up and install.
        </p>
        <a href="#apply" className="btn-primary">
          Apply to join →
        </a>
      </section>

      {/* 2 — We do the selling */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <div className="max-w-3xl mx-auto">
          <p className="section-label">How it works</p>
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-upfit-text mb-6">
            We do the selling. You do the install.
          </h2>
          <p className="text-upfit-muted text-base leading-relaxed max-w-2xl">
            Most installers spend their week doing two jobs — finding work and doing work. UpFit removes
            the first one entirely. We generate the customer, answer their questions, map the right solution
            to their specific vehicle, source the parts, and confirm the booking. By the time you see the
            job, it&apos;s sold.
          </p>
        </div>
      </section>

      {/* 3 — Calculator */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">The numbers</p>
        <div className="max-w-3xl mx-auto">
          <InstallerCalculator />
        </div>
      </section>

      {/* 4 — What UpFit handles */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">What UpFit handles</p>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-upfit-muted mb-8">
            By the time a job reaches you, this has already happened:
          </p>
          <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
              <ul className="space-y-3">
                {leftHandled.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-upfit-muted">
                    <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 mt-3 md:mt-0">
                {rightHandled.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-upfit-muted">
                    <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-upfit-text font-medium text-sm">
            You see the job. You accept or decline. You install. That&apos;s it.
          </p>
        </div>
      </section>

      {/* 5 — What a job looks like */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">What a job looks like</p>
        <div className="max-w-3xl mx-auto">
          <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-6 max-w-sm">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs text-upfit-muted uppercase tracking-widest">Job #1042</span>
              <span className="text-xs bg-white/[0.06] text-upfit-muted px-2 py-0.5 rounded-full border border-white/[0.08]">
                Example
              </span>
            </div>
            <div className="space-y-3 mb-6">
              {[
                ["Vehicle", "2018 Suzuki Jimny JB74"],
                ["Service", "Apple CarPlay installation"],
                ["Location", "Parramatta NSW 2150"],
                ["Parts", "Supplied by UpFit — delivered to customer address"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-xs text-upfit-muted">{label}</span>
                  <span className="text-sm text-upfit-text">{value}</span>
                </div>
              ))}
              <div className="flex flex-col gap-0.5 pt-2 border-t border-white/[0.08]">
                <span className="text-xs text-upfit-muted">Payout</span>
                <span className="font-serif text-2xl text-accent">$150</span>
              </div>
            </div>
            <div className="flex gap-3 opacity-40 pointer-events-none select-none">
              <div className="flex-1 text-center text-xs py-2 rounded-lg bg-accent text-bg font-medium">
                Accept job
              </div>
              <div className="flex-1 text-center text-xs py-2 rounded-lg border border-white/[0.1] text-upfit-muted bg-bg-3">
                View details
              </div>
            </div>
          </div>
          <p className="text-xs text-upfit-muted mt-5">
            Install payout is confirmed upfront. No negotiating, no quoting, no surprises.
          </p>
        </div>
      </section>

      {/* 6 — Your customers vs UpFit customers */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Your customers vs UpFit customers</p>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-upfit-muted mb-8">
            UpFit doesn&apos;t interfere with your existing business. Your own customers stay yours.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-xs text-upfit-muted font-normal pb-3 pr-4 w-[40%]"></th>
                  <th className="text-left text-xs text-upfit-muted font-normal pb-3 pr-4 w-[30%]">
                    Your own customer
                  </th>
                  <th className="text-left text-xs text-upfit-muted font-normal pb-3 w-[30%]">
                    UpFit customer
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.label} className="border-t border-white/[0.06]">
                    <td className="py-3 pr-4 text-xs text-upfit-muted align-top leading-relaxed">
                      {row.label}
                    </td>
                    <td className="py-3 pr-4 align-top">
                      <span className={`text-xs leading-relaxed ${row.highlightInstall ? "font-semibold text-upfit-text" : "text-upfit-muted"}`}>
                        {row.own}
                      </span>
                    </td>
                    <td className="py-3 align-top">
                      <span className={`text-xs leading-relaxed ${row.highlightInstall ? "font-semibold text-accent" : "text-accent"}`}>
                        {row.upfit}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7 — FAQ */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Common questions</p>
        <div className="max-w-3xl mx-auto space-y-4">
          {allFaq.map((item) => (
            <div key={item.q} className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
              <h3 className="font-medium text-upfit-text mb-2 text-sm">{item.q}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8 — CTA */}
      <section id="apply" className="px-6 md:px-10 py-20 border-b border-white/[0.08]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4">
            Ready to receive UpFit jobs?
          </h2>
          <p className="text-upfit-muted mb-10 max-w-md leading-relaxed">
            We&apos;re building our installer network across Sydney, Melbourne, Brisbane, Perth and Adelaide.
            Express interest and we&apos;ll be in touch.
          </p>
          <InstallerApplicationForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
