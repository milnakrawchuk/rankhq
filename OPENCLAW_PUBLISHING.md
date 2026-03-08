# OpenClaw Publishing Contract

This repo is designed for constrained auto-publishing.

Rules:
- Never publish if required inputs are missing.
- Never invent facts, statistics, testimonials, case studies, or client outcomes.
- Never publish medical, legal, or financial claims unless sources are listed in frontmatter.
- Do not change site structure during cron publishing runs.
- Only create or edit article files and closely related metadata unless explicitly instructed.

Daily flow:
1. Pick the first `queued` topic from `content/topics/queue.csv`.
2. Research and draft the article.
3. Validate the article with `npm run validate:article -- <path>`.
4. Build the site.
5. Commit and push only if validation and build pass.

If the topic is underspecified, skip the publish and log the reason.
