# LinkedIn post

I built an AI recruiter assistant that runs 100% on free tiers and embeds with one script tag.

Meet Scout (ProjectHub). Drop it on any page:

```html
<script src="https://bradleymatera.github.io/ProjectHub/ProjectHub.js"></script>
```

Recruiters can ask real questions — about my projects, AWS internship, skills, gaps, and target roles — and get answers grounded in verified data instead of LinkedIn fluff.

What makes it different from a typical chatbot demo:

- **Grounded first.** Deterministic answers are built before any LLM call, so Scout can't hallucinate resume facts or sell me as a senior engineer.
- **Multi-provider failover.** Groq, Cloudflare, GitHub Models, Gemini, Grok — if one hits a quota or rate limit, it tries the next. If all fail, the grounded answer still works.
- **Self-improvement with a judge.** Think Mode stashes weak answers, reruns them through the provider network, and uses an LLM-as-judge to only promote answers that are more faithful, relevant, helpful, and safe than the baseline.
- **Live analytics dashboard.** Tracks provider health, latency, topic breakdowns, recent sessions, cache hits, and even uncategorized questions so I know what recruiters actually want to ask.
- **Zero hosting bill.** GitHub Pages frontend, GCP Always Free e2-micro VM, no database, no paid API dependency.

I wrote the full build story here — architecture, safety checks, free-tier routing, testing, and what I'd change at scale:

🔗 [How I Built ProjectHub: An Embeddable AI Recruiter Assistant That Runs on Free Tiers](https://bradleymatera.dev/projecthub-embeddable-ai-recruiter-free-tiers)

#AI #JavaScript #WebDev #Cloud #FreeTier #Recruiting #Portfolio #GCP #LLM

---

**Optional shorter version:**

I built an embeddable AI recruiter assistant (Scout) that answers questions about my work from verified data, fails over across free LLM providers, and improves itself through an LLM-as-judge loop. It runs on GitHub Pages + a free GCP VM with no AI hosting bill. Full write-up below.

🔗 [How I Built ProjectHub: An Embeddable AI Recruiter Assistant That Runs on Free Tiers](https://bradleymatera.dev/projecthub-embeddable-ai-recruiter-free-tiers)
