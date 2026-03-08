# RankHQ heartbeat checklist

Purpose:
- keep the local-service SEO pipeline fed with real research
- save notes, queue opportunities, and maintain self-generated tasks
- avoid publishing or messaging noise when nothing useful happened

Rules:
- If there is nothing actionable, reply `HEARTBEAT_OK`.
- Never invent keyword volume, competition, CTR, or conversion data.
- Use web search only when needed to validate search patterns, SERP quality, or local intent.
- Prefer adding one strong researched opportunity over many weak ones.
- Do not publish from heartbeat. Heartbeat prepares research, notes, and tasks for the daily publish cron.

On each heartbeat:
1. Check `content/topics/queue.csv`.
2. Count fully specified queued topics. If there are 7 or more, do not add more unless an existing row is weak or underspecified.
3. If the queue has fewer than 7 strong queued topics, research one local-service opportunity:
   - start from local service businesses only
   - prefer city + service + high-intent modifiers
   - think through what the buyer is actually trying to solve before they call
   - look for terms related to `near me`, `best`, `cost`, `quote`, `emergency`, `same day`, `reviews`, `open now`, `repair`, `installation`, and city/service comparisons
   - avoid vague vanity topics
4. Save research notes to `content/research/opportunities.md`.
5. If you find a credible publishable opportunity, add a fully specified queued row to `content/topics/queue.csv`.
6. Maintain `ops/tasks.md`:
   - create follow-up tasks when something is blocked or needs human input
   - mark done tasks in the completed section when finished
7. Append a short line to `ops/progress-log.md` only when something concrete happened:
   - researched a new opportunity
   - added a queue item
   - created a follow-up task
   - found a blocker that needs Milna
8. If there is a blocker that requires the user, say so briefly in the heartbeat response. Otherwise keep the response concise.
