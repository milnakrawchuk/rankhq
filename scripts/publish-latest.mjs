import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const queuePath = path.join(process.cwd(), "content", "topics", "queue.csv");

if (!fs.existsSync(queuePath)) {
  console.error("Topic queue is missing.");
  process.exit(1);
}

const rows = fs
  .readFileSync(queuePath, "utf8")
  .trim()
  .split("\n")
  .slice(1)
  .map((row) => row.split(","));

const queued = rows.find((row) => row[row.length - 1] === "queued");

if (!queued) {
  console.error("No queued topics found. Refusing to publish.");
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
