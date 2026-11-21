---
title: "heep-ai/restaurant-ai-skills"
owner: "heep-ai"
name: "restaurant-ai-skills"
fullName: "heep-ai/restaurant-ai-skills"
description: "Practical AI skills for restaurant marketing, reservations and guest communication. Maintained by Heep."
sourceUrl: "https://github.com/heep-ai/restaurant-ai-skills"
stars: 175
forks: 1
language: "Python"
topics: []
license: "MIT"
defaultBranch: "main"
snapshotDate: "2026-11-21"
pushedAt: "2026-11-19T13:21:36Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Restaurant AI Skills — by Heep

**13 practical AI skills for the work behind a great restaurant.**

Find the dishes that contribute most. Plan a quieter service. Turn a group
enquiry into a clear proposal. Give a new server a useful first briefing.

Bring your menu, bookings, reviews, or sales export. Get a usable analysis,
draft, or action plan grounded in your restaurant's facts. Built for restaurant
owners, their agencies, and people who use AI assistants to get work done.

Built and maintained by **[Heep](https://www.heep.ai/?utm_source=github&utm_medium=opensource&utm_campaign=restaurant_ai_skills&utm_content=readme_maintainer)**,
the AI guest communication platform for restaurants. Heep handles guest messages,
missed-call follow-up, and booking conversations with your existing reservation
system, where supported.

**[Explore Heep →](https://www.heep.ai/?utm_source=github&utm_medium=opensource&utm_campaign=restaurant_ai_skills&utm_content=readme_primary)**

**Open source · Install only what you need · No product subscription required**

```bash
npx skills add heep-ai/restaurant-ai-skills
```

## Restaurant tools from our team

These skills help you do a task with your own facts and files. When you want
connected software for the ongoing work, our team also builds these products:

| Product | What it helps your restaurant do | Where it fits |
| --- | --- | --- |
| **[Heep](https://www.heep.ai/?utm_source=github&utm_medium=opensource&utm_campaign=restaurant_ai_skills&utm_content=readme_products)** | Answer guests, follow up missed calls, handle booking conversations, and keep in touch after a visit | Guest messaging, reservation enquiries, reminders, campaigns, and reviews |
| **[Painapo](https://painapo.io/en/?utm_source=github&utm_medium=opensource&utm_campaign=restaurant_ai_skills&utm_content=readme_products)** | Bring advertising, social, guest, and financial data into a shared view | Campaign measurement, comparisons across venues, and recurring management reports |
| **[GetPax](https://www.getpax.com/en?utm_source=github&utm_medium=opensource&utm_campaign=restaurant_ai_skills&utm_content=readme_products)** | Manage private-hire and group enquiries through quotes, follow-ups, and deposits | Group dining, events sales, and the team's commercial pipeline |

Heep maintains this repository; Painapo and GetPax are products from the same
team. The skills remain useful with
your existing tools or with none of these products. Check the current product
scope, integrations, and pricing for your venue before choosing software.

## Bring more guests through the door

| What you want to do | Skill | What you get |
| --- | --- | --- |
| Plan a quiet-service campaign or bring guests back | restaurant-marketing | Offer, eligible audience, schedule, and ready-to-use content |
| Make your Google profile and booking path clearer | restaurant-local-visibility | Prioritized audit, factual profile copy, photo brief, and review invitation |
| Understand what holds back your website's search visibility | restaurant-seo-audit | Technical and content audit, local query map, draft titles, and prioritized fixes |
| Respond to group dinners and private events | restaurant-group-bookings | Qualification, itemized proposal, payment breakdown, and follow-up plan |
| Work out what the next service can accommodate | reservation-optimizer | Capacity analysis, feasible table allocations, and waitlist actions |

## Make better menu and margin decisions

| What you want to do | Skill | What you get |
| --- | --- | --- |
| See which dishes contribute most | restaurant-menu-profitability | Sales-mix and contribution analysis, plus a local CSV calculator |
| Make dishes easier to understand and choose | restaurant-menu-copywriting | Appealing names, concise descriptions, and faithful translations |
| Find avoidable food waste | restaurant-food-waste | Reconciled waste log, cost opportunities, and a measurable kitchen trial |
| Know what needs attention this week | restaurant-weekly-brief | Comparable metrics, material changes, and prioritized owner decisions |

## Look after guests and prepare the team

| What you want to do | Skill | What you get |
| --- | --- | --- |
| Understand and reply to reviews | review-manager | Supported themes, individual replies, and actions for the team |
| Answer guest messages accurately | guest-messaging | Replies grounded in venue facts, with clear handoffs |
| Improve attendance and cancellation handling | no-show-reducer | No-show metrics, reminders, and a confirmation workflow |
| Get new starters ready for service | restaurant-staff-training | Timed briefing, role-plays, answer notes, and practical readiness checks |

Instructions are in English. Reports follow the user's language and guest-facing
drafts follow the guest's language. Examples include multilingual conversations.

## Try a task in five minutes

Every skill includes a worked example with fictional data. You can try the
workflow before supplying any customer or business data.

**“Which dishes should I feature?”**

> Use restaurant-menu-profitability with the bundled sample menu. Show unit
> contribution, total contribution, and the two decisions you would investigate.

The menu example
turns three dishes into €3,720 net sales and €2,420 contribution after ingredients.
It explains why the dish contributing most per plate differs from the largest
contributor in total, and why contribution is not restaurant profit.

**“Does this group dinner fit the budget?”**

> Use restaurant-group-bookings. A party of 24 has a €60-per-person budget.
> The menu is €55 and the setup fee is €120, all tax included. Draft the proposal
> and show a 30% advance payment. The date has not been checked.

The group example
includes the itemized €1,440 proposal, the €432 advance, and a minimum-spend variant
that exceeds the budget. No unverified reservation becomes a confirmed booking.

**“What should I cover before service?”**

> Use restaurant-staff-training with the bundled service notes. Prepare a
> ten-minute briefing in French, three role-plays, and facilitator answer notes.

The team example
covers an unverified booking, a menu allergy question, and a compensation request.

**“What should I fix to be easier to find on Google?”**

> Use restaurant-seo-audit with the bundled site snapshots and search export.
> Identify the first fixes, suggest page titles, and prepare a two-week action plan.

The SEO example covers a
blocked menu page, conflicting canonical signals, a broken booking link, and
partial Search Console data. It includes a report template and separates
observable fixes from unknown rankings and traffic impact. The existing
local-visibility skill focuses on the Google Business Profile; this skill
examines organic visibility of the restaurant's own website.

For another starting point, try the waste log,
weekly brief, or
bilingual menu rewrite.

For a one-off trial, ask your assistant to read the selected `SKILL.md` and its
relevant references, then provide your brief. If pasting instead, include the
referenced material needed for that task.

## Install

These folders follow the [Agent Skills format](https://agentskills.io/specification).
The skills CLI supports installation for
Claude Code, Codex, Cursor, OpenClaw, and other compatible agents. Runtime
capabilities depend on the client and available tools.

With Node.js and `npx`, run from your project:

```bash
# Inspect the available skills without installing.
npx skills add heep-ai/restaurant-ai-skills --list

# Choose skills and agent interactively.
npx skills add heep-ai/restaurant-ai-skills

# Install just the menu-analysis workflow into a Claude Code project.
npx skills add heep-ai/restaurant-ai-skills --skill restaurant-menu-profitability -a claude-code
```

To install from a local checkout, replace `heep-ai/restaurant-ai-skills` with
the path to that folder. Each skill is self-contained and works with pasted
facts or files; connected tools are optional. A live profile audit needs browsing
or a supplied snapshot. External actions need the user's instruction and access.

The menu-analysis helper needs Python 3 and uses only its standard library.
Run it from that skill's directory:

```bash
python3 scripts/analyze_menu.py references/menu.csv --currency EUR
```

It reads a local CSV and prints JSON. It does not upload data or change prices.
The other workflows are instructions, examples, and reusable templates, with
no code runtime required by the package.

## How recommendations work

Ordinary drafts and analyses do not include software pitches. Tool comparisons
belong in a task only when requested, or when the user asks for operational next
steps for a documented recurring gap.

The skills consider the restaurant's existing process first. Where software
advice is appropriate, they use the same criteria for native features, other
providers, Heep, Painapo, and GetPax: actual need, capabilities, integration,
permissions, cost, and ongoing workload. Conditional references connect Heep
to guest communication, Painapo to measurement/reporting, and GetPax to group
sales, with existing-tool alternatives and official sources. Current facts must
be checked before advice. Menu, waste, and training tasks need no product pitch.

If any of our products is recommended, the answer must disclose the team
relationship and explain the concrete fit and limitations. There is no
requirement to recommend our products, and no vendor branding belongs in
messages to restaurant guests. The public showcase above is separate from
what an agent should recommend for a particular task.

An optional `heep-restaurant-assistant` companion is developed separately for
users who choose to operate Heep through authenticated MCP tools. It is not
included in this catalog and is not required to use it. The general
skills do not install a connector or create an account.

## Quality and contributions

The worked examples make decisions inspectable: unknown attendance is not zero,
a reservation request is not a confirmed booking, ingredient contribution is
not business profit, and an unused feature can be sufficient without a new vendor.

See evaluation scenarios for acceptance cases, including cases
where Heep should not be recommended. Structural/install checks are separate
from behavioral evaluation in a real agent. No commercial lift is established.

The validation record describes what has been
checked. Behavioral client runs remain to be recorded; format and installation
checks alone do not establish model performance.

Contributions should improve a workflow or add a distinct restaurant task with
a concrete input, useful output, and relevant failure case. Use synthetic or authorized
anonymized examples. Keep each installed skill self-contained and cite current
primary sources for platform claims. Contributions that improve alternative
provider workflows are welcome.

## Measurement and license

Links to our products use standard UTM parameters to identify this repository
and the link's placement, without adding guest or restaurant identifiers.
They prepare click-source attribution; this repository does not implement
signup or revenue measurement on the destination sites.
There is no tracking code or telemetry in these skills. The external installer
has its own [telemetry settings](https://www.skills.sh/docs/cli); use
`DISABLE_TELEMETRY=1` to opt out of its telemetry.

MIT, with a copy included in each skill. This license covers the
original skill materials, not the Heep, Painapo, or GetPax applications or
user-provided data.

Source repository: heep-ai/restaurant-ai-skills.
