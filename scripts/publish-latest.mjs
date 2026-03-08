import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const queuePath = path.join(process.cwd(), "content", "topics", "queue.csv");

function parseCsvLine(line) {
  const cells = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

if (!fs.existsSync(queuePath)) {
  console.error("Topic queue is missing.");
  process.exit(1);
}

const [headerLine, ...dataLines] = fs.readFileSync(queuePath, "utf8").trim().split("\n");
const headers = parseCsvLine(headerLine);
const rows = dataLines.map((line) => {
  const values = parseCsvLine(line);
  return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
});

const queued = rows.find(
  (row) =>
    row.status === "queued" &&
    row.city &&
    !["general", "[city]", "your city", "city", "multiple"].includes(
      row.city.trim().toLowerCase(),
    ) &&
    row.service &&
    row.primary_keyword &&
    row.secondary_keywords &&
    row.search_intent &&
    row.customer_pattern &&
    row.must_include,
);

if (!queued) {
  console.error("No fully specified queued topics found. Refusing to publish.");
  process.exit(1);
}

console.log("Publishing pipeline requires article generation before this script can push.");
console.log("Use this script after an article file is created and validated.");

const articleArg = process.argv[2];
if (!articleArg) {
  process.exit(0);
}

execSync(`node scripts/validate-article.mjs ${articleArg}`, { stdio: "inherit" });
execSync("npm run build", { stdio: "inherit" });
execSync("git add .", { stdio: "inherit" });
execSync(
  `git commit -m "Publish article: ${path.basename(articleArg, path.extname(articleArg))}"`,
  { stdio: "inherit" },
);
execSync("git push origin main", { stdio: "inherit" });
