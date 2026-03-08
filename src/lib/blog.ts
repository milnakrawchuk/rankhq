import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const contentRoot = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  draft: boolean;
  ctaLabel: string;
  ctaHref: string;
  sources: string[];
  body: string;
  html: string;
};

type Frontmatter = Omit<BlogPost, "slug" | "body" | "html">;

function ensureContentDir() {
  if (!fs.existsSync(contentRoot)) {
    fs.mkdirSync(contentRoot, { recursive: true });
  }
}

function parsePost(filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, path.extname(filePath));
  const fm = data as Partial<Frontmatter>;

  const post: BlogPost = {
    slug,
    title: fm.title ?? slug,
    description: fm.description ?? "",
    publishedAt: fm.publishedAt ?? new Date().toISOString(),
    updatedAt: fm.updatedAt,
    author: fm.author ?? "RankHQ Editorial",
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    draft: Boolean(fm.draft),
    ctaLabel: fm.ctaLabel ?? "Book a strategy call",
    ctaHref: fm.ctaHref ?? "mailto:hello@rankhq.co",
    sources: Array.isArray(fm.sources) ? fm.sources : [],
    body: content,
    html: marked.parse(content) as string,
  };

  return post;
}

export function getAllPosts(): BlogPost[] {
  ensureContentDir();

  return fs
    .readdirSync(contentRoot)
    .filter((file) => file.endsWith(".md"))
    .map((file) => parsePost(path.join(contentRoot, file)))
    .filter((post) => !post.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getPostBySlug(slug: string): BlogPost | null {
  ensureContentDir();

  const filePath = path.join(contentRoot, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const post = parsePost(filePath);
  return post.draft ? null : post;
}
