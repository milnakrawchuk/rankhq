import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const target = process.argv[2];

if (!target) {
  console.error("Usage: node scripts/validate-article.mjs <path-to-article>");
  process.exit(1);
}

const filePath = path.resolve(process.cwd(), target);

if (!fs.existsSync(filePath)) {
  console.error(`Article not found: ${filePath}`);
  process.exit(1);
}

const raw = fs.readFileSync(filePath, "utf8");
const { data, content } = matter(raw);

const required = [
  ["title", data.title],
  ["description", data.description],
  ["publishedAt", data.publishedAt],
  ["ctaLabel", data.ctaLabel],
  ["ctaHref", data.ctaHref],
];

const missing = required.filter(([, value]) => !value);

if (missing.length > 0) {
  console.error(
    `Missing required frontmatter: ${missing.map(([key]) => key).join(", ")}`,
  );
  process.exit(1);
}

if (data.draft === true) {
  console.error("Refusing to publish draft article.");
  process.exit(1);
}

if (!content.trim()) {
  console.error("Article body is empty.");
  process.exit(1);
}

const regulatedTerms = /\b(medical|legal|financial|investment|diagnose|treatment|lawsuit|tax advice)\b/i;
const sources = Array.isArray(data.sources) ? data.sources : [];

if (regulatedTerms.test(content) && sources.length === 0) {
  console.error(
    "Article contains regulated-claim language but no sources are listed.",
  );
  process.exit(1);
}

console.log(`Article validated: ${path.relative(process.cwd(), filePath)}`);
