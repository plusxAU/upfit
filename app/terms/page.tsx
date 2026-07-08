import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — UpFit",
  description: "UpFit customer terms and conditions. Read before booking.",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <main>
      <Nav />
      <section className="px-6 md:px-10 py-16 max-w-2xl">
        <h1 className="font-serif text-4xl font-normal mb-2">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-upfit-muted mb-10">
          Last updated: July 2026 &nbsp;·&nbsp; Version 2.0 &nbsp;·&nbsp; Operated by: UpFit Australia Pty Ltd ABN 79 699 128 606
        </p>

        <div className="space-y-10 text-sm text-upfit-muted leading-relaxed">
          <p>
            By completing a booking with UpFit and ticking the acknowledgment
            checkbox at checkout, you agree to these Terms &amp; Conditions.
            Please read them before booking.
          </p>

          {[
            {
              title: "1. About UpFit",
              content: (
                <>
                  <p>
                    UpFit is a digital booking platform that connects customers
                    with independent, vetted car technology installers. UpFit
                    facilitates the booking, payment collection, hardware supply,
                    and coordination of installation services. The installation
                    service itself is performed by an independent contractor —
                    not by UpFit.
                  </p>
                  <p className="mt-3">
                    UpFit is not a party to the installation service agreement
                    between you and the attending installer.
                  </p>
                </>
              ),
            },
            {
              title: "2. How Payment Works",
              content: (
                <>
                  <h3 className="font-medium text-upfit-text mb-2">
                    2.1 Disclosed Billing Agent
                  </h3>
                  <p>
                    UpFit collects payment on behalf of the attending installer
                    as a disclosed billing agent. Your payment to UpFit
                    constitutes payment to the installer for their installation
                    services, less UpFit&apos;s platform commission which is
                    retained by UpFit for facilitating the booking.
                  </p>
                  <p className="mt-3">
                    The contract for installation services is formed directly
                    between you and the attending installer. UpFit&apos;s role is
                    limited to platform facilitation, payment collection,
                    hardware supply, and job coordination.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    2.2 Deposit and Balance
                  </h3>
                  <p>
                    A deposit of 50% of the total booking value is collected at
                    the time of booking. The remaining balance is charged
                    automatically upon confirmation of job completion. By
                    completing a booking, you authorise UpFit to store your
                    payment method and charge the balance on your behalf as agent
                    for the installer.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    2.3 Refunds
                  </h3>
                  <p>
                    Deposit refunds are available where a booking is cancelled
                    more than 48 hours before the scheduled appointment.
                    Cancellations within 48 hours of the scheduled appointment
                    may be subject to a cancellation fee of up to the full
                    deposit amount. Where UpFit or the installer cancels a
                    booking, a full refund of any deposit paid will be issued.
                  </p>
                </>
              ),
            },
            {
              title: "3. The Installation Service",
              content: (
                <>
                  <h3 className="font-medium text-upfit-text mb-2">
                    3.1 Independent Installers
                  </h3>
                  <p>
                    The installer attending your job is an independent contractor
                    operating their own business. All workmanship warranties and
                    liability for installation quality rest with the attending
                    installer.
                  </p>
                  <p className="mt-3">
                    UpFit takes reasonable steps to verify that installers hold
                    current public liability insurance of a minimum $5,000,000
                    at the time of onboarding. While UpFit maintains this
                    requirement, UpFit does not warrant that an installer&apos;s
                    insurance remains current at the time of your specific
                    booking. In the event of a claim arising from an
                    installer&apos;s lapsed insurance, UpFit&apos;s liability is
                    limited as set out in clause 6.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    3.2 Licensing and Qualifications
                  </h3>
                  <p>
                    UpFit takes reasonable steps to confirm that installers hold
                    the qualifications and licences required to perform
                    installation work in the relevant state or territory. UpFit
                    does not warrant that an installer&apos;s licences remain
                    current at the time of your specific booking.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    3.3 Workmanship
                  </h3>
                  <p>
                    If you are dissatisfied with the quality of installation work
                    performed, please notify UpFit within 48 hours of job
                    completion at{" "}
                    <a
                      href="mailto:team@upfit.au"
                      className="text-accent hover:underline"
                    >
                      team@upfit.au
                    </a>
                    . UpFit will facilitate communication between you and the
                    installer to resolve the issue. Where a workmanship defect is
                    confirmed, the attending installer is responsible for
                    rectification.
                  </p>
                  <p className="mt-3">
                    UpFit is not liable for the quality or outcome of
                    installation work performed by independent installers, except
                    to the extent that liability cannot be excluded under the
                    Australian Consumer Law.
                  </p>
                </>
              ),
            },
            {
              title: "4. Hardware and Products",
              content: (
                <>
                  <h3 className="font-medium text-upfit-text mb-2">
                    4.1 Supply by UpFit
                  </h3>
                  <p>
                    Where hardware is supplied by UpFit as part of your booking
                    (head units, dashcams, cameras, sensors, and associated
                    components), that hardware is sourced from authorised
                    Australian trade distributors including Kenwood, Pioneer, and
                    Aerpro.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    4.2 Hardware Warranties
                  </h3>
                  <p>
                    Hardware supplied by UpFit carries the manufacturer&apos;s
                    warranty applicable to that product. Warranty claims for
                    hardware defects are handled directly with the manufacturer
                    or their authorised service agent. UpFit will provide
                    reasonable assistance in facilitating warranty claims where
                    hardware was supplied as part of a booking.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    4.3 Hardware Compatibility
                  </h3>
                  <p>
                    UpFit takes reasonable care to specify hardware that is
                    compatible with your vehicle based on information provided at
                    the time of booking. Compatibility recommendations are made
                    on the basis of published fitment data and may not account
                    for non-standard vehicle configurations, previous
                    modifications, or variations within model years. Where a
                    compatibility issue is identified prior to or during
                    installation, the installer will notify you before
                    proceeding.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    4.4 Liability for Hardware
                  </h3>
                  <p>
                    To the extent permitted by law, UpFit&apos;s liability in
                    relation to hardware supplied is limited to the cost of
                    replacement of the relevant hardware item. UpFit is not
                    liable for any consequential loss arising from a hardware
                    defect or incompatibility.
                  </p>
                </>
              ),
            },
            {
              title: "5. Booking and Cancellation",
              content: (
                <>
                  <h3 className="font-medium text-upfit-text mb-2">
                    5.1 Booking Confirmation
                  </h3>
                  <p>
                    A booking is confirmed upon receipt of your deposit payment
                    and a confirmation email from UpFit. UpFit reserves the
                    right to cancel or reschedule a booking where an installer is
                    unavailable, with reasonable notice provided to you and a
                    full refund of any deposit paid.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    5.2 Customer Obligations
                  </h3>
                  <p>
                    You agree to ensure the vehicle is accessible, in a safe
                    condition, and available for the full estimated duration of
                    the installation at the time and location specified. Where
                    the installer is unable to complete the installation due to
                    vehicle access issues or circumstances within your control, a
                    call-out fee may apply.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    5.3 Rescheduling
                  </h3>
                  <p>
                    Bookings may be rescheduled at no cost where notice is
                    provided more than 48 hours before the scheduled appointment.
                  </p>
                </>
              ),
            },
            {
              title: "6. Limitation of Liability",
              content: (
                <>
                  <h3 className="font-medium text-upfit-text mb-2">
                    6.1 Platform Role
                  </h3>
                  <p>
                    UpFit&apos;s liability to you is limited to its role as a
                    booking platform and disclosed billing agent. UpFit is not
                    liable for the acts or omissions of independent installers
                    except to the extent required by law.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    6.2 Liability Cap
                  </h3>
                  <p>
                    To the maximum extent permitted by law, UpFit&apos;s total
                    liability to you for any claim arising from a booking —
                    whether in contract, tort, or otherwise — is limited to the
                    platform commission retained by UpFit on that booking, being
                    the difference between the total amount you paid and the
                    amount remitted to the attending installer.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    6.3 Australian Consumer Law
                  </h3>
                  <p>
                    Nothing in these Terms excludes, restricts, or modifies any
                    right or remedy, or any guarantee, warranty, or other term or
                    condition, implied or imposed by the Australian Consumer Law
                    where to do so would contravene the Australian Consumer Law
                    or cause any part of these Terms to be void. Where the
                    Australian Consumer Law applies and permits UpFit to limit
                    its liability, UpFit&apos;s liability is limited to resupply
                    of the relevant service or payment of the cost of resupply.
                  </p>
                </>
              ),
            },
            {
              title: "7. Privacy",
              content: (
                <p>
                  UpFit collects and handles your personal information in
                  accordance with our{" "}
                  <a href="/privacy" className="text-accent hover:underline">
                    Privacy Policy
                  </a>{" "}
                  available at upfit.au/privacy. By making a booking, you
                  consent to UpFit using your personal information for the
                  purpose of facilitating your booking, processing payment, and
                  communicating with you regarding your installation.
                </p>
              ),
            },
            {
              title: "8. Complaints",
              content: (
                <p>
                  If you have a complaint about your booking, the installation
                  service, or the hardware supplied, please contact UpFit at{" "}
                  <a
                    href="mailto:team@upfit.au"
                    className="text-accent hover:underline"
                  >
                    team@upfit.au
                  </a>
                  . We will acknowledge your complaint within 1 business day and
                  work to resolve it within 5 business days. Where a complaint
                  cannot be resolved directly, you may refer the matter to NSW
                  Fair Trading or your relevant state consumer authority.
                </p>
              ),
            },
            {
              title: "9. Governing Law",
              content: (
                <p>
                  These Terms are governed by the laws of New South Wales,
                  Australia. Any dispute arising under these Terms is subject to
                  the non-exclusive jurisdiction of the courts of New South
                  Wales.
                </p>
              ),
            },
            {
              title: "10. Changes to These Terms",
              content: (
                <p>
                  UpFit may update these Terms from time to time. The current
                  version will always be available at upfit.au/terms. Continued
                  use of the platform after changes are published constitutes
                  acceptance of the updated Terms.
                </p>
              ),
            },
            {
              title: "11. Contact",
              content: (
                <div className="space-y-1">
                  <p className="font-medium text-upfit-text">UpFit Australia Pty Ltd</p>
                  <p>ABN 79 699 128 606</p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:team@upfit.au"
                      className="text-accent hover:underline"
                    >
                      team@upfit.au
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
            By ticking the checkbox at checkout, you confirm that you have read
            and agree to these Terms &amp; Conditions.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
