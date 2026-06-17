import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — UpFit",
  description: "UpFit Australia Pty Ltd privacy policy — how we collect, use and protect your personal information.",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <main>
      <Nav />
      <section className="px-6 md:px-10 py-16 max-w-2xl">
        <h1 className="font-serif text-4xl font-normal mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-upfit-muted mb-10">
          Last updated: 17/06/2026 &nbsp;·&nbsp; UpFit Australia Pty Ltd ACN 699 128 606 ABN 79 699 128 606
        </p>

        <div className="space-y-10 text-sm text-upfit-muted leading-relaxed">
          {[
            {
              title: "1. Overview",
              content: (
                <>
                  <p>
                    UpFit Australia Pty Ltd (UpFit, we, us, our) is committed to protecting the
                    privacy of our customers, website visitors, and installer partners. This policy
                    explains how we collect, use, store, and disclose personal information in
                    accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles
                    (APPs).
                  </p>
                  <p className="mt-3">
                    By using our website or services, you agree to the collection and use of your
                    information as described in this policy.
                  </p>
                </>
              ),
            },
            {
              title: "2. What information we collect",
              content: (
                <>
                  <p>
                    We collect personal information necessary to provide our installation services.
                    This includes:
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Name, email address, and phone number</li>
                    <li>Vehicle details including make, model, year, and trim level</li>
                    <li>Service address or suburb for mobile installation jobs</li>
                    <li>
                      Payment information — processed securely by Stripe. UpFit does not store card
                      numbers or payment credentials
                    </li>
                    <li>
                      Communications with us including enquiry form submissions and emails
                    </li>
                    <li>
                      Website usage data including pages visited, device type, and browsing behaviour
                      collected via cookies and analytics tools
                    </li>
                  </ul>
                  <p className="mt-3">
                    We collect this information directly from you when you submit an enquiry, make a
                    booking, or contact us. We may also collect information when you interact with our
                    website.
                  </p>
                </>
              ),
            },
            {
              title: "3. Why we collect it",
              content: (
                <>
                  <p>We collect personal information to:</p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Process and manage your booking</li>
                    <li>Communicate with you about your appointment</li>
                    <li>Supply and arrange delivery of hardware to your address</li>
                    <li>
                      Coordinate installation services through our network of vetted installers
                    </li>
                    <li>
                      Send you a receipt, tax invoice, and warranty information after your job
                    </li>
                    <li>Respond to your enquiries and provide customer support</li>
                    <li>Improve our website and services</li>
                    <li>Meet our legal and regulatory obligations</li>
                  </ul>
                  <p className="mt-3">
                    We do not use your personal information for direct marketing without your consent.
                  </p>
                </>
              ),
            },
            {
              title: "4. Disclosure to installers",
              content: (
                <>
                  <p>
                    To fulfil your booking, we share a limited set of your personal information with
                    the installer assigned to your job. Installers receive only what is necessary to
                    complete the installation:
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Your first name</li>
                    <li>Contact phone number (provided within 48 hours of your appointment)</li>
                    <li>
                      Suburb or specific address (provided within 48 hours of your appointment)
                    </li>
                    <li>Vehicle details and service to be performed</li>
                    <li>Any relevant job notes you have provided</li>
                  </ul>
                  <p className="mt-3">
                    Installers do not receive your email address, payment details, or any information
                    beyond what is necessary for the job. All installers operate under a written
                    agreement with UpFit that prohibits them from using your personal information for
                    any purpose other than completing your UpFit job. They are required to handle your
                    information in accordance with applicable privacy laws.
                  </p>
                </>
              ),
            },
            {
              title: "5. Third party service providers",
              content: (
                <>
                  <p>We use trusted third party service providers to operate our business:</p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>
                      Stripe — payment processing. Stripe&apos;s privacy policy is available at{" "}
                      <a
                        href="https://stripe.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        stripe.com/privacy
                      </a>
                    </li>
                    <li>Resend — transactional email delivery</li>
                    <li>HubSpot — customer relationship management</li>
                    <li>Google Analytics — website analytics (anonymised)</li>
                    <li>Vercel — website hosting</li>
                  </ul>
                  <p className="mt-3">
                    These providers are contractually required to handle your information securely and
                    only for the purposes we specify.
                  </p>
                </>
              ),
            },
            {
              title: "6. Storage and security",
              content: (
                <>
                  <p>
                    Your personal information is stored securely on servers located in Australia or in
                    jurisdictions with equivalent privacy protections. We take reasonable steps to
                    protect your information from misuse, interference, loss, and unauthorised access,
                    modification, or disclosure.
                  </p>
                  <p className="mt-3">
                    Payment card information is never stored by UpFit. All payment processing is
                    handled by Stripe, which is PCI DSS compliant.
                  </p>
                </>
              ),
            },
            {
              title: "7. Cookies",
              content: (
                <p>
                  Our website uses cookies to improve your browsing experience and collect analytics
                  data. You can disable cookies through your browser settings, though some features of
                  our website may not function correctly if you do.
                </p>
              ),
            },
            {
              title: "8. Accessing and correcting your information",
              content: (
                <>
                  <p>
                    You have the right to request access to the personal information we hold about
                    you, and to ask us to correct any information that is inaccurate, incomplete, or
                    out of date.
                  </p>
                  <p className="mt-3">
                    To make a request, contact us at{" "}
                    <a href="mailto:team@upfit.au" className="text-accent hover:underline">
                      team@upfit.au
                    </a>
                    . We will respond within 30 days.
                  </p>
                </>
              ),
            },
            {
              title: "9. Complaints",
              content: (
                <>
                  <p>
                    If you believe we have breached the Australian Privacy Principles, you may lodge a
                    complaint with us at{" "}
                    <a href="mailto:team@upfit.au" className="text-accent hover:underline">
                      team@upfit.au
                    </a>
                    . We will investigate and respond within 30 days.
                  </p>
                  <p className="mt-3">
                    If you are not satisfied with our response, you may contact the Office of the
                    Australian Information Commissioner (OAIC) at{" "}
                    <a
                      href="https://www.oaic.gov.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      oaic.gov.au
                    </a>
                    .
                  </p>
                </>
              ),
            },
            {
              title: "10. Changes to this policy",
              content: (
                <p>
                  We may update this policy from time to time. The current version will always be
                  available at upfit.au/privacy. Material changes will be communicated via email to
                  customers with active bookings.
                </p>
              ),
            },
            {
              title: "11. Contact us",
              content: (
                <div className="space-y-1">
                  <p className="font-medium text-upfit-text">UpFit Australia Pty Ltd</p>
                  <p>ACN 699 128 606 · ABN 79 699 128 606</p>
                  <p>
                    Email:{" "}
                    <a href="mailto:team@upfit.au" className="text-accent hover:underline">
                      team@upfit.au
                    </a>
                  </p>
                  <p>
                    Phone:{" "}
                    <a href="tel:1300877342" className="text-accent hover:underline">
                      1300 877 342
                    </a>
                  </p>
                  <p>Website: upfit.au</p>
                </div>
              ),
            },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="text-base font-medium text-upfit-text mb-3">
                {section.title}
              </h2>
              {section.content}
            </div>
          ))}

          <p className="text-xs text-upfit-faint border-t border-white/[0.08] pt-6">
            This policy applies to UpFit Australia Pty Ltd ACN 699 128 606 and all services
            offered at upfit.au.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
