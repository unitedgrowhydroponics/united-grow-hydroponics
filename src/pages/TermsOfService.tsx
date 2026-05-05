export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#0B1215] text-[#F6FFF7]">
      <section className="section-padding py-28 md:py-32 max-w-4xl mx-auto">
        <p className="label-text text-[#D4AF37] mb-4">Legal</p>
        <h1 className="text-4xl md:text-5xl font-normal mb-6">Terms of Service</h1>
        <p className="text-[#D7D7D7] mb-12">
          These Terms of Service govern your use of the United Grow Hydroponics S.A.R.L website.
          By using this site, you agree to the terms described below.
        </p>

        <div className="space-y-10 text-[#D7D7D7]">
          <section>
            <h2 className="text-2xl text-[#F6FFF7] mb-3">1. Website Use</h2>
            <p>
              You agree to use this site lawfully and not engage in activities that may damage,
              disable, or interfere with website operations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#F6FFF7] mb-3">2. Content and Intellectual Property</h2>
            <p>
              All website content, including text, graphics, and branding, is owned by or licensed
              to United Grow Hydroponics S.A.R.L unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#F6FFF7] mb-3">3. Inquiry and Communication</h2>
            <p>
              Information submitted through contact forms is used for business communication and
              service response. Submission does not guarantee partnership or order acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#F6FFF7] mb-3">4. Limitation of Liability</h2>
            <p>
              This website is provided on an "as is" basis. We are not liable for indirect or
              consequential losses arising from website use, to the extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#F6FFF7] mb-3">5. Contact</h2>
            <p>
              For questions about these terms, contact{' '}
              <a className="text-[#D4AF37] hover:underline" href="mailto:info@ughydroponics.com">
                info@ughydroponics.com
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
