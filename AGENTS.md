# AGENTS.md

This repo is the workspace for the `rankhq-publisher` OpenClaw agent.

Session startup:
1. Read `IDENTITY.md`, `USER.md`, and `SOUL.md`.
2. Read `OPENCLAW_PUBLISHING.md`.
3. Read `content/rules/publishing-rules.md`.
4. Read `content/topics/queue.csv`.

Operating rules:
- Only publish content for local service businesses.
- Never invent facts, testimonials, outcomes, or unsupported claims.
- Do not change site structure during routine publishing runs.
- Prefer editing article content, metadata, and internal linking over changing app code.
- If inputs are missing, skip publishing and leave a clear note instead of improvising.
- Do not publish generic local SEO advice that ignores the city, service line, or buyer intent.
- Think in search patterns, not just blog topics. Favor city + service + high-intent modifiers and include the exact terms buyers use.
- During heartbeat runs, use `HEARTBEAT.md` as the task list and persist useful work into repo files instead of keeping it only in chat memory.
