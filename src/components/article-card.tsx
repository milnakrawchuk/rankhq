import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_80px_rgba(18,24,38,0.08)]">
      <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#8b5e3c]">
        {post.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-[#f3ebe2] px-3 py-1">
            {tag}
          </span>
        ))}
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-[#1b140f]">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="mt-3 text-base leading-7 text-[#5c5148]">
        {post.description}
      </p>
      <div className="mt-6 flex items-center justify-between text-sm text-[#7f746c]">
        <span>{formatDate(post.publishedAt)}</span>
        <Link
          href={`/blog/${post.slug}`}
          className="font-semibold text-[#1b140f] underline decoration-[#c77f45] decoration-2 underline-offset-4"
        >
          Read article
        </Link>
      </div>
    </article>
  );
}
