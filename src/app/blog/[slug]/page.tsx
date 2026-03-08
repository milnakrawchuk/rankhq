import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | RankHQ`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f6f1eb] px-6 py-12 text-[#1b140f] md:px-10">
      <article className="mx-auto max-w-3xl rounded-[32px] bg-white p-8 shadow-[0_24px_120px_rgba(18,24,38,0.08)] md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b5e3c]">
          {post.tags.join(" • ")}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-[#7f746c]">{formatDate(post.publishedAt)}</p>
        <p className="mt-8 text-xl leading-8 text-[#5c5148]">{post.description}</p>

        <div
          className="prose prose-lg mt-10 max-w-none prose-headings:text-[#1b140f] prose-p:text-[#352b23] prose-a:text-[#8b5e3c]"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <section className="mt-12 rounded-[24px] border border-[#ead9c9] bg-[#fff8f2] p-6">
          <h2 className="text-2xl font-semibold">
            Need local SEO that turns searches into calls?
          </h2>
          <p className="mt-3 text-base leading-7 text-[#5c5148]">
            RankHQ builds local SEO systems for service businesses that need more
            qualified inbound leads, cleaner service pages, and a site that compounds.
          </p>
          <a
            href={post.ctaHref}
            className="mt-6 inline-flex rounded-full bg-[#1b140f] px-5 py-3 text-sm font-semibold text-white"
          >
            {post.ctaLabel}
          </a>
        </section>

        {post.sources.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">Sources</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[#5c5148]">
              {post.sources.map((source) => (
                <li key={source}>
                  <a href={source} className="underline underline-offset-4">
                    {source}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </main>
  );
}
