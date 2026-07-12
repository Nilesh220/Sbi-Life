# Graph Report - SBI  (2026-07-12)

## Corpus Check
- 41 files · ~24,590 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 123 nodes · 85 edges · 42 communities (27 shown, 15 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c665b9ea`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- SUPABASE_SETUP.sql
- hexToRgb
- package.json
- page.js
- compilerOptions
- README.md
- layout.js
- Claude Design Skills (AI UI Generation)
- Claude Seedance Skill (ByteDance Seedance Video Prompting)
- GSAP Skills (GSAP Animations)
- Higgsfield Skill (AI Video Creative Direction)
- Motion Dev Animations Skill (Micro-Animations & CSS Transitions)
- page.js
- page.js
- page.js
- graphify.md
- graphify.md
- AGENTS.md
- next.config.mjs
- data.js

## God Nodes (most connected - your core abstractions)
1. `scripts` - 4 edges
2. `compilerOptions` - 2 edges
3. `paths` - 2 edges
4. `@/*` - 2 edges
5. `@supabase/supabase-js` - 2 edges
6. `gsap` - 2 edges
7. `next` - 2 edges
8. `react` - 2 edges
9. `react-dom` - 2 edges
10. `formatTimeAgo()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (42 total, 15 thin omitted)

### Community 1 - "SUPABASE_SETUP.sql"
Cohesion: 0.29
Nodes (5): public.challenge_submissions, public.leaderboard, public.posts, public.registrations, public.student_stats

### Community 4 - "hexToRgb"
Cohesion: 0.18
Nodes (11): gsap, next, react, react-dom, dependencies, gsap, next, react (+3 more)

### Community 7 - "package.json"
Cohesion: 0.25
Nodes (7): name, private, scripts, build, dev, start, version

### Community 9 - "compilerOptions"
Cohesion: 0.40
Nodes (4): ./src/*, compilerOptions, paths, @/*

### Community 10 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **34 isolated node(s):** `public.registrations`, `public.posts`, `public.challenge_submissions`, `public.leaderboard`, `public.student_stats` (+29 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `hexToRgb` to `package.json`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `public.registrations`, `public.posts`, `public.challenge_submissions` to the rest of the system?**
  _34 weakly-connected nodes found - possible documentation gaps or missing edges._