import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — UpFit",
  description: "UpFit privacy policy — how we collect and use your information.",
};

export default function PrivacyPage() {
  return (
    <main>
      <Nav />
      <section className="px-10 py-16 max-w-2xl">
        <h1 className="font-serif text-4xl font-normal mb-10">Privacy policy</h1>
        <div className="space-y-8 text-sm text-upfit-muted leading-relaxed">
          {[
            {
              title: "Information we collect",
              body: "When you book a service, we collect your name, mobile number, email address, and installation address. We also collect your vehicle make, model, and year to confirm compatibility and dispatch the right installer.",
            },
            {
              title: "How we use your information",
              body: "We use your contact details to confirm your booking, send appointment reminders, and follow up after your install. Your address is shared only with your assigned installer for navigation purposes.",
            },
            {
              title: "Payment information",
              body: "Payments are processed securely through Stripe. UpFit does not store card numbers or payment credentials. All payment data is handled by Stripe in accordance with PCI DSS standards.",
            },
            {
              title: "Data sharing",
              body: "We do not sell your personal information. We share your booking details only with the installer assigned to your job. We use third-party services (Stripe for payments, Google for reviews) who have their own privacy policies.",
            },
            {
              title: "Contact",
              body: "For privacy-related questions, contact us at privacy@upfit.au",
            },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="text-base font-medium text-upfit-text mb-2">
                {section.title}
              </h2>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
