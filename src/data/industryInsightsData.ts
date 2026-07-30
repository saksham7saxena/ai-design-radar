export interface IndustryInsight {
  date: string;
  company: string;
  speaker: string;
  sourceUrl: string;
  designArea: string;
  exactPassage: string;
  type: 'Current capability' | 'Prediction' | string;
  meaningForDesigners: string;
}

export interface IndustryInsightsReport {
  id: string;
  status: string;
  completedAt: string;
  query: string;
  summary: string;
  citations: { url: string }[];
  results: IndustryInsight[];
}

export const industryInsightsReport: IndustryInsightsReport = {
  id: "agent_run_43e2d68eb68b4605a2cc633e20ded676",
  status: "completed",
  completedAt: "2026-07-30T02:59:17.201Z",
  query: "Find substantive statements published since January 2026 by leaders and product teams at OpenAI, Anthropic, Meta, Google, Microsoft, Figma, Adobe, Vercel and Cursor about the future of product design over the next one to three years.",
  summary: "Across post-January-2026 statements, the common pattern is that AI is expected to automate more execution: generating UI from intent, translating between code and design, creating prototypes, reviewing visible UI, and applying design-system rules. The parts of product design that remain most valued are problem framing, taste, domain judgment, trust and safety reasoning, research synthesis, alignment, and codifying product intent into systems agents can follow.",
  citations: [
    { url: "https://developers.googleblog.com/en/a2ui-v0-9-generative-ui/" },
    { url: "https://claude.com/blog/how-the-product-designer-who-built-claude-design-uses-it-to-explore-ideas-before-building-them" },
    { url: "https://vercel.com/blog/teaching-agents-product-design-at-vercel" },
    { url: "https://www.figma.com/blog/config-2026-recap/" },
    { url: "https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/" },
    { url: "https://openai.com/index/figma-partnership/" },
    { url: "https://blog.adobe.com/en/publish/2026/04/15/the-age-of-creative-agents-rise-creative-director" },
    { url: "https://microsoft.design/articles/when-outputs-are-the-experience/" },
    { url: "https://microsoft.design/articles/a-simplified-system/" },
    { url: "https://microsoft.design/articles/gathering-around-the-fire-durable-human-experience-patterns-in-the-ai-era/" },
    { url: "https://pod.wave.co/podcast/dive-club-1/meaghan-choi-designing-claude-code-and-whats-coming-next" },
    { url: "https://www.youtube.com/watch?v=C_eXo6oCvRA" },
    { url: "https://www.atlassian.com/blog/how-we-build/how-cursor-is-navigating-the-new-shape-of-product-craft" },
    { url: "https://www.webpronews.com/why-ai-masters-code-but-stumbles-on-taste-openais-codex-leader-on-designs-enduring-edge/" }
  ],
  results: [
    {
      date: "2026-02-26",
      company: "OpenAI / Figma",
      speaker: "Alexander Embiricos, Codex product lead, OpenAI",
      sourceUrl: "https://openai.com/index/figma-partnership/",
      designArea: "Frontend collaboration; code-to-design / design-to-code handoff",
      exactPassage: "“Engineers can iterate visually without leaving their flow, and designers can work closer to real implementation without becoming full-time coders. The boundary between roles starts to soften because the system helps translate between intent and reality continuously.”",
      type: "Prediction / near-term workflow direction",
      meaningForDesigners: "For enterprise, healthcare, fintech, and AI products, designers will be expected to work closer to implementation, validate UI behavior in running code, and collaborate with engineers around constraints, risk states, permissions, auditability, and data flows—not just hand off static screens."
    },
    {
      date: "2026-02-26",
      company: "Figma / OpenAI",
      speaker: "Loredana Crisan, Chief Design Officer, Figma",
      sourceUrl: "https://openai.com/index/figma-partnership/",
      designArea: "Automation of implementation; product judgment and craft",
      exactPassage: "“As the barriers for building software go down, the amount of software created will increase exponentially. It’s no longer about whether you can build, but what you build and how it stands out... With this integration, teams can build on their best ideas—not just their first idea—by combining the best of code with the creativity, collaboration, and craft that comes with Figma’s infinite canvas.”",
      type: "Prediction",
      meaningForDesigners: "When building becomes cheaper, differentiation shifts to problem selection, quality, trust, compliance, workflows, and adoption. Designers in regulated domains should emphasize product judgment, clarity, edge-case reasoning, and craft rather than treating production feasibility as the main bottleneck."
    },
    {
      date: "2026-04-17",
      company: "Google",
      speaker: "Google A2UI Team",
      sourceUrl: "https://developers.googleblog.com/en/a2ui-v0-9-generative-ui/",
      designArea: "AI-generated UI; design systems; component catalogs",
      exactPassage: "“A2UI v0.9 is our answer; a framework-agnostic standard for declaring UI intent. It allows local or remote agents to communicate with any client application using a common language, ensuring your agent can generate your UI using your existing component catalog on any device.”",
      type: "Current capability",
      meaningForDesigners: "Design systems become executable infrastructure for agents. Designers working on dense enterprise or clinical/financial workflows should define component semantics, permissions, states, guardrails, and when a conversational interaction should become a structured UI."
    },
    {
      date: "2026-07-24",
      company: "Anthropic",
      speaker: "Nate Parrott, product designer at Anthropic",
      sourceUrl: "https://claude.com/blog/how-the-product-designer-who-built-claude-design-uses-it-to-explore-ideas-before-building-them",
      designArea: "Prototyping automation; UI creation",
      exactPassage: "“Making a click-through prototype in traditional design tools means mocking up every state of every screen and wiring them together by hand. Here, you hand Claude your assets and say: make it work.”",
      type: "Current capability",
      meaningForDesigners: "Low- and medium-fidelity prototyping, state exploration, and internal concept communication can be accelerated. The designer’s leverage moves to framing the workflow, specifying realistic data and states, and deciding which prototype is safe, credible, and worth validating."
    },
    {
      date: "2026-07-24",
      company: "Anthropic",
      speaker: "Nate Parrott, product designer at Anthropic",
      sourceUrl: "https://claude.com/blog/how-the-product-designer-who-built-claude-design-uses-it-to-explore-ideas-before-building-them",
      designArea: "Designer value; UX research and alignment",
      exactPassage: "“As models get better at building production software, the work that matters most moves earlier in the process: having good ideas, getting everyone aligned, and collecting feedback while an idea is still early.”",
      type: "Prediction",
      meaningForDesigners: "Hiring value shifts toward discovery, sense-making, stakeholder alignment, early feedback, and choosing the right problem. This is especially important where wrong decisions create patient-safety, financial, compliance, or model-risk consequences."
    },
    {
      date: "2026-03-24",
      company: "Anthropic",
      speaker: "Cat Wu, Head of Product for Claude Code",
      sourceUrl: "https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/",
      designArea: "Agent workflows; design systems; frontend collaboration",
      exactPassage: "“Many design teams shape their work in Figma and bring those products to life with Claude Code. Skills teach Claude Code how to work directly in the design canvas, so you can build in a way that stays true to your team’s intent and judgment.”",
      type: "Prediction / current integration direction",
      meaningForDesigners: "Designers should encode intent and judgment into reusable instructions, not rely on oral tradition. Complex-product teams will need documented patterns for risk, exceptions, permissions, empty/error states, clinical/financial terminology, and review criteria so agents do not generate plausible but unsafe UI."
    },
    {
      date: "2026-06-25",
      company: "Vercel",
      speaker: "Vercel product team / John Phamous",
      sourceUrl: "https://vercel.com/blog/teaching-agents-product-design-at-vercel",
      designArea: "Design systems; agent guidance; product judgment",
      exactPassage: "“Coding agents can produce working UI fast, but what's harder is a different shape. They can copy your product's style, match its patterns, and try to follow its conventions. What they cannot do is understand why those patterns exist.”",
      type: "Current capability plus limitation",
      meaningForDesigners: "The valuable work is the rationale: why a permission flow, destructive action, data visualization, audit trail, or care-team handoff behaves a certain way. Designers should maintain decision logs and rationale that agents and engineers can use."
    },
    {
      date: "2026-06-25",
      company: "Vercel",
      speaker: "Vercel product team / John Phamous",
      sourceUrl: "https://vercel.com/blog/teaching-agents-product-design-at-vercel",
      designArea: "Automation of review; product-design-as-agent-skill",
      exactPassage: "“Use whenever work changes what a user sees, understands, chooses, or does: shaping requirements and flows; building or redesigning pages and components; reviewing URLs, screenshots, diffs, or Vercel Agent findings; improving product copy, information architecture, component choice, Geist compliance, hierarchy, layout, interaction, accessibility, responsive behavior, and loading, empty, error, permission, billing, or destructive states.”",
      type: "Current capability",
      meaningForDesigners: "AI can assist with visible-product review, but only if teams codify quality standards. Designers in regulated products should own standards for accessibility, localization, error recovery, billing/claims/payment states, consent, explainability, and safe escalation."
    },
    {
      date: "2026-06-29",
      company: "Microsoft",
      speaker: "Laura Clark and Jon Friedman, Microsoft Design",
      sourceUrl: "https://microsoft.design/articles/when-outputs-are-the-experience/",
      designArea: "AI UX; output design; multimodal UI",
      exactPassage: "“The guiding principle behind the Copilot redesign is that output is the new UX... The way it cooks is a multimodal system that contextualizes outputs using storytelling, typography, video, audio, motion, and UX patterns.”",
      type: "Current capability / design principle",
      meaningForDesigners: "For AI products, the generated answer, recommendation, or action summary is now part of the interface. Designers must define output hierarchy, evidence, confidence, traceability, and next actions—not just the surrounding chrome."
    },
    {
      date: "2026-05-12",
      company: "Microsoft",
      speaker: "Jon Friedman, Microsoft Design",
      sourceUrl: "https://microsoft.design/articles/a-simplified-system/",
      designArea: "AI-forward design systems",
      exactPassage: "“As Copilot steadily evolves into a thought partner—an intelligent presence woven into your workflow—its backbone will become the Copilot Design System, an AI-forward design system we’re crafting to feel intentional and humane.”",
      type: "Prediction / current system direction",
      meaningForDesigners: "Design systems will need to govern agent entry points, handoffs across surfaces, generated suggestions, and contextual UI—not only components and tokens. Enterprise designers should define how AI appears, asks, recommends, defers, and hands control back."
    },
    {
      date: "2026-07-22",
      company: "Microsoft",
      speaker: "Hugo Palomares, Microsoft Design",
      sourceUrl: "https://microsoft.design/articles/gathering-around-the-fire-durable-human-experience-patterns-in-the-ai-era/",
      designArea: "UX research; trust; evaluation patterns",
      exactPassage: "“I’m imagining a near-future reality where standard UX patterns focus more on reviewing and understanding output and helping to drive trust.”",
      type: "Prediction",
      meaningForDesigners: "Usability research should increasingly test review, understanding, trust calibration, and human oversight. In healthcare and fintech, designers will be valued for helping users know when AI output is reliable, incomplete, biased, or requires escalation."
    },
    {
      date: "2026-06-24",
      company: "Figma",
      speaker: "Dylan Field, CEO and co-founder",
      sourceUrl: "https://www.figma.com/blog/config-2026-recap/",
      designArea: "Designer value; hiring and craft",
      exactPassage: "“AI has lowered the floor, but it has not raised the ceiling. Designers, creatives, builders — you will raise the ceiling.”",
      type: "Prediction",
      meaningForDesigners: "AI lowers the cost of producing acceptable artifacts, but senior designers will be valued for raising quality: complex systems thinking, domain expertise, service design, taste, accessibility, trust, and meaningful differentiation."
    },
    {
      date: "2026-06-24",
      company: "Figma",
      speaker: "Figma product team",
      sourceUrl: "https://www.figma.com/blog/config-2026-recap/",
      designArea: "UI creation; frontend collaboration",
      exactPassage: "“Code layers are a new type of layer within Figma Design, alongside vectors, images, and text. They let you bring interactive, code-based experiences directly into the canvas, so you can explore side-by-side with your other materials.”",
      type: "Current capability",
      meaningForDesigners: "Interactive code becomes a design material. Designers can evaluate complex states, data-heavy interactions, and responsive behavior earlier, reducing ambiguity before engineering commits production effort."
    },
    {
      date: "2026-06-24",
      company: "Figma",
      speaker: "Figma product team",
      sourceUrl: "https://www.figma.com/blog/config-2026-recap/",
      designArea: "Design systems; agent context; collaboration",
      exactPassage: "“With skills, teams can define a set of reusable instructions that the agent follows every time. And with connectors, the agent can pull in context from the other tools you rely on to design, build, and ship products—like Notion, GitHub, and Slack.”",
      type: "Current capability",
      meaningForDesigners: "Reusable AI instructions and cross-tool context make design operations more important. Product designers should help structure source-of-truth documentation, research insights, product rules, and engineering constraints so agent output matches real-world product needs."
    },
    {
      date: "2026-04-15",
      company: "Adobe",
      speaker: "David Wadhwani, President, Digital Media, Adobe",
      sourceUrl: "https://blog.adobe.com/en/publish/2026/04/15/the-age-of-creative-agents-rise-creative-director",
      designArea: "Automation; creative direction; designer value",
      exactPassage: "“This is a paradigm shift. A fundamentally new way of working in the age of creative agents that ushers in the rise of the creative director.”",
      type: "Prediction",
      meaningForDesigners: "Execution tasks will be delegated more often to AI agents; designers become directors who set intent, constraints, taste, brand, and safety. In complex domains, that means directing AI within regulatory, ethical, and operational boundaries."
    },
    {
      date: "2026-04-15",
      company: "Adobe",
      speaker: "David Wadhwani, President, Digital Media, Adobe",
      sourceUrl: "https://blog.adobe.com/en/publish/2026/04/15/the-age-of-creative-agents-rise-creative-director",
      designArea: "Automation of production work; human judgment",
      exactPassage: "“Every creative now has an agent capable of helping them execute across every app and platform where they work so they can set the vision, apply their taste and make the calls that only they can.”",
      type: "Prediction / current product strategy",
      meaningForDesigners: "Hiring will favor people who can articulate vision, make tradeoffs, and critique AI-generated options. Production speed matters less than the ability to decide what is appropriate, safe, compliant, and useful."
    },
    {
      date: "2026-07-08",
      company: "Anthropic",
      speaker: "Meaghan Choi, design lead for Claude Code / Claude Co-work",
      sourceUrl: "https://pod.wave.co/podcast/dive-club-1/meaghan-choi-designing-claude-code-and-whats-coming-next",
      designArea: "Automation; designer focus",
      exactPassage: "“There is so much design work to happen that needs to happen right now that what you're seeing is everything that I believe I can offload because the models are capable enough right now so that I can spend my time on like the really, really hard, gnarly problems that need deep design thinking.”",
      type: "Current capability",
      meaningForDesigners: "Routine variants, drafts, UI exploration, and implementation support can be offloaded. Designers should spend more time on gnarly flows: exception handling, human-in-the-loop control, explainability, workflows across roles, and domain-specific constraints."
    },
    {
      date: "2026-07-21",
      company: "Cursor",
      speaker: "Maxime Prades, Lead Product, Cursor",
      sourceUrl: "https://www.atlassian.com/blog/how-we-build/how-cursor-is-navigating-the-new-shape-of-product-craft",
      designArea: "Frontend collaboration; hiring/value of designers",
      exactPassage: "“Ultimately, technical roles are blending. PMs and Designers are entering the codebase, but the real job of the PM remains unchanged: helping to decide what to build. Judgment and taste is something not easily replicable by an LLM.”",
      type: "Prediction / current team practice",
      meaningForDesigners: "Designers who can read, edit, or reason about code will collaborate faster, but their defensible value is judgment: deciding what should exist, why, how it should behave under pressure, and how to make it trustworthy."
    },
    {
      date: "2026-06-30",
      company: "OpenAI",
      speaker: "Andrew Ambrosino, Product and Engineering Lead for Codex",
      sourceUrl: "https://www.webpronews.com/why-ai-masters-code-but-stumbles-on-taste-openais-codex-leader-on-designs-enduring-edge/",
      designArea: "Designer value; taste; evaluation",
      exactPassage: "“I think design’s a little bit harder to grade than software... Creating a loop where you can train the model on what’s good design and what’s bad design is just a little bit more tedious and onerous than, you know, does the code compile?”",
      type: "Prediction / limitation",
      meaningForDesigners: "Design quality is harder to automate because success is contextual. Designers in complex domains should build evaluation loops for comprehension, trust, safety, and outcomes—not assume AI can judge good UX from surface-level patterns."
    },
    {
      date: "2026-03-25",
      company: "Microsoft",
      speaker: "Yan Liu, Microsoft",
      sourceUrl: "https://www.youtube.com/watch?v=737Lnk25ZL4&vl=en-US",
      designArea: "Future UI; post-GUI interaction",
      exactPassage: "“what is the new paradigm for product design in the ... era of ... general AI which is we can call it like experience 3.0 ... moves away from GUI into something more intuitive, something more fun.”",
      type: "Prediction",
      meaningForDesigners: "Designers should prepare for workflows that are not screen-first: conversational, multimodal, generated, or agentic. In serious domains, the challenge is to keep these interfaces accountable, legible, and controllable."
    },
    {
      date: "2026-04-19",
      company: "Meta",
      speaker: "Cyrus Chau, Product Designer, Meta",
      sourceUrl: "https://linkedin.com/posts/justinux_ai-vibecoding-uxdesign-activity-7451663844357144576-o0df",
      designArea: "Designers coding; frontend collaboration; automation",
      exactPassage: "“How I ended up teaching designers to build and ship at Meta I lead AI-driven ‘vibe coding’ for designers at Meta, and I teach thousands of designers…”",
      type: "Current capability",
      meaningForDesigners: "Even large product organizations are pushing designers toward build-and-ship fluency. Complex-product designers should learn enough prototyping and code-assisted workflows to test realistic interactions, data states, and constraints before engineering handoff."
    }
  ]
};
