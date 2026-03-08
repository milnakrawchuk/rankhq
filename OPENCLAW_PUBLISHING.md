# OpenClaw Publishing Contract

This repo is designed for constrained auto-publishing.

Rules:
- Never publish if required inputs are missing.
- Never invent facts, statistics, testimonials, case studies, or client outcomes.
- Never publish medical, legal, or financial claims unless sources are listed in frontmatter.
- Do not change site structure during cron publishing runs.
- Only create or edit article files and closely related metadata unless explicitly instructed.
- Every publishable topic must include a real city, a real service line, a primary keyword, at least three secondary keywords, and required terms that reflect how customers actually search.
- Treat "low-hanging fruit" as keyword patterns with strong local intent and lower content-quality competition, not as made-up search volume claims.
- Favor topics that combine service + city + commercial/urgent modifier before broad top-of-funnel topics.

Daily flow:
1. Review queued topics in `content/topics/queue.csv` and choose the highest-opportunity fully specified topic.
2. Prefer topics with strong local intent: city + service, emergency, near me, cost, quote, best, open now, same day, repair, installation, or service-area comparisons.
3. Draft an article that reflects real customer search patterns and local buying questions.
4. Validate the article with `npm run validate:article -- <path>`.
5. Build the site.
6. Commit and push only if validation and build pass.

If the topic is underspecified, skip the publish and log the reason.
