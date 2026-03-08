import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | RankHQ",
  description:
    "Daily local SEO articles published through a constrained editorial workflow.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-[#f6f1eb] px-6 py-12 text-[#1b140f] md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b5e3c]">
            RankHQ Blog
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Daily local SEO articles with a hard publishing policy.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#5c5148]">
            Every article is generated from a local-service topic queue, validated
            against publishing rules, and shipped only if required fields are present.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
