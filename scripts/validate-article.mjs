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

function asList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/[|,]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

const required = [
  ["title", data.title],
  ["description", data.description],
  ["publishedAt", data.publishedAt],
  ["ctaLabel", data.ctaLabel],
  ["ctaHref", data.ctaHref],
  ["city", data.city],
  ["service", data.service],
  ["primaryKeyword", data.primaryKeyword],
  ["searchIntent", data.searchIntent],
  ["customerPattern", data.customerPattern],
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

if (content.trim().length < 2200) {
  console.error("Article is too thin. Refusing to publish under 2200 characters.");
  process.exit(1);
}

const bodyLower = content.toLowerCase();
const city = String(data.city ?? "").trim();
const service = String(data.service ?? "").trim();
const primaryKeyword = String(data.primaryKeyword ?? "").trim();
const mustInclude = asList(data.mustInclude);
const secondaryKeywords = asList(data.secondaryKeywords);
const sources = asList(data.sources);

const requiredHeadings = [
  "## Who is this for",
  "## What people are actually searching",
  "## What to include on the page",
  "## Common mistakes",
  "## Final takeaway",
];

const missingHeadings = requiredHeadings.filter((heading) => !content.includes(heading));

if (missingHeadings.length > 0) {
  console.error(`Missing required headings: ${missingHeadings.join(", ")}`);
  process.exit(1);
}

if (!bodyLower.includes(city.toLowerCase())) {
  console.error(`Article does not mention target city "${city}".`);
  process.exit(1);
}

if (!bodyLower.includes(service.toLowerCase())) {
  console.error(`Article does not mention target service "${service}".`);
  process.exit(1);
}

if (!bodyLower.includes(primaryKeyword.toLowerCase())) {
  console.error(`Article does not include primary keyword "${primaryKeyword}".`);
  process.exit(1);
}

const missingMustInclude = mustInclude.filter(
  (term) => !bodyLower.includes(term.toLowerCase()),
);

if (missingMustInclude.length > 0) {
  console.error(
    `Article is missing required terms: ${missingMustInclude.join(", ")}`,
  );
  process.exit(1);
}

if (secondaryKeywords.length < 3) {
  console.error("Article must include at least 3 secondary keywords in frontmatter.");
  process.exit(1);
}

if (sources.length < 2) {
  console.error("Article must list at least 2 sources in frontmatter.");
  process.exit(1);
}

const regulatedTerms = /\b(medical|legal|financial|investment|diagnose|treatment|lawsuit|tax advice)\b/i;

if (regulatedTerms.test(content) && sources.length === 0) {
  console.error(
    "Article contains regulated-claim language but no sources are listed.",
  );
  process.exit(1);
}

console.log(`Article validated: ${path.relative(process.cwd(), filePath)}`);
