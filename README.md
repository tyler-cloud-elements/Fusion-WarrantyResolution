# Industrial Equipment Warranty Resolution

The Maestro Case App for the FUSION 2026 Keynote 2 demo — Act III, where the warranty
resolution lead works the seven percent of claims that reach a person.

A customer's sortation line is down. The drive failed early, which is on us; somebody also
raised its limits past the approved envelope without sign-off, which is on them. Both are
established, no coverage rule resolves a combined cause, and that is why it is in front of
Sarah Chen rather than closing on its own.

```bash
cd warranty-resolution-app
npm install
npm run dev          # http://localhost:5173 → the work queue
```

It runs on a bundled demo dataset with no UiPath tenant configured. Point it at a published
Maestro case by filling in `.env` — see [`warranty-resolution-app/.env.example`](./warranty-resolution-app/.env.example).

## What's here

| | |
|---|---|
| [`AGENTS.md`](./AGENTS.md) | **Start here.** The build brief: which source wins where they disagree, the cast, the numbers the talk track quotes, the feature flags, and what is deliberately not built. |
| [`warranty-resolution-app/`](./warranty-resolution-app) | The app. Its [README](./warranty-resolution-app/README.md) covers structure, configuration and deploying. |
| [`docs/`](./docs) | Every reference this was built from — the storyboard, the console mock, the case design, the SDD, and the evidence documents. |
| [`deploy-app.sh`](./deploy-app.sh) | build → pack → publish → deploy to UiPath Coded Apps. |

## The screens

| Route | What it is |
|---|---|
| `/cases` | The work queue — the morning brief, then the three cases that need a person out of 41 open |
| `/cases/:id` | Case detail — nine tabs: overview, details, actions, stages, SLAs, documents, activity, trail, comments |
| `/cases/:id/tasks/:taskId` | The decision console — the finding, the cost split, the authority meter, the reasoning capture |
| `/actions` | The action queue, with the case beside it |
| `/performance` | Fleet view — 93% progressing autonomously, and where work accumulates |
| `/case-plans` | The case plan and the rules the case agent reads (hidden behind a flag) |

## A note on `docs/`

Each saved `.html` keeps its `_files/` directory, bundles included, so it opens offline. None
of it is reproducible — the storyboard sits behind auth and the console mock is a preview
deployment — so the assets are tracked rather than trimmed. The pair must keep matching base
names; renaming one without the other breaks the page.

All names, values and clocks are illustrative. Cobalt Ridge Automation, Northstar Retail
Distribution and Meridian Industrial Services do not exist.
