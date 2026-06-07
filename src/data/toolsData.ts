export interface Tool {
  id: string;
  name: string;
  website: string;
  category: string;
  description: string;
  bestFor: string;
  pricing: string;
  launchBuzz: number; // 30% weight
  socialBuzz: number; // 25% weight
  searchInterest: number; // 20% weight
  designerAdoption: number; // 15% weight
  editorialQuality: number; // 10% weight
  momentumScore: number; // calculated dynamically or hardcoded; we will provide it precalculated but also expose helper
  sevenDayChange: number;
  trendStatus: 'rising' | 'stable' | 'cooling';
  lastUpdated: string;
  pros: string[];
  cons: string[];
  alternatives: string[];
  verdict: string;
  scoreOutOf10: number;
  whyTrending: string;
  momentumHistory: { date: string; score: number }[];
}

export const CATEGORIES = [
  'UX Research',
  'Design-to-Code',
  'Wireframing',
  'Prototyping',
  'Figma Plugins',
  'Visual Design',
  'Image Generation',
  'Video Generation',
  'Accessibility',
  'Product Strategy',
  'User Testing'
] as const;

export type CategoryType = typeof CATEGORIES[number];

const calculateScore = (
  launch: number,
  social: number,
  search: number,
  adoption: number,
  quality: number
): number => {
  return Math.round(
    launch * 0.3 +
    social * 0.25 +
    search * 0.2 +
    adoption * 0.15 +
    quality * 0.1
  );
};

// Raw mock data for the 25 tools
export const rawToolsData = [
  {
    id: 'figma-ai',
    name: 'Figma AI',
    website: 'https://figma.com',
    category: 'Figma Plugins',
    description: 'Figma\'s native generative design utilities, text-to-design generation, auto-layouts, and asset search.',
    bestFor: 'Automating vector layouts, copywriting, and bulk layer naming inside Figma workspaces.',
    pricing: 'Included in Figma Pro/Enterprise plans',
    launchBuzz: 95,
    socialBuzz: 92,
    searchInterest: 94,
    designerAdoption: 96,
    editorialQuality: 88,
    sevenDayChange: 3.5,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-05',
    pros: [
      'Natively integrated into the industry-standard UI tool',
      'Excellent vector-based manipulation and auto-layout setup',
      'Saves hours of naming files and writing placeholder copy'
    ],
    cons: [
      'Restricted entirely to the Figma ecosystem',
      'Generative UI layouts can feel generic without custom styling',
      'Requires paid plans for complete features'
    ],
    alternatives: ['Galileo AI', 'Uizard', 'Magician for Figma'],
    verdict: 'An absolute game-changer for daily Figma practitioners. It doesn\'t replace UI designers but speeds up micro-workflows tremendously.',
    scoreOutOf10: 9.0,
    whyTrending: 'Beta rollouts are expanding to enterprise accounts; designer tweets showing layout autogeneration are going viral.',
    momentumHistory: [
      { date: 'May 07', score: 88 },
      { date: 'May 17', score: 91 },
      { date: 'May 27', score: 93 },
      { date: 'Jun 06', score: 94 }
    ]
  },
  {
    id: 'framer-ai',
    name: 'Framer AI',
    website: 'https://framer.com',
    category: 'Prototyping',
    description: 'AI-driven generation of landing pages, copy, visual styling, and instant publication.',
    bestFor: 'Quickly launching marketing campaigns and high-fidelity landing pages directly from text.',
    pricing: 'Freemium (Paid plans from $15/mo)',
    launchBuzz: 89,
    socialBuzz: 91,
    searchInterest: 88,
    designerAdoption: 90,
    editorialQuality: 92,
    sevenDayChange: 1.8,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-04',
    pros: [
      'Incredibly high quality visual results out of the box',
      'Outputs are fully responsive and editable directly in Framer',
      'Top-tier animation library and SEO out of the box'
    ],
    cons: [
      'Steep learning curve for advanced editing',
      'Hosting costs can add up for multiple small sites',
      'Vendor lock-in: cannot easily export React code to elsewhere'
    ],
    alternatives: ['Relume', 'v0', 'Canva AI'],
    verdict: 'The best design-to-web publishing tool currently on the market. Perfect for designers wanting to build ready-to-use sites fast.',
    scoreOutOf10: 9.1,
    whyTrending: 'Launch of new CMS AI translation features and improved mobile responsive generation algorithm.',
    momentumHistory: [
      { date: 'May 07', score: 87 },
      { date: 'May 17', score: 88 },
      { date: 'May 27', score: 89 },
      { date: 'Jun 06', score: 90 }
    ]
  },
  {
    id: 'uizard',
    name: 'Uizard',
    website: 'https://uizard.io',
    category: 'Wireframing',
    description: 'Generates wireframes and interactive prototypes from screenshots, sketches, or plain text prompts.',
    bestFor: 'Rapid ideation, wireframing, and creating mockups for non-designers and product managers.',
    pricing: 'Freemium (Paid plans from $12/mo)',
    launchBuzz: 82,
    socialBuzz: 78,
    searchInterest: 84,
    designerAdoption: 72,
    editorialQuality: 75,
    sevenDayChange: -0.5,
    trendStatus: 'stable' as const,
    lastUpdated: '2026-06-03',
    pros: [
      'Converts scanned hand-drawn paper sketches to digital wireframes instantly',
      'Extremely friendly for beginners and product owners',
      'Cooperative multiplayer editing is highly responsive'
    ],
    cons: [
      'Generated UI elements lack the complexity required for production apps',
      'Export options for Figma are somewhat limited and lose layout integrity',
      'Design output can feel template-ish'
    ],
    alternatives: ['Visily', 'Galileo AI', 'Figma AI'],
    verdict: 'Great for rapid conceptualization and getting client feedback in early phases, but lacks custom depth for advanced designers.',
    scoreOutOf10: 7.8,
    whyTrending: 'Steady organic search growth but social momentum has stabilized after their v3 feature launch cycle.',
    momentumHistory: [
      { date: 'May 07', score: 80 },
      { date: 'May 17', score: 80 },
      { date: 'May 27', score: 79 },
      { date: 'Jun 06', score: 79 }
    ]
  },
  {
    id: 'galileo-ai',
    name: 'Galileo AI',
    website: 'https://usegalileo.ai',
    category: 'Wireframing',
    description: 'Generates high-fidelity UI designs from simple text prompts, exporting directly to Figma as editable vector layers.',
    bestFor: 'Creating clean interface concepts and screens for web and mobile apps.',
    pricing: 'Paid plans from $19/mo (Limited free trial)',
    launchBuzz: 92,
    socialBuzz: 88,
    searchInterest: 85,
    designerAdoption: 80,
    editorialQuality: 86,
    sevenDayChange: 2.1,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-05',
    pros: [
      'Generates fully editable vector layers, auto-layouts, and typography matching Figma specs',
      'High-quality aesthetic designs, avoiding standard generic AI outputs',
      'Supports complex multi-screen layouts with consistent styling'
    ],
    cons: [
      'Credits run out quickly on complex dashboard queries',
      'Lacks custom brand assets or design token alignment',
      'Difficult to get precise screen iterations via text prompts'
    ],
    alternatives: ['Figma AI', 'Visily', 'Uizard'],
    verdict: 'One of the most impressive tools for generating initial UI screens. The vector export to Figma makes it actually usable in real design systems.',
    scoreOutOf10: 8.7,
    whyTrending: 'Newly added support for custom UI component libraries inside prompts, resulting in massive designer interest on X.',
    momentumHistory: [
      { date: 'May 07', score: 83 },
      { date: 'May 17', score: 85 },
      { date: 'May 27', score: 86 },
      { date: 'Jun 06', score: 88 }
    ]
  },
  {
    id: 'relume',
    name: 'Relume',
    website: 'https://relume.io',
    category: 'Wireframing',
    description: 'AI site builder that designs wireframes, sitemaps, and landing pages using components from their Figma/Webflow library.',
    bestFor: 'Constructing landing page structures, information architecture, and content frameworks.',
    pricing: 'Freemium (Paid plans from $38/mo)',
    launchBuzz: 88,
    socialBuzz: 90,
    searchInterest: 86,
    designerAdoption: 89,
    editorialQuality: 94,
    sevenDayChange: 2.4,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-06',
    pros: [
      'Based on top-tier components that plug directly into Webflow and Figma structures',
      'Excellent UX sitemap-to-wireframe logic and layout hierarchy',
      'Outputs accurate, component-driven copies, reducing filler text'
    ],
    cons: [
      'Premium plans are relatively expensive for solo freelancers',
      'Component styles are largely black and white; requires styling later',
      'Primarily focused on standard marketing pages, not complex software UIs'
    ],
    alternatives: ['Framer AI', 'Visily', 'FigJam AI'],
    verdict: 'An indispensable tool for agency UX designers. Relume bridges information architecture and wireframing cleaner than any competitor.',
    scoreOutOf10: 9.3,
    whyTrending: 'Release of their Webflow native App sync tool, allowing instant synchronization of AI sitemaps to live pages.',
    momentumHistory: [
      { date: 'May 07', score: 86 },
      { date: 'May 17', score: 87 },
      { date: 'May 27', score: 88 },
      { date: 'Jun 06', score: 89 }
    ]
  },
  {
    id: 'visily',
    name: 'Visily',
    website: 'https://visily.ai',
    category: 'Wireframing',
    description: 'Wireframing tool that uses AI to convert screenshots, hand-drawn sketches, or templates into fully customizable digital screens.',
    bestFor: 'Fast mockups and team brainstorms, especially converting legacy screenshots to editable assets.',
    pricing: 'Free (Monetization coming soon)',
    launchBuzz: 76,
    socialBuzz: 70,
    searchInterest: 73,
    designerAdoption: 68,
    editorialQuality: 80,
    sevenDayChange: -1.2,
    trendStatus: 'cooling' as const,
    lastUpdated: '2026-06-01',
    pros: [
      'Screenshot-to-design tool is remarkably accurate',
      'Entirely free to use currently with unlimited teammates',
      'Clean export to Figma with auto-grouping'
    ],
    cons: [
      'Community template selection is small',
      'Slower update cycles compared to competitors',
      'AI style generator occasionally glitches'
    ],
    alternatives: ['Uizard', 'Relume', 'Figma AI'],
    verdict: 'A robust wireframing workspace that excels at design migration, but needs to speed up its feature cadence to keep up with industry trends.',
    scoreOutOf10: 7.4,
    whyTrending: 'User acquisition has slowed down slightly as competitors roll out native Figma integrations.',
    momentumHistory: [
      { date: 'May 07', score: 75 },
      { date: 'May 17', score: 74 },
      { date: 'May 27', score: 74 },
      { date: 'Jun 06', score: 73 }
    ]
  },
  {
    id: 'maze',
    name: 'Maze',
    website: 'https://maze.co',
    category: 'User Testing',
    description: 'User testing platform with integrated AI to synthesize quantitative results, write test questions, and summarize feedback.',
    bestFor: 'Conducting automated usability tests and generating visual reports for product teams.',
    pricing: 'Freemium (Paid plans from $99/mo)',
    launchBuzz: 80,
    socialBuzz: 82,
    searchInterest: 84,
    designerAdoption: 88,
    editorialQuality: 87,
    sevenDayChange: 0.8,
    trendStatus: 'stable' as const,
    lastUpdated: '2026-06-04',
    pros: [
      'Saves dozens of hours in UX researcher synthesis and transcript coding',
      'AI helper prompts suggest unbiased question variants during test setup',
      'Integrates seamlessly with Figma prototypes'
    ],
    cons: [
      'Very expensive entry tier for small design teams',
      'AI summary reports can miss nuanced qualitative micro-behaviors',
      'Rigid user recruitment panel setup'
    ],
    alternatives: ['Useberry', 'Looppanel', 'Dovetail'],
    verdict: 'The gold standard for prototype testing. AI additions strengthen its automated reporting, though the pricing remains high.',
    scoreOutOf10: 8.4,
    whyTrending: 'Steady growth and launch of "AI Interviewer" beta features targeting remote quantitative tests.',
    momentumHistory: [
      { date: 'May 07', score: 82 },
      { date: 'May 17', score: 82 },
      { date: 'May 27', score: 83 },
      { date: 'Jun 06', score: 83 }
    ]
  },
  {
    id: 'useberry',
    name: 'Useberry',
    website: 'https://useberry.com',
    category: 'User Testing',
    description: 'Usability testing platform providing AI-generated user session insights, screen recordings, heatmaps, and funnel drop-offs.',
    bestFor: 'Prototyping validations, user flows, and recording user test details.',
    pricing: 'Freemium (Paid plans from $33/mo)',
    launchBuzz: 75,
    socialBuzz: 72,
    searchInterest: 75,
    designerAdoption: 70,
    editorialQuality: 78,
    sevenDayChange: 0.2,
    trendStatus: 'stable' as const,
    lastUpdated: '2026-06-02',
    pros: [
      'Affordable entry pricing compared to major testing suites',
      'Great heatmapping features and click tracking',
      'Support for multiple prototyping environments'
    ],
    cons: [
      'AI report summaries are less detailed than Maze\'s equivalents',
      'Participant pool filtering is not highly granular',
      'Dashboard interface feels slightly dated'
    ],
    alternatives: ['Maze', 'Looppanel', 'Useberry'],
    verdict: 'A budget-friendly alternative for startup UX teams. Its AI analytics speed up heat-map interpretations and funnel tracking.',
    scoreOutOf10: 7.5,
    whyTrending: 'Minor product improvements and new dashboard integrations introduced this month.',
    momentumHistory: [
      { date: 'May 07', score: 74 },
      { date: 'May 17', score: 74 },
      { date: 'May 27', score: 74 },
      { date: 'Jun 06', score: 74 }
    ]
  },
  {
    id: 'dovetail',
    name: 'Dovetail',
    website: 'https://dovetailapp.com',
    category: 'UX Research',
    description: 'AI-driven UX research repository that transcribes audio/video, highlights user interview themes, and links research insights.',
    bestFor: 'Large design teams needing a central, smart source of truth for user testing insights.',
    pricing: 'Paid plans from $29/user/mo (Free trial)',
    launchBuzz: 85,
    socialBuzz: 88,
    searchInterest: 90,
    designerAdoption: 91,
    editorialQuality: 93,
    sevenDayChange: 1.5,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-05',
    pros: [
      'Phenomenal semantic search across hundreds of raw user transcripts',
      'AI generates highly accurate video tags, highlights, and summaries',
      'Beautiful user interface and workspace organization'
    ],
    cons: [
      'Steep setup phase to organize tags and folder hierarchy',
      'Requires substantial existing data to unlock full value of AI insights',
      'Limited automated testing compared to user-facing platforms'
    ],
    alternatives: ['Notably', 'Looppanel', 'Maze'],
    verdict: 'The leading choice for user research repositories. The AI clustering features make synthesizing dozens of customer conversations a breeze.',
    scoreOutOf10: 9.2,
    whyTrending: 'New "Search across projects" AI feature launched, driving adoption among enterprise UX teams.',
    momentumHistory: [
      { date: 'May 07', score: 86 },
      { date: 'May 17', score: 87 },
      { date: 'May 27', score: 88 },
      { date: 'Jun 06', score: 88 }
    ]
  },
  {
    id: 'notably',
    name: 'Notably',
    website: 'https://notably.ai',
    category: 'UX Research',
    description: 'AI-powered UX research workspace that functions like a canvas, transcribing, coding, and extracting themes dynamically.',
    bestFor: 'Visual-oriented UX researchers who like canvas-style mapping and card sorting.',
    pricing: 'Paid plans from $25/mo (Free trial)',
    launchBuzz: 80,
    socialBuzz: 78,
    searchInterest: 76,
    designerAdoption: 70,
    editorialQuality: 82,
    sevenDayChange: -0.2,
    trendStatus: 'stable' as const,
    lastUpdated: '2026-06-03',
    pros: [
      'Interactive canvas layout matches physical post-it note synthesis workflows',
      'AI synthesis creates draft executive summaries and slide decks automatically',
      'Strong transcription speed and multi-language support'
    ],
    cons: [
      'Performance can stutter when dealing with hundreds of post-it items',
      'Less robust security certifications than Dovetail for enterprise usage',
      'Export layouts are occasionally hard to configure'
    ],
    alternatives: ['Dovetail', 'Looppanel', 'Notably'],
    verdict: 'A brilliant tool for visual thinkers. If you love spatial clustering, Notably\'s AI helpers accelerate your synthesis process.',
    scoreOutOf10: 7.9,
    whyTrending: 'Stable search volume; steady usage in freelancer and agency design circles.',
    momentumHistory: [
      { date: 'May 07', score: 78 },
      { date: 'May 17', score: 78 },
      { date: 'May 27', score: 78 },
      { date: 'Jun 06', score: 78 }
    ]
  },
  {
    id: 'looppanel',
    name: 'Looppanel',
    website: 'https://looppanel.com',
    category: 'UX Research',
    description: 'AI platform that records, transcribes, and structures user interviews, generating analysis grids and timestamped notes.',
    bestFor: 'UX researchers, product managers, and designers who want to speed up post-interview analysis.',
    pricing: 'Paid plans from $30/mo (Free trial)',
    launchBuzz: 84,
    socialBuzz: 80,
    searchInterest: 81,
    designerAdoption: 78,
    editorialQuality: 85,
    sevenDayChange: 1.1,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-04',
    pros: [
      'Generates automated notes tied directly to video bookmarks',
      'Clean analysis grids that help compare answers across participants side-by-side',
      'Very user-friendly setup with close to zero learning curve'
    ],
    cons: [
      'Fewer folder tagging metrics than massive repositories like Dovetail',
      'Video editor for making shareable clips is a bit basic',
      'Accent detection in transcription can occasionally miss jargon'
    ],
    alternatives: ['Dovetail', 'Notably', 'Maze'],
    verdict: 'If you want to spend less time transcribing and more time comparing results in a neat grid, Looppanel is the perfect utility.',
    scoreOutOf10: 8.2,
    whyTrending: 'Growing viral mentions on LinkedIn from product managers praising its time-to-insight speed.',
    momentumHistory: [
      { date: 'May 07', score: 80 },
      { date: 'May 17', score: 81 },
      { date: 'May 27', score: 81 },
      { date: 'Jun 06', score: 82 }
    ]
  },
  {
    id: 'v0',
    name: 'v0',
    website: 'https://v0.dev',
    category: 'Design-to-Code',
    description: 'Vercel\'s generative UI system that creates production-ready frontend code (React, Tailwind CSS, shadcn/ui) from text or image prompts.',
    bestFor: 'Designers building operational UI prototypes and engineers looking to bypass initial markup styling.',
    pricing: 'Freemium (Paid plans from $20/mo)',
    launchBuzz: 99,
    socialBuzz: 98,
    searchInterest: 97,
    designerAdoption: 95,
    editorialQuality: 97,
    sevenDayChange: 4.8,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-06',
    pros: [
      'Outputs gorgeous, semantic React components matching modern tailwind/shadcn standards',
      'Upload a screenshot of any web UI and it replicates it with astonishing fidelity',
      'Interactive sandbox environment allows quick testing and tweaking directly in browser'
    ],
    cons: [
      'Primarily focused on React; other framework export support is secondary',
      'Does not create backend logic or full application states natively',
      'Advanced components can consume standard query credits quickly'
    ],
    alternatives: ['Lovable', 'Bolt', 'Cursor'],
    verdict: 'The absolute benchmark for generative UI code. It has fundamentally changed the speed at which ideas become live components.',
    scoreOutOf10: 9.8,
    whyTrending: 'Recent updates supporting interactive Next.js block exports and direct copy-paste code imports.',
    momentumHistory: [
      { date: 'May 07', score: 92 },
      { date: 'May 17', score: 94 },
      { date: 'May 27', score: 96 },
      { date: 'Jun 06', score: 98 }
    ]
  },
  {
    id: 'lovable',
    name: 'Lovable',
    website: 'https://lovable.dev',
    category: 'Design-to-Code',
    description: 'Generative AI platform that builds full-stack React web apps with databases, authentication, and custom logic from conversational prompts.',
    bestFor: 'Product designers looking to build functioning SaaS MVPs without writing code.',
    pricing: 'Freemium (Paid plans from $24/mo)',
    launchBuzz: 96,
    socialBuzz: 94,
    searchInterest: 92,
    designerAdoption: 89,
    editorialQuality: 93,
    sevenDayChange: 3.2,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-05',
    pros: [
      'Creates actual functional backends and databases, not just frontends',
      'Design styling defaults are highly modern and clean out of the box',
      'Allows deployment to custom domains in under 60 seconds'
    ],
    cons: [
      'Large complex state flows can occasionally introduce logic loops',
      'Codebase customization requires git integration knowledge',
      'Higher pricing tiers are required for professional commercial products'
    ],
    alternatives: ['v0', 'Bolt', 'Replit Agent'],
    verdict: 'An incredible advancement in no-code/low-code development. It enables design teams to deliver fully functional web apps in record time.',
    scoreOutOf10: 9.4,
    whyTrending: 'Massive viral threads showing founders building complex marketplaces and SaaS products in single afternoons.',
    momentumHistory: [
      { date: 'May 07', score: 88 },
      { date: 'May 17', score: 90 },
      { date: 'May 27', score: 92 },
      { date: 'Jun 06', score: 93 }
    ]
  },
  {
    id: 'bolt',
    name: 'Bolt',
    website: 'https://bolt.new',
    category: 'Design-to-Code',
    description: 'Browser-based development environment that uses AI to scaffold, run, build, and deploy full stack web apps in real-time.',
    bestFor: 'Testing UI components and spinning up sandboxed WebContainers directly in browser tabs.',
    pricing: 'Freemium (Paid plans from $20/mo)',
    launchBuzz: 94,
    socialBuzz: 93,
    searchInterest: 91,
    designerAdoption: 87,
    editorialQuality: 92,
    sevenDayChange: 2.9,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-05',
    pros: [
      'Zero local setup required; WebContainers run npm processes inside the browser',
      'Generates and patches files with clear code diffs',
      'Integrated dev preview server updates with live hot reloading'
    ],
    cons: [
      'In-browser sandbox memory can leak or crash on heavy node operations',
      'Exporting to complex production infrastructure requires manual work',
      'Requires stable, fast internet connection'
    ],
    alternatives: ['v0', 'Lovable', 'Replit Agent'],
    verdict: 'The best sandbox generator for design testing. Witnessing a full Node.js project bootstrap inside your browser is magic.',
    scoreOutOf10: 9.2,
    whyTrending: 'Heavy social chatter around WebContainers capability and the release of new backend integration templates.',
    momentumHistory: [
      { date: 'May 07', score: 87 },
      { date: 'May 17', score: 89 },
      { date: 'May 27', score: 90 },
      { date: 'Jun 06', score: 92 }
    ]
  },
  {
    id: 'replit-agent',
    name: 'Replit Agent',
    website: 'https://replit.com',
    category: 'Design-to-Code',
    description: 'An AI-powered agent built inside Replit that designs, provisions databases, and codes web deployments from plain instructions.',
    bestFor: 'Quickly launching micro-services, APIs, and dynamic database applications.',
    pricing: 'Requires Replit Core membership ($20/mo)',
    launchBuzz: 90,
    socialBuzz: 88,
    searchInterest: 89,
    designerAdoption: 82,
    editorialQuality: 88,
    sevenDayChange: 1.2,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-04',
    pros: [
      'Remarkable at system provisioning (databases, servers, packages)',
      'Highly conversational; handles errors and repairs broken scripts automatically',
      'Native deployment to Replit servers makes hosting effortless'
    ],
    cons: [
      'UI design output is typically simpler compared to v0 or Lovable',
      'Must buy Replit Core to use, adding entry friction for casual users',
      'Lacks modern design layouts without careful prompting guidelines'
    ],
    alternatives: ['Lovable', 'Bolt', 'Cursor'],
    verdict: 'A powerhouse for backend-heavy applications. While its visual designs need manual polish, its database intelligence is unmatched.',
    scoreOutOf10: 8.8,
    whyTrending: 'Continued interest from non-technical creators building data dashboards and Slack integrations.',
    momentumHistory: [
      { date: 'May 07', score: 86 },
      { date: 'May 17', score: 86 },
      { date: 'May 27', score: 87 },
      { date: 'Jun 06', score: 88 }
    ]
  },
  {
    id: 'cursor',
    name: 'Cursor',
    website: 'https://cursor.com',
    category: 'Design-to-Code',
    description: 'AI-first code editor fork of VS Code, enabling multi-file edits, codebase chat, and fast auto-completions.',
    bestFor: 'Designer-developers and technical designers who want full codebase control alongside AI assistance.',
    pricing: 'Freemium (Pro plan at $20/mo)',
    launchBuzz: 95,
    socialBuzz: 97,
    searchInterest: 98,
    designerAdoption: 94,
    editorialQuality: 99,
    sevenDayChange: 2.5,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-06',
    pros: [
      'Composer mode edits multiple files simultaneously to execute broad design-system updates',
      'Integrates all custom VS Code extensions, preferences, and hotkeys out of the box',
      'Top-notch contextual codebase understanding'
    ],
    cons: [
      'Requires basic coding literacy; not a pure drag-and-drop or prompt-to-web app creator',
      'Can generate massive git diffs that require thorough review',
      'Heavy AI models can experience lag during peak usage hours'
    ],
    alternatives: ['Replit Agent', 'v0', 'Bolt'],
    verdict: 'The ultimate IDE for anyone who writes code. The multi-file composer speeds up editing stylesheets and page components by tenfold.',
    scoreOutOf10: 9.7,
    whyTrending: 'Composer features are dominating X and LinkedIn feeds as designers build complex frontends by chatting with their code editor.',
    momentumHistory: [
      { date: 'May 07', score: 92 },
      { date: 'May 17', score: 93 },
      { date: 'May 27', score: 94 },
      { date: 'Jun 06', score: 96 }
    ]
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    website: 'https://midjourney.com',
    category: 'Image Generation',
    description: 'Top-tier text-to-image generator generating photorealistic illustrations, assets, icons, and interface patterns via prompt commands.',
    bestFor: 'Generating hero illustrations, visual design concepts, and mock assets for prototypes.',
    pricing: 'Paid plans from $10/mo (No free tier)',
    launchBuzz: 92,
    socialBuzz: 95,
    searchInterest: 96,
    designerAdoption: 93,
    editorialQuality: 96,
    sevenDayChange: 0.6,
    trendStatus: 'stable' as const,
    lastUpdated: '2026-06-05',
    pros: [
      'Unmatched artistic styling, detail rendering, and photorealism',
      'Web editor and workspace UI has reduced Discord dependency',
      'Excellent aspect ratio and upscale scaling tools'
    ],
    cons: [
      'Prompt syntax can require deep experimentation for precise brand consistency',
      'Lack of native vector SVG exports (generates raster PNG/JPG only)',
      'Privacy controls are locked behind expensive premium tiers'
    ],
    alternatives: ['Adobe Firefly', 'Canva AI', 'Khroma'],
    verdict: 'The undisputed king of prompt-driven visual assets. Its artistic range is second to none, though vector support is sorely missed.',
    scoreOutOf10: 9.4,
    whyTrending: 'Wide rollout of the new web dashboard creator interface, moving users away from Discord command prompts.',
    momentumHistory: [
      { date: 'May 07', score: 94 },
      { date: 'May 17', score: 94 },
      { date: 'May 27', score: 94 },
      { date: 'Jun 06', score: 94 }
    ]
  },
  {
    id: 'runway',
    name: 'Runway',
    website: 'https://runwayml.com',
    category: 'Video Generation',
    description: 'AI video generation and editing suite featuring text-to-video, image-to-video, and cinematic editing controls.',
    bestFor: 'Creating motion design assets, product concept teasers, and high-fidelity video content.',
    pricing: 'Freemium (Paid plans from $15/mo)',
    launchBuzz: 90,
    socialBuzz: 92,
    searchInterest: 89,
    designerAdoption: 85,
    editorialQuality: 90,
    sevenDayChange: 3.1,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-06',
    pros: [
      'Incredible camera control movements and lighting effects',
      'Strong green screen, object removal, and motion tracking filters built in',
      'Continuous speed upgrades to generation times'
    ],
    cons: [
      'Video generations are relatively short (4-8 seconds default)',
      'Character body deformation and object glitches remain common',
      'High rendering demands mean quick consumption of rendering credits'
    ],
    alternatives: ['Adobe Firefly', 'Canva AI'],
    verdict: 'The gold standard for AI motion and video. It allows creative designers to storyboard and direct video layouts in minutes rather than weeks.',
    scoreOutOf10: 9.0,
    whyTrending: 'Release of their Gen-3 Alpha model showing hyper-realistic human motion and fluid camera angles.',
    momentumHistory: [
      { date: 'May 07', score: 86 },
      { date: 'May 17', score: 87 },
      { date: 'May 27', score: 88 },
      { date: 'Jun 06', score: 90 }
    ]
  },
  {
    id: 'adobe-firefly',
    name: 'Adobe Firefly',
    website: 'https://adobe.com/firefly',
    category: 'Image Generation',
    description: 'Adobe\'s commercially safe generative AI model, powering generative fill, recoloring, and graphic additions across Creative Cloud.',
    bestFor: 'Enterprise design groups needing commercial safety and seamless integration with Photoshop and Illustrator.',
    pricing: 'Included in Adobe subscription (Freemium standalone)',
    launchBuzz: 85,
    socialBuzz: 86,
    searchInterest: 88,
    designerAdoption: 92,
    editorialQuality: 89,
    sevenDayChange: 0.5,
    trendStatus: 'stable' as const,
    lastUpdated: '2026-06-04',
    pros: [
      'Trained exclusively on licensed content; safe for commercial client designs',
      'Works natively inside Photoshop, Illustrator, and InDesign layers',
      'Amazing vector recoloring and font style generators'
    ],
    cons: [
      'Photorealism output occasionally lags behind Midjourney\'s artistic levels',
      'Content credentials tag is added to metadata, which some clients dislike',
      'Heavy licensing limits can block some experimental prompt styles'
    ],
    alternatives: ['Midjourney', 'Canva AI', 'Magician for Figma'],
    verdict: 'For corporate design departments, Firefly is the only viable option due to its commercial indemnity. Integration makes Photoshop edits incredibly fast.',
    scoreOutOf10: 8.7,
    whyTrending: 'Photoshop native updates and enterprise custom-model training programs gaining corporate traction.',
    momentumHistory: [
      { date: 'May 07', score: 87 },
      { date: 'May 17', score: 87 },
      { date: 'May 27', score: 87 },
      { date: 'Jun 06', score: 87 }
    ]
  },
  {
    id: 'canva-ai',
    name: 'Canva AI',
    website: 'https://canva.com',
    category: 'Visual Design',
    description: 'Canva\'s "Magic Studio" tools, providing automated layouts, content writing, image adjustments, and design translations.',
    bestFor: 'Casual designers, marketing teams, and social media creators looking for automated layout graphics.',
    pricing: 'Freemium (Magic Studio requires Canva Pro from $120/yr)',
    launchBuzz: 84,
    socialBuzz: 85,
    searchInterest: 92,
    designerAdoption: 89,
    editorialQuality: 80,
    sevenDayChange: 0.1,
    trendStatus: 'stable' as const,
    lastUpdated: '2026-06-03',
    pros: [
      'Extremely simple interface, highly optimized for speed and social graphics',
      'Magic switch tool translates designs and sizes across channels instantly',
      'Massive assets library and templates directory'
    ],
    cons: [
      'Design layouts can feel amateur or repetitive to professional UX experts',
      'Cannot export clean UI assets directly into coding workflows or Figma',
      'Limited custom typography styling'
    ],
    alternatives: ['Adobe Firefly', 'Khroma', 'Magician for Figma'],
    verdict: 'The ideal assistant for content marketers. While it lacks professional product design features, its speed for template assembly is unmatched.',
    scoreOutOf10: 8.4,
    whyTrending: 'Canva Enterprise updates and new team presentation templates rolling out globally.',
    momentumHistory: [
      { date: 'May 07', score: 85 },
      { date: 'May 17', score: 85 },
      { date: 'May 27', score: 85 },
      { date: 'Jun 06', score: 85 }
    ]
  },
  {
    id: 'khroma',
    name: 'Khroma',
    website: 'http://khroma.co',
    category: 'Visual Design',
    description: 'An AI color tool that learns your color preferences and creates endless color combinations, gradients, and typography previews.',
    bestFor: 'UI/UX designers searching for fresh color combinations and palette ideas.',
    pricing: 'Free',
    launchBuzz: 70,
    socialBuzz: 74,
    searchInterest: 78,
    designerAdoption: 76,
    editorialQuality: 82,
    sevenDayChange: -0.4,
    trendStatus: 'stable' as const,
    lastUpdated: '2026-06-02',
    pros: [
      'Learns from a set of 50 colors you select, creating customized layouts',
      'Free to use and clean web UI',
      'Shows colors mapped onto real illustrations, typography, and blocks'
    ],
    cons: [
      'Lacks advanced features like exportable Figma variables or tokens',
      'Has not received a major update in several months',
      'No vector color system integrations'
    ],
    alternatives: ['Canva AI', 'Magician for Figma', 'Diagram'],
    verdict: 'A great utility for color block inspiration. It is lightweight and free, though it works best as a quick side tool rather than a central platform.',
    scoreOutOf10: 7.5,
    whyTrending: 'Consistent reference in designer lists on Pinterest and designer resource newsletters.',
    momentumHistory: [
      { date: 'May 07', score: 75 },
      { date: 'May 17', score: 75 },
      { date: 'May 27', score: 74 },
      { date: 'Jun 06', score: 74 }
    ]
  },
  {
    id: 'magician-for-figma',
    name: 'Magician for Figma',
    website: 'https://diagram.com/magician',
    category: 'Figma Plugins',
    description: 'Figma plugin by Diagram that generates SVG icons, copy, and images from text descriptions.',
    bestFor: 'Quickly placing placeholders, custom SVG icons, and copy drafts during layout sprints.',
    pricing: 'Paid plans from $9/mo (Free trial)',
    launchBuzz: 80,
    socialBuzz: 78,
    searchInterest: 75,
    designerAdoption: 82,
    editorialQuality: 84,
    sevenDayChange: -1.8,
    trendStatus: 'cooling' as const,
    lastUpdated: '2026-06-03',
    pros: [
      'Creates scalable SVG vectors inside Figma layers directly',
      'Saves time by replacing standard icon search panels',
      'Lightweight and simple to launch'
    ],
    cons: [
      'Some features overlaps with Figma\'s new native AI layout features',
      'Icon styles can look inconsistent if prompted separately',
      'Image generator is lower resolution than modern external tools'
    ],
    alternatives: ['Figma AI', 'Diagram', 'Canva AI'],
    verdict: 'A historic pioneer in Figma plugins. However, with Figma launching native AI tools, Magician\'s standalone value has decreased.',
    scoreOutOf10: 7.7,
    whyTrending: 'Downward momentum shift since Figma began rollouts of its own built-in design assistants.',
    momentumHistory: [
      { date: 'May 07', score: 81 },
      { date: 'May 17', score: 80 },
      { date: 'May 27', score: 79 },
      { date: 'Jun 06', score: 78 }
    ]
  },
  {
    id: 'diagram',
    name: 'Diagram',
    website: 'https://diagram.com',
    category: 'Figma Plugins',
    description: 'Design utility collection (Genius, Magician, Automator) creating responsive UI layouts, smart components, and bulk edits.',
    bestFor: 'Advanced Figma workflows, styling automation, and layout scripts.',
    pricing: 'Various subscription models (Awaiting Figma Integration updates)',
    launchBuzz: 85,
    socialBuzz: 84,
    searchInterest: 80,
    designerAdoption: 85,
    editorialQuality: 88,
    sevenDayChange: -1.0,
    trendStatus: 'stable' as const,
    lastUpdated: '2026-06-04',
    pros: [
      'Extremely high technical depth; Automator script capabilities are incredibly deep',
      'Directly engineered in cooperation with Figma\'s core team',
      'Pushes the boundaries of spatial UI design'
    ],
    cons: [
      'Acquisition by Figma has slowed standalone release updates',
      'High learning curve to customize scripts in Automator',
      'Beta slots for Genius are heavily restricted'
    ],
    alternatives: ['Figma AI', 'Magician for Figma', 'Khroma'],
    verdict: 'The team behind Diagram is now building Figma\'s native AI features. Outstanding technology, though most of its tools are merging into Figma core.',
    scoreOutOf10: 8.3,
    whyTrending: 'Ongoing integration efforts inside Figma; community remains highly curious about upcoming features.',
    momentumHistory: [
      { date: 'May 07', score: 85 },
      { date: 'May 17', score: 84 },
      { date: 'May 27', score: 84 },
      { date: 'Jun 06', score: 84 }
    ]
  },
  {
    id: 'figjam-ai',
    name: 'FigJam AI',
    website: 'https://figma.com/figjam',
    category: 'Product Strategy',
    description: 'Figma\'s whiteboard AI that generates workshop templates, brainstorm boards, sitemaps, and clusters research post-its.',
    bestFor: 'UX workshop leads, product managers setting up user flows, and mapping out brainstorming sessions.',
    pricing: 'Included in FigJam plans (Free/Paid tiers)',
    launchBuzz: 88,
    socialBuzz: 84,
    searchInterest: 86,
    designerAdoption: 91,
    editorialQuality: 89,
    sevenDayChange: 1.6,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-05',
    pros: [
      'Generates beautiful visual agendas and sorting tables in seconds',
      'AI summarizes hundreds of stickies into concise clusters automatically',
      'Collaborative, fun features suitable for client-facing meetings'
    ],
    cons: [
      'Workshop layouts can feel similar if generated with simple prompts',
      'Cannot export boards to structured data outside of Figma/CSV files',
      'Requires team alignment to use FigJam over Miro'
    ],
    alternatives: ['Relume', 'Dovetail', 'Notably'],
    verdict: 'Saves product designers and leads valuable hours of setup before meetings. FigJam AI\'s card sorting and summarization are stellar.',
    scoreOutOf10: 8.8,
    whyTrending: 'High corporate adoption rates as remote teams use AI templates to automate recurring agile retrospectives.',
    momentumHistory: [
      { date: 'May 07', score: 85 },
      { date: 'May 17', score: 86 },
      { date: 'May 27', score: 86 },
      { date: 'Jun 06', score: 87 }
    ]
  },
  {
    id: 'stark',
    name: 'Stark',
    website: 'https://getstark.co',
    category: 'Accessibility',
    description: 'AI-assisted accessibility platform that scans designs for color contrast violations, screen reader labels, and focus order.',
    bestFor: 'Ensuring design system compliance with WCAG standards early in the design cycle.',
    pricing: 'Freemium (Paid plans from $25/mo)',
    launchBuzz: 82,
    socialBuzz: 83,
    searchInterest: 85,
    designerAdoption: 87,
    editorialQuality: 90,
    sevenDayChange: 1.1,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-05',
    pros: [
      'Scans files in seconds and suggests WCAG compliant alternative colors',
      'AI auto-suggests screen-reader descriptions for images',
      'Direct plugins for Figma, Sketch, and Chrome'
    ],
    cons: [
      'Advanced automation scan logs require premium plans',
      'Can flag minor false positives on complex layered vector objects',
      'Requires manual configuration for complex interactive page states'
    ],
    alternatives: ['Diagram', 'Figma AI'],
    verdict: 'An essential utility for modern product design. Stark\'s AI simplifies the complex world of accessibility compliance, turning scans into quick action items.',
    scoreOutOf10: 8.6,
    whyTrending: 'Increased compliance audits in EU and US markets driving corporate design teams to enforce Stark checks.',
    momentumHistory: [
      { date: 'May 07', score: 83 },
      { date: 'May 17', score: 83 },
      { date: 'May 27', score: 84 },
      { date: 'Jun 06', score: 84 }
    ]
  }
];

// Helper to precalculate the true weighted score and export the sorted list
export const toolsData: Tool[] = rawToolsData.map(tool => {
  const momentumScore = calculateScore(
    tool.launchBuzz,
    tool.socialBuzz,
    tool.searchInterest,
    tool.designerAdoption,
    tool.editorialQuality
  );
  return {
    ...tool,
    momentumScore
  };
}).sort((a, b) => b.momentumScore - a.momentumScore); // Sort by momentum score descending (rank order)
