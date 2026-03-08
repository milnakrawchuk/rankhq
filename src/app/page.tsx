import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f1eb] px-6 py-8 text-[#1b140f] md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between border-b border-black/10 pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b5e3c]">
              RankHQ
            </p>
            <p className="mt-2 text-sm text-[#6d635b]">
              Search systems for local service businesses that want more qualified calls.
            </p>
          </div>
          <Link
            href="/blog"
            className="rounded-full border border-[#d8c5b5] px-5 py-3 text-sm font-semibold"
          >
            Read the blog
          </Link>
        </header>

        <section className="grid gap-12 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b5e3c]">
              Local SEO publishing system
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              Turn local search demand into booked calls without publishing junk.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5c5148]">
              RankHQ publishes practical local SEO content for plumbers, dentists,
              med spas, roofers, law firms, HVAC shops, and other service businesses.
              Every article ships through a fail-closed workflow: topic queue in,
              validated article out, deploy only when the inputs are real.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="mailto:hello@rankhq.co"
                className="rounded-full bg-[#1b140f] px-6 py-3 text-sm font-semibold text-white"
              >
                Book a local SEO call
              </a>
              <Link
                href="/blog"
                className="rounded-full border border-[#d8c5b5] px-6 py-3 text-sm font-semibold text-[#1b140f]"
              >
                See published articles
              </Link>
            </div>
          </div>

          <div className="rounded-[32px] bg-[#1b140f] p-8 text-[#f4ede6] shadow-[0_30px_120px_rgba(27,20,15,0.28)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ddb892]">
              Publishing guardrails
            </p>
            <ul className="mt-6 space-y-4 text-base leading-7">
              <li>No invented facts</li>
              <li>No fake case studies or testimonials</li>
              <li>No regulated claims without listed sources</li>
              <li>No publish if required fields are missing</li>
              <li>Direct deploy only after validation passes</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 border-t border-black/10 py-12 md:grid-cols-3">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_20px_80px_rgba(18,24,38,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b5e3c]">
              Built for
            </p>
            <p className="mt-4 text-lg leading-8 text-[#352b23]">
              Local service businesses that win on calls, forms, maps, and service
              pages rather than vanity traffic.
            </p>
          </div>
          <div className="rounded-[28px] bg-white p-6 shadow-[0_20px_80px_rgba(18,24,38,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b5e3c]">
              Focus
            </p>
            <p className="mt-4 text-lg leading-8 text-[#352b23]">
              Service pages, city pages, internal linking, authority content, and
              publishing systems that help sales teams answer better leads.
            </p>
          </div>
          <div className="rounded-[28px] bg-white p-6 shadow-[0_20px_80px_rgba(18,24,38,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b5e3c]">
              Constraint
            </p>
            <p className="mt-4 text-lg leading-8 text-[#352b23]">
              No fake authority. No synthetic case studies. No autopublished filler
              just to hit a content quota.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
