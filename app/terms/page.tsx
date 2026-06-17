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
          Last updated: 17/06/2026 &nbsp;·&nbsp; Operated by: UpFit Australia Pty Ltd ACN 699 128 606 ABN 79 699 128 606
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
                <p>
                  UpFit is the principal party in your booking. You contract
                  with UpFit for a fully installed outcome — including supply of
                  hardware and installation. Installation services are performed
                  by UpFit&apos;s network of vetted independent installers
                  operating under agreement with UpFit. UpFit manages the
                  customer relationship, booking, payment, and all
                  post-installation support on your behalf.
                </p>
              ),
            },
            {
              title: "2. The Installation Service",
              content: (
                <>
                  <h3 className="font-medium text-upfit-text mb-2">
                    2.1 Independent Installers
                  </h3>
                  <p>
                    Installation services are performed by independent
                    contractors operating under agreement with UpFit. UpFit
                    vets all installers and requires them to hold current public
                    liability insurance of a minimum $5,000,000. You do not need
                    to contact the installer directly — UpFit is your single
                    point of contact before, during, and after your job.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    2.2 Workmanship
                  </h3>
                  <p>
                    If you are dissatisfied with the quality of installation
                    work, please notify UpFit within 48 hours of job completion
                    at{" "}
                    <a
                      href="mailto:team@upfit.au"
                      className="text-accent hover:underline"
                    >
                      team@upfit.au
                    </a>
                    . UpFit will assess the issue and coordinate rectification
                    with the attending installer on your behalf. Where a
                    workmanship defect is confirmed, rectification will be
                    arranged at no additional cost to you. UpFit acts as your
                    single point of contact throughout the resolution process.
                    Financial liability for rectification rests with the
                    attending installer.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    2.3 Vehicle Access
                  </h3>
                  <p>
                    By booking a service, you confirm that you are the vehicle
                    owner or have authority to authorise work on the vehicle.
                    You agree to ensure the vehicle is accessible, in a safe
                    location, and has sufficient battery charge at the time of
                    the appointment.
                  </p>
                </>
              ),
            },
            {
              title: "3. Hardware & Products",
              content: (
                <>
                  <h3 className="font-medium text-upfit-text mb-2">
                    3.1 Branded Hardware
                  </h3>
                  <p>
                    Where hardware is supplied as part of your booking (head
                    units, dashcams, cameras, sensors), it is sourced from
                    authorised Australian distributors of recognised brands
                    including Kenwood, Pioneer, and Aerpro. The specific unit
                    to be installed will be confirmed in your booking details.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    3.2 Manufacturer Warranty
                  </h3>
                  <p>
                    All hardware supplied through UpFit carries the
                    manufacturer&apos;s standard Australian warranty. In the
                    event of a hardware fault, the manufacturer&apos;s warranty
                    applies. UpFit will assist in facilitating warranty claims
                    on your behalf but is not the manufacturer or importer of
                    the hardware and does not extend warranties beyond those
                    provided by the manufacturer.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    3.3 Hardware Limitation of Liability
                  </h3>
                  <p>
                    UpFit is not liable for consequential or indirect loss
                    arising from hardware fault or failure, including but not
                    limited to vehicle damage, data loss, electrical faults
                    caused by a defective unit, or costs arising from vehicle
                    downtime. Manufacturer warranties govern the remedy
                    available for product defects.
                  </p>
                </>
              ),
            },
            {
              title: "4. Booking & Payment",
              content: (
                <>
                  <h3 className="font-medium text-upfit-text mb-2">
                    4.1 Booking Confirmation
                  </h3>
                  <p>
                    Your booking is confirmed upon receipt of payment. You will
                    receive a confirmation via email including job details, the
                    installer&apos;s first name, and the scheduled appointment
                    time.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    4.2 Pricing
                  </h3>
                  <p>
                    All prices displayed on upfit.au are inclusive of GST. The
                    price shown at checkout is the total amount payable. There
                    are no additional call-out fees.
                  </p>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    4.3 Cancellations &amp; Rescheduling
                  </h3>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>
                      Cancellations made more than 24 hours before the
                      appointment: full refund
                    </li>
                    <li>
                      Cancellations made less than 24 hours before the
                      appointment: a cancellation fee of 50% of the booked
                      service applies
                    </li>
                    <li>
                      Rescheduling is available at no charge with more than 24
                      hours notice via emailing{" "}
                      <a
                        href="mailto:team@upfit.au"
                        className="text-accent hover:underline"
                      >
                        team@upfit.au
                      </a>
                    </li>
                  </ul>
                  <h3 className="font-medium text-upfit-text mb-2 mt-5">
                    4.4 No-Access Fee
                  </h3>
                  <p>
                    If the installer attends the booked location and is unable
                    to access the vehicle or complete the job due to
                    circumstances within your control (vehicle unavailable,
                    incorrect location, no response), a no-access fee of 50%
                    of the booked service applies.
                  </p>
                </>
              ),
            },
            {
              title: "5. Limitation of UpFit's Liability",
              content: (
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    UpFit&apos;s liability to you is limited to the amount paid
                    to UpFit for the relevant booking
                  </li>
                  <li>
                    UpFit is not liable for damage to vehicles, property, or
                    any consequential, indirect, or economic loss arising from
                    the installation service or hardware supplied
                  </li>
                  <li>
                    UpFit is not liable for delays, cancellations, or service
                    failures caused by circumstances outside its reasonable
                    control
                  </li>
                </ul>
              ),
            },
            {
              title: "6. Australian Consumer Law",
              content: (
                <p>
                  Nothing in these Terms limits any rights you have under the
                  Australian Consumer Law. Our services and goods come with
                  guarantees that cannot be excluded under the Australian
                  Consumer Law. For major failures with a service, you are
                  entitled to cancel your service contract with us and to a
                  refund for the unused portion, or to compensation for its
                  reduced value. You are also entitled to choose a refund or
                  replacement for major failures with goods.
                </p>
              ),
            },
            {
              title: "7. Privacy",
              content: (
                <p>
                  UpFit collects your name, contact details, vehicle
                  information, and address for the purpose of coordinating your
                  booking. Your information is handled in accordance with
                  UpFit&apos;s{" "}
                  <a href="/privacy" className="text-accent hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and is not sold to third parties.
                </p>
              ),
            },
            {
              title: "8. Complaints & Disputes",
              content: (
                <p>
                  If you have a complaint, please contact us at{" "}
                  <a
                    href="mailto:team@upfit.au"
                    className="text-accent hover:underline"
                  >
                    team@upfit.au
                  </a>{" "}
                  within 48 hours of your job. We will acknowledge your
                  complaint within 2 business days and work to resolve it
                  within 5 business days. Where a complaint cannot be resolved
                  directly, you may refer the matter to NSW Fair Trading or
                  your relevant state consumer authority.
                </p>
              ),
            },
            {
              title: "9. Governing Law",
              content: (
                <p>
                  These Terms are governed by the laws of New South Wales,
                  Australia.
                </p>
              ),
            },
            {
              title: "10. Contact",
              content: (
                <div className="space-y-1">
                  <p className="font-medium text-upfit-text">UpFit</p>
                  <p>UpFit Australia Pty Ltd ACN 699 128 606 ABN 79 699 128 606</p>
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
