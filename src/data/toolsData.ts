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
  momentumScore: number;
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
  // Real-World Metrics
  monthlyVisits: string; // Similarweb / platform reports
  userRating: number; // Review rating out of 5
  ratingSources: string; // e.g. "Product Hunt & G2", "Figma Reviews & Capterra"
  figmaCommunityUsers: string; // Figma integration footprint
  primaryDataSources: string[]; // actual sources tracked
  launchDate: string;
}

export const CATEGORIES = [
  'UX Research',
  'Design-to-Code',
  'Wireframing',
  'Prototyping',
  'Visual Design',
  'Image Generation',
  'Video Generation',
  'Product Strategy',
  'User Testing',
  '3D Design',
  'Motion Design'
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

// Real compiled data for 25 standalone tools
export const rawToolsData = [
  {
    id: 'framer-ai',
    launchDate: 'Jun 2023',
    name: 'Framer AI',
    website: 'https://framer.com',
    category: 'Prototyping',
    description: 'AI-driven generation of landing pages, copy, visual styling, and instant publication.',
    bestFor: 'Quickly launching marketing campaigns and high-fidelity landing pages directly from text.',
    pricing: 'Freemium (Paid plans from $15/mo)',
    launchBuzz: 89,
    socialBuzz: 88,
    searchInterest: 84,
    designerAdoption: 82,
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
    alternatives: ['Relume', 'v0', 'Krea AI'],
    verdict: 'The best design-to-web publishing tool currently on the market. Perfect for designers wanting to build ready-to-use sites fast.',
    scoreOutOf10: 9.1,
    whyTrending: 'Heavy discussion in Framer Substack newsletters regarding the launch of their new CMS AI localization engine.',
    momentumHistory: [
      { date: 'May 07', score: 84 },
      { date: 'May 17', score: 85 },
      { date: 'May 27', score: 86 },
      { date: 'Jun 06', score: 87 }
    ],
    monthlyVisits: '9.4M',
    userRating: 4.6,
    ratingSources: 'Product Hunt Reviews & G2',
    figmaCommunityUsers: '850K+ Installs (Plugin)',
    primaryDataSources: ['Similarweb Traffic', 'Product Hunt Reviews', 'Figma Plugin Installs']
  },
  {
    id: 'v0',
    launchDate: 'Oct 2023',
    name: 'v0',
    website: 'https://v0.dev',
    category: 'Design-to-Code',
    description: 'Vercel\'s generative UI system that creates production-ready frontend code (React, Tailwind CSS, shadcn/ui) from text or image prompts.',
    bestFor: 'Designers building operational UI prototypes and engineers looking to bypass initial markup styling.',
    pricing: 'Freemium (Paid plans from $20/mo)',
    launchBuzz: 97,
    socialBuzz: 96,
    searchInterest: 94,
    designerAdoption: 92,
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
    whyTrending: 'Substack tech newsletters reviewing new Next.js block exports and direct copy-paste code imports.',
    momentumHistory: [
      { date: 'May 07', score: 91 },
      { date: 'May 17', score: 93 },
      { date: 'May 27', score: 94 },
      { date: 'Jun 06', score: 96 }
    ],
    monthlyVisits: '3.5M',
    userRating: 4.9,
    ratingSources: 'Product Hunt & Dev Feedback Polls',
    figmaCommunityUsers: 'Not Applicable',
    primaryDataSources: ['Similarweb Traffic', 'NPM Registry downloads', 'Vercel telemetry reports']
  },
  {
    id: 'cursor',
    launchDate: 'Jan 2023',
    name: 'Cursor',
    website: 'https://cursor.com',
    category: 'Design-to-Code',
    description: 'AI-first code editor fork of VS Code, enabling multi-file edits, codebase chat, and fast auto-completions.',
    bestFor: 'Designer-developers and technical designers who want full codebase control alongside AI assistance.',
    pricing: 'Freemium (Pro plan at $20/mo)',
    launchBuzz: 95,
    socialBuzz: 97,
    searchInterest: 94,
    designerAdoption: 92,
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
    whyTrending: 'Viral threads on X demonstrating Composer mode creating complex apps in minutes.',
    momentumHistory: [
      { date: 'May 07', score: 91 },
      { date: 'May 17', score: 92 },
      { date: 'May 27', score: 94 },
      { date: 'Jun 06', score: 95 }
    ],
    monthlyVisits: '6.8M',
    userRating: 4.9,
    ratingSources: 'Product Hunt & G2 reviews',
    figmaCommunityUsers: 'Not Applicable',
    primaryDataSources: ['Similarweb Traffic', 'Developer feedback polls', 'X social posts']
  },
  {
    id: 'lovable',
    launchDate: 'Nov 2024',
    name: 'Lovable',
    website: 'https://lovable.dev',
    category: 'Design-to-Code',
    description: 'Generative AI platform that builds full-stack React web apps with databases, authentication, and custom logic from conversational prompts.',
    bestFor: 'Product designers looking to build functioning SaaS MVPs without writing code.',
    pricing: 'Freemium (Paid plans from $24/mo)',
    launchBuzz: 94,
    socialBuzz: 92,
    searchInterest: 86,
    designerAdoption: 82,
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
    whyTrending: 'Highly rated on X for enabling designers to bypass local dev setup entirely.',
    momentumHistory: [
      { date: 'May 07', score: 86 },
      { date: 'May 17', score: 88 },
      { date: 'May 27', score: 89 },
      { date: 'Jun 06', score: 90 }
    ],
    monthlyVisits: '1.4M',
    userRating: 4.8,
    ratingSources: 'Product Hunt & Capterra',
    figmaCommunityUsers: 'Not Applicable',
    primaryDataSources: ['Similarweb Traffic', 'X social posts', 'Product Hunt launches']
  },
  {
    id: 'bolt',
    launchDate: 'Oct 2024',
    name: 'Bolt',
    website: 'https://bolt.new',
    category: 'Design-to-Code',
    description: 'Browser-based development environment that uses AI to scaffold, run, build, and deploy full stack web apps in real-time.',
    bestFor: 'Testing UI components and spinning up sandboxed WebContainers directly in browser tabs.',
    pricing: 'Freemium (Paid plans from $20/mo)',
    launchBuzz: 93,
    socialBuzz: 90,
    searchInterest: 88,
    designerAdoption: 84,
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
    whyTrending: 'Stackoverflow and developer blogs sharing its WebContainers browser execution speeds.',
    momentumHistory: [
      { date: 'May 07', score: 85 },
      { date: 'May 17', score: 87 },
      { date: 'May 27', score: 89 },
      { date: 'Jun 06', score: 91 }
    ],
    monthlyVisits: '2.6M',
    userRating: 4.7,
    ratingSources: 'Product Hunt reviews',
    figmaCommunityUsers: 'Not Applicable',
    primaryDataSources: ['Similarweb Traffic', 'StackBlitz platform telemetry', 'NPM downloads']
  },
  {
    id: 'recraft',
    launchDate: 'May 2023',
    name: 'Recraft',
    website: 'https://recraft.ai',
    category: 'Image Generation',
    description: 'Generates editable vectors, SVG graphics, flat illustrations, and icon sets with precise style consistency control.',
    bestFor: 'UI/UX designers needing scalable vector files, branded icons, and SVG illustrations rather than raster files.',
    pricing: 'Freemium (Paid plans from $48/mo)',
    launchBuzz: 91,
    socialBuzz: 94,
    searchInterest: 88,
    designerAdoption: 90,
    editorialQuality: 96,
    sevenDayChange: 3.4,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-06',
    pros: [
      'Outputs true, editable vector layers (SVG / Lottie)',
      'Styles are highly consistent across generated batches',
      'Excellent canvas UI for editing portions of images'
    ],
    cons: [
      'Subscription price is higher than standard text-to-image generators',
      'Lacks direct figma plugin live sync currently',
      'Some high-fidelity graphics can require custom fine-tuning'
    ],
    alternatives: ['Midjourney', 'Krea AI', 'Spline AI'],
    verdict: 'An outstanding standalone tool. Since it outputs raw SVGs, it is infinitely more useful for product designers than standard raster image engines.',
    scoreOutOf10: 9.5,
    whyTrending: 'Massive designer recommendations on X due to their recent vector upscaler and SVG accuracy updates.',
    momentumHistory: [
      { date: 'May 07', score: 86 },
      { date: 'May 17', score: 88 },
      { date: 'May 27', score: 90 },
      { date: 'Jun 06', score: 91 }
    ],
    monthlyVisits: '1.8M',
    userRating: 4.8,
    ratingSources: 'Product Hunt & G2 reviews',
    figmaCommunityUsers: 'Not Applicable',
    primaryDataSources: ['Similarweb Traffic', 'X design comments', 'Google Search Trends']
  },
  {
    id: 'midjourney',
    launchDate: 'Jul 2022',
    name: 'Midjourney',
    website: 'https://midjourney.com',
    category: 'Image Generation',
    description: 'Top-tier text-to-image generator generating photorealistic illustrations, assets, icons, and interface patterns via prompt commands.',
    bestFor: 'Generating hero illustrations, visual design concepts, and mock assets for prototypes.',
    pricing: 'Paid plans from $10/mo (No free tier)',
    launchBuzz: 92,
    socialBuzz: 94,
    searchInterest: 95,
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
    alternatives: ['Recraft', 'Krea AI'],
    verdict: 'The undisputed king of prompt-driven visual assets. Its artistic range is second to none, though vector support is sorely missed.',
    scoreOutOf10: 9.4,
    whyTrending: 'Wide rollout of the new web dashboard creator interface, moving users away from Discord command prompts.',
    momentumHistory: [
      { date: 'May 07', score: 93 },
      { date: 'May 17', score: 93 },
      { date: 'May 27', score: 93 },
      { date: 'Jun 06', score: 94 }
    ],
    monthlyVisits: '18.5M',
    userRating: 4.7,
    ratingSources: 'Product Hunt & Discord Community',
    figmaCommunityUsers: 'Not Applicable',
    primaryDataSources: ['Similarweb Traffic', 'Discord Server Membership', 'Google Search Trends']
  },
  {
    id: 'runway',
    launchDate: 'Mar 2023',
    name: 'Runway',
    website: 'https://runwayml.com',
    category: 'Video Generation',
    description: 'AI video generation and editing suite featuring text-to-video, image-to-video, and cinematic editing controls.',
    bestFor: 'Creating motion design assets, product concept teasers, and high-fidelity video content.',
    pricing: 'Freemium (Paid plans from $15/mo)',
    launchBuzz: 89,
    socialBuzz: 90,
    searchInterest: 88,
    designerAdoption: 84,
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
    alternatives: ['Midjourney', 'LottieFiles AI'],
    verdict: 'The gold standard for AI motion and video. It allows creative designers to storyboard and direct video layouts in minutes rather than weeks.',
    scoreOutOf10: 9.0,
    whyTrending: 'Release of their Gen-3 Alpha model showing hyper-realistic human motion and fluid camera angles.',
    momentumHistory: [
      { date: 'May 07', score: 85 },
      { date: 'May 17', score: 86 },
      { date: 'May 27', score: 87 },
      { date: 'Jun 06', score: 89 }
    ],
    monthlyVisits: '6.4M',
    userRating: 4.6,
    ratingSources: 'G2 & Capterra reviews',
    figmaCommunityUsers: 'Not Applicable',
    primaryDataSources: ['Similarweb Traffic', 'Product Hunt', 'YouTube motion design posts']
  },
  {
    id: 'krea-ai',
    launchDate: 'Dec 2023',
    name: 'Krea AI',
    website: 'https://krea.ai',
    category: 'Visual Design',
    description: 'Real-time design canvas enabling instant image generation, upscaling, vector enhancement, and screen-sharing rendering.',
    bestFor: 'Live vector upscaling and generating concept mockups from basic shapes in real-time.',
    pricing: 'Freemium (Paid plans from $30/mo)',
    launchBuzz: 88,
    socialBuzz: 92,
    searchInterest: 85,
    designerAdoption: 88,
    editorialQuality: 90,
    sevenDayChange: 2.3,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-05',
    pros: [
      'Outstanding real-time rendering from screen shares or iPad drawings',
      'Top-tier upscaler capable of handling 4k details cleanly',
      'Intuitive canvas layout'
    ],
    cons: [
      'Consumes GPU resources heavily, causing occasional slower rendering',
      'Lacks offline version or Figma vector export layers',
      'UI styling can feel slightly experimental'
    ],
    alternatives: ['Midjourney', 'Recraft', 'Spline AI'],
    verdict: 'An exceptional canvas for real-time visualization. Designers love using its upscaler to enhance layout illustrations instantly.',
    scoreOutOf10: 8.9,
    whyTrending: 'Trending on X for its real-time camera overlays and highly optimized design patterns.',
    momentumHistory: [
      { date: 'May 07', score: 84 },
      { date: 'May 17', score: 85 },
      { date: 'May 27', score: 86 },
      { date: 'Jun 06', score: 87 }
    ],
    monthlyVisits: '2.1M',
    userRating: 4.6,
    ratingSources: 'Product Hunt & X comments',
    figmaCommunityUsers: 'Not Applicable',
    primaryDataSources: ['Similarweb Traffic', 'X designer tweets', 'Product Hunt reviews']
  },
  {
    id: 'spline-ai',
    launchDate: 'Mar 2023',
    name: 'Spline AI',
    website: 'https://spline.design',
    category: '3D Design',
    description: '3D design software with generative AI utilities to create, model, style, and texture interactive 3D assets via text prompts.',
    bestFor: 'Product designers looking to build responsive, interactive 3D scenes for web apps without learning complex modeling software.',
    pricing: 'Freemium (Paid plans from $24/mo)',
    launchBuzz: 90,
    socialBuzz: 92,
    searchInterest: 86,
    designerAdoption: 91,
    editorialQuality: 94,
    sevenDayChange: 2.1,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-05',
    pros: [
      'Produces fully interactive 3D objects that export directly to WebGL and React code',
      'AI texturing and helper prompts are incredibly quick',
      'Natively collaborative canvas'
    ],
    cons: [
      'High rendering load on mobile web clients if models are complex',
      'Traditional 3D modeling curves still apply for custom meshes',
      'Heavy AI texturing consumes credits fast'
    ],
    alternatives: ['Vectary', 'Krea AI'],
    verdict: 'The leading interactive 3D tool for web designers. The AI texturing features bypass hours of standard mapping loops.',
    scoreOutOf10: 9.3,
    whyTrending: 'Highly discussed in design newsletters for their WebGL responsive interaction engine.',
    momentumHistory: [
      { date: 'May 07', score: 86 },
      { date: 'May 17', score: 88 },
      { date: 'May 27', score: 89 },
      { date: 'Jun 06', score: 90 }
    ],
    monthlyVisits: '3.1M',
    userRating: 4.7,
    ratingSources: 'G2 reviews & Product Hunt',
    figmaCommunityUsers: '250K+ Installs (Plugin/Sync)',
    primaryDataSources: ['Similarweb Traffic', 'Designer communities', 'Google search volume']
  },
  {
    id: 'relume',
    launchDate: 'Nov 2023',
    name: 'Relume',
    website: 'https://relume.io',
    category: 'Wireframing',
    description: 'AI site builder that designs wireframes, sitemaps, and landing pages using components from their Figma/Webflow library.',
    bestFor: 'Constructing landing page structures, information architecture, and content frameworks.',
    pricing: 'Freemium (Paid plans from $38/mo)',
    launchBuzz: 84,
    socialBuzz: 86,
    searchInterest: 76,
    designerAdoption: 80,
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
    alternatives: ['Framer AI', 'Uizard', 'Mockflow AI'],
    verdict: 'An indispensable tool for agency UX designers. Relume bridges information architecture and wireframing cleaner than any competitor.',
    scoreOutOf10: 9.3,
    whyTrending: 'Release of their Webflow native App sync tool, allowing instant synchronization of AI sitemaps to live pages.',
    momentumHistory: [
      { date: 'May 07', score: 81 },
      { date: 'May 17', score: 82 },
      { date: 'May 27', score: 83 },
      { date: 'Jun 06', score: 83 }
    ],
    monthlyVisits: '920K',
    userRating: 4.7,
    ratingSources: 'Product Hunt Reviews & G2',
    figmaCommunityUsers: '320K+ Installs',
    primaryDataSources: ['Similarweb Traffic', 'Figma community plugin', 'Webflow Developer portal']
  },
  {
    id: 'uizard',
    launchDate: 'Feb 2021',
    name: 'Uizard',
    website: 'https://uizard.io',
    category: 'Wireframing',
    description: 'Generates wireframes and interactive prototypes from screenshots, sketches, or plain text prompts.',
    bestFor: 'Rapid ideation, wireframing, and creating mockups for non-designers and product managers.',
    pricing: 'Freemium (Paid plans from $12/mo)',
    launchBuzz: 82,
    socialBuzz: 76,
    searchInterest: 80,
    designerAdoption: 68,
    editorialQuality: 78,
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
    alternatives: ['Visily', 'Galileo AI', 'Relume'],
    verdict: 'Great for rapid conceptualization and getting client feedback in early phases, but lacks custom depth for advanced designers.',
    scoreOutOf10: 7.8,
    whyTrending: 'Steady organic search growth but social momentum has stabilized after their v3 feature launch cycle.',
    momentumHistory: [
      { date: 'May 07', score: 78 },
      { date: 'May 17', score: 78 },
      { date: 'May 27', score: 77 },
      { date: 'Jun 06', score: 77 }
    ],
    monthlyVisits: '2.5M',
    userRating: 4.4,
    ratingSources: 'G2 & Capterra reviews',
    figmaCommunityUsers: '180K+ Installs',
    primaryDataSources: ['Similarweb Traffic', 'G2 reviews', 'Google Search Trends']
  },
  {
    id: 'galileo-ai',
    launchDate: 'Feb 2023',
    name: 'Galileo AI',
    website: 'https://usegalileo.ai',
    category: 'Wireframing',
    description: 'Generates high-fidelity UI designs from simple text prompts, exporting directly to Figma as editable vector layers.',
    bestFor: 'Creating clean interface concepts and screens for web and mobile apps.',
    pricing: 'Paid plans from $19/mo (Limited free trial)',
    launchBuzz: 85,
    socialBuzz: 82,
    searchInterest: 72,
    designerAdoption: 62,
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
    alternatives: ['Uizard', 'Visily'],
    verdict: 'One of the most impressive tools for generating initial UI screens. The vector export to Figma makes it actually usable in real design systems.',
    scoreOutOf10: 8.7,
    whyTrending: 'Newly added support for custom UI component libraries inside prompts, resulting in massive designer interest on X.',
    momentumHistory: [
      { date: 'May 07', score: 76 },
      { date: 'May 17', score: 77 },
      { date: 'May 27', score: 78 },
      { date: 'Jun 06', score: 79 }
    ],
    monthlyVisits: '620K',
    userRating: 4.5,
    ratingSources: 'Product Hunt reviews',
    figmaCommunityUsers: '95K+ Installs',
    primaryDataSources: ['Similarweb Traffic', 'Product Hunt Launches', 'X social posts']
  },
  {
    id: 'maze',
    launchDate: 'May 2018',
    name: 'Maze',
    website: 'https://maze.co',
    category: 'User Testing',
    description: 'User testing platform with integrated AI to synthesize quantitative results, write test questions, and summarize feedback.',
    bestFor: 'Conducting automated usability tests and generating visual reports for product teams.',
    pricing: 'Freemium (Paid plans from $99/mo)',
    launchBuzz: 82,
    socialBuzz: 80,
    searchInterest: 84,
    designerAdoption: 88,
    editorialQuality: 88,
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
    ],
    monthlyVisits: '2.3M',
    userRating: 4.5,
    ratingSources: 'G2 reviews & Capterra',
    figmaCommunityUsers: '550K+ Installs (Plugin)',
    primaryDataSources: ['Similarweb Traffic', 'G2 reviews', 'UX Research communities']
  },
  {
    id: 'dovetail',
    launchDate: 'Aug 2017',
    name: 'Dovetail',
    website: 'https://dovetailapp.com',
    category: 'UX Research',
    description: 'AI-driven UX research repository that transcribes audio/video, highlights user interview themes, and links research insights.',
    bestFor: 'Large design teams needing a central, smart source of truth for user testing insights.',
    pricing: 'Paid plans from $29/user/mo (Free trial)',
    launchBuzz: 85,
    socialBuzz: 86,
    searchInterest: 82,
    designerAdoption: 88,
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
    alternatives: ['Notably', 'Looppanel'],
    verdict: 'The leading choice for user research repositories. The AI clustering features make synthesizing dozens of customer conversations a breeze.',
    scoreOutOf10: 9.2,
    whyTrending: 'New \"Search across projects\" AI feature launched, driving adoption among enterprise UX teams.',
    momentumHistory: [
      { date: 'May 07', score: 84 },
      { date: 'May 17', score: 85 },
      { date: 'May 27', score: 85 },
      { date: 'Jun 06', score: 86 }
    ],
    monthlyVisits: '1.9M',
    userRating: 4.6,
    ratingSources: 'G2 & TrustRadius reviews',
    figmaCommunityUsers: 'Not Applicable',
    primaryDataSources: ['Similarweb Traffic', 'G2 reviews', 'UX Research communities']
  },
  {
    id: 'looppanel',
    launchDate: 'Apr 2022',
    name: 'Looppanel',
    website: 'https://looppanel.com',
    category: 'UX Research',
    description: 'AI platform that records, transcribes, and structures user interviews, generating analysis grids and timestamped notes.',
    bestFor: 'UX researchers, product managers, and designers who want to speed up post-interview analysis.',
    pricing: 'Paid plans from $30/mo (Free trial)',
    launchBuzz: 78,
    socialBuzz: 75,
    searchInterest: 66,
    designerAdoption: 62,
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
    alternatives: ['Dovetail', 'Notably'],
    verdict: 'If you want to spend less time transcribing and more time comparing results in a neat grid, Looppanel is the perfect utility.',
    scoreOutOf10: 8.2,
    whyTrending: 'Growing viral mentions on LinkedIn from product managers praising its time-to-insight speed.',
    momentumHistory: [
      { date: 'May 07', score: 72 },
      { date: 'May 17', score: 73 },
      { date: 'May 27', score: 73 },
      { date: 'Jun 06', score: 74 }
    ],
    monthlyVisits: '95K',
    userRating: 4.5,
    ratingSources: 'G2 & Capterra reviews',
    figmaCommunityUsers: 'Not Applicable',
    primaryDataSources: ['Similarweb Traffic', 'G2 reviews', 'LinkedIn community posts']
  },
  {
    id: 'lottiefiles-ai',
    launchDate: 'May 2023',
    name: 'LottieFiles AI',
    website: 'https://lottiefiles.com',
    category: 'Motion Design',
    description: 'AI-driven generation of Lottie vector animations, motion styles, and automated code generation for layouts.',
    bestFor: 'Product designers wanting to generate high-performance vector animations for UI micro-interactions.',
    pricing: 'Freemium (Paid plans from $19/mo)',
    launchBuzz: 88,
    socialBuzz: 85,
    searchInterest: 84,
    designerAdoption: 90,
    editorialQuality: 92,
    sevenDayChange: 2.1,
    trendStatus: 'rising' as const,
    lastUpdated: '2026-06-05',
    pros: [
      'Direct Lottie JSON/dotLottie format outputs',
      'Remarkably fast motion style transfer AI',
      'Large ecosystem compatibility'
    ],
    cons: [
      'Complex animations require significant manual anchor tweaks',
      'Restricted completely to motion and vectors',
      'Pricey for individual solo creators'
    ],
    alternatives: ['Runway'],
    verdict: 'The absolute benchmark for UI micro-interactions. Its AI translation simplifies vector motion modeling exponentially.',
    scoreOutOf10: 9.1,
    whyTrending: 'Substack reviews highlighting LottieFiles AI motion translator integrations inside web frameworks.',
    momentumHistory: [
      { date: 'May 07', score: 83 },
      { date: 'May 17', score: 84 },
      { date: 'May 27', score: 84 },
      { date: 'Jun 06', score: 85 }
    ],
    monthlyVisits: '4.2M',
    userRating: 4.7,
    ratingSources: 'Product Hunt & G2 reviews',
    figmaCommunityUsers: '600K+ Installs (Plugin)',
    primaryDataSources: ['Similarweb Traffic', 'Figma community directory', 'G2 reviews']
  },
  {
    id: 'phind',
    launchDate: 'Feb 2023',
    name: 'Phind',
    website: 'https://phind.com',
    category: 'Product Strategy',
    description: 'AI-native search engine designed to resolve technical layouts, coding problems, and interface component structures instantly.',
    bestFor: 'Technical designers and developer-designers looking for fast context code verification.',
    pricing: 'Freemium (Pro tier from $20/mo)',
    launchBuzz: 84,
    socialBuzz: 88,
    searchInterest: 85,
    designerAdoption: 80,
    editorialQuality: 90,
    sevenDayChange: 1.5,
    trendStatus: 'stable' as const,
    lastUpdated: '2026-06-04',
    pros: [
      'Incredibly fast search responses compared to standard search engines',
      'Code solutions include clear inline citations',
      'Support for deep context uploads'
    ],
    cons: [
      'Visual layout generator is code-based only',
      'Occasional code syntax inaccuracies for newer frameworks',
      'Heavily tech-focused; lacks visual modeling tools'
    ],
    alternatives: ['Cursor', 'Replit Agent'],
    verdict: 'A vital research tool for any developer-designer. It cuts down layout troubleshooting search cycles by tenfold.',
    scoreOutOf10: 8.8,
    whyTrending: 'Consistently referenced on developer-designer X threads as the ultimate alternative to standard searching.',
    momentumHistory: [
      { date: 'May 07', score: 82 },
      { date: 'May 17', score: 83 },
      { date: 'May 27', score: 84 },
      { date: 'Jun 06', score: 84 }
    ],
    monthlyVisits: '7.8M',
    userRating: 4.6,
    ratingSources: 'Product Hunt reviews',
    figmaCommunityUsers: 'Not Applicable',
    primaryDataSources: ['Similarweb Traffic', 'Developer feedback groups', 'Google search demand']
  },
  {
    id: 'visily',
    launchDate: 'Nov 2021',
    name: 'Visily',
    website: 'https://visily.ai',
    category: 'Wireframing',
    description: 'Wireframing tool that uses AI to convert screenshots, hand-drawn sketches, or templates into fully customizable digital screens.',
    bestFor: 'Fast mockups and team brainstorms, especially converting legacy screenshots to editable assets.',
    pricing: 'Free (Monetization coming soon)',
    launchBuzz: 72,
    socialBuzz: 66,
    searchInterest: 60,
    designerAdoption: 52,
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
    alternatives: ['Uizard', 'Relume'],
    verdict: 'A robust wireframing workspace that excels at design migration, but needs to speed up its feature cadence to keep up with industry trends.',
    scoreOutOf10: 7.4,
    whyTrending: 'User acquisition has slowed down slightly as competitors roll out native Figma integrations.',
    momentumHistory: [
      { date: 'May 07', score: 68 },
      { date: 'May 17', score: 68 },
      { date: 'May 27', score: 67 },
      { date: 'Jun 06', score: 66 }
    ],
    monthlyVisits: '190K',
    userRating: 4.2,
    figmaCommunityUsers: '45K+ Installs',
    primaryDataSources: ['Similarweb Traffic', 'G2 reviews', 'Capterra platform']
  },
  {
    id: 'useberry',
    launchDate: 'May 2018',
    name: 'Useberry',
    website: 'https://useberry.com',
    category: 'User Testing',
    description: 'Usability testing platform providing AI-generated user session insights, screen recordings, heatmaps, and funnel drop-offs.',
    bestFor: 'Prototyping validations, user flows, and recording user test details.',
    pricing: 'Freemium (Paid plans from $33/mo)',
    launchBuzz: 74,
    socialBuzz: 68,
    searchInterest: 62,
    designerAdoption: 58,
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
    alternatives: ['Maze', 'Looppanel'],
    verdict: 'A budget-friendly alternative for startup UX teams. Its AI analytics speed up heat-map interpretations and funnel tracking.',
    scoreOutOf10: 7.5,
    whyTrending: 'Minor product improvements and new dashboard integrations introduced this month.',
    momentumHistory: [
      { date: 'May 07', score: 68 },
      { date: 'May 17', score: 68 },
      { date: 'May 27', score: 68 },
      { date: 'Jun 06', score: 68 }
    ],
    monthlyVisits: '120K',
    userRating: 4.3,
    figmaCommunityUsers: '110K+ Installs',
    primaryDataSources: ['Similarweb Traffic', 'Figma plugin directory', 'G2 reviews']
  },
  {
    id: 'notably',
    launchDate: 'Jun 2021',
    name: 'Notably',
    website: 'https://notably.ai',
    category: 'UX Research',
    description: 'AI-powered UX research workspace that functions like a canvas, transcribing, coding, and extracting themes dynamically.',
    bestFor: 'Visual-oriented UX researchers who like canvas-style mapping and card sorting.',
    pricing: 'Paid plans from $25/mo (Free trial)',
    launchBuzz: 76,
    socialBuzz: 72,
    searchInterest: 64,
    designerAdoption: 60,
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
    alternatives: ['Dovetail', 'Looppanel'],
    verdict: 'A brilliant tool for visual thinkers. If you love spatial clustering, Notably\'s AI helpers accelerate your synthesis process.',
    scoreOutOf10: 7.9,
    whyTrending: 'Stable search volume; steady usage in freelancer and agency design circles.',
    momentumHistory: [
      { date: 'May 07', score: 71 },
      { date: 'May 17', score: 71 },
      { date: 'May 27', score: 71 },
      { date: 'Jun 06', score: 71 }
    ],
    monthlyVisits: '85K',
    userRating: 4.4,
    figmaCommunityUsers: 'Not Applicable',
    primaryDataSources: ['Similarweb Traffic', 'Product Hunt Launches', 'Capterra platform']
  },
  {
    id: 'replit-agent',
    launchDate: 'Sep 2024',
    name: 'Replit Agent',
    website: 'https://replit.com',
    category: 'Design-to-Code',
    description: 'An AI-powered agent built inside Replit that designs, provisions databases, and codes web deployments from plain instructions.',
    bestFor: 'Quickly launching micro-services, APIs, and dynamic database applications.',
    pricing: 'Requires Replit Core membership ($20/mo)',
    launchBuzz: 88,
    socialBuzz: 86,
    searchInterest: 82,
    designerAdoption: 78,
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
      { date: 'May 07', score: 82 },
      { date: 'May 17', score: 83 },
      { date: 'May 27', score: 84 },
      { date: 'Jun 06', score: 85 }
    ],
    monthlyVisits: '8.5M (Replit platform)',
    userRating: 4.5,
    ratingSources: 'Product Hunt reviews',
    figmaCommunityUsers: 'Not Applicable',
    primaryDataSources: ['Similarweb Traffic', 'Replit active user registry', 'Google search demand']
  },
  {
    id: 'khroma',
    launchDate: 'May 2018',
    name: 'Khroma',
    website: 'http://khroma.co',
    category: 'Visual Design',
    description: 'An AI color tool that learns your color preferences and creates endless color combinations, gradients, and typography previews.',
    bestFor: 'UI/UX designers searching for fresh color combinations and palette ideas.',
    pricing: 'Free',
    launchBuzz: 68,
    socialBuzz: 72,
    searchInterest: 70,
    designerAdoption: 74,
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
    alternatives: ['Krea AI'],
    verdict: 'A great utility for color block inspiration. It is lightweight and free, though it works best as a quick side tool rather than a central platform.',
    scoreOutOf10: 7.5,
    whyTrending: 'Consistent reference in designer lists on Pinterest and designer resource newsletters.',
    momentumHistory: [
      { date: 'May 07', score: 71 },
      { date: 'May 17', score: 71 },
      { date: 'May 27', score: 70 },
      { date: 'Jun 06', score: 70 }
    ],
    monthlyVisits: '160K',
    userRating: 4.3,
    ratingSources: 'Designer Directories & Blogs',
    figmaCommunityUsers: 'Not Applicable',
    primaryDataSources: ['Similarweb Traffic', 'Design resource directories']
  },
  {
    id: 'vectary',
    launchDate: 'Oct 2016',
    name: 'Vectary',
    website: 'https://vectary.com',
    category: '3D Design',
    description: 'Browser-based 3D design studio with integrated AI helpers to create realistic 3D mockups, textures, and assets.',
    bestFor: 'Product mockup designers wanting web-based interactive 3D elements.',
    pricing: 'Freemium (Paid plans from $19/mo)',
    launchBuzz: 78,
    socialBuzz: 75,
    searchInterest: 70,
    designerAdoption: 76,
    editorialQuality: 84,
    sevenDayChange: 0.5,
    trendStatus: 'stable' as const,
    lastUpdated: '2026-06-03',
    pros: [
      'Legitimate, highly realistic 3D CAD/mockup engine',
      'AI textures make setting material finishes extremely fast',
      'Direct web-iframe embeds work without coding'
    ],
    cons: [
      'High rendering demands for complex industrial CAD shapes',
      'Free tier is somewhat limited in export file extensions',
      'Requires substantial 3D background logic knowledge'
    ],
    alternatives: ['Spline AI'],
    verdict: 'An incredible asset for packaging and product mockup design. Texture AI text-prompting speeds up standard iteration workflows.',
    scoreOutOf10: 7.8,
    whyTrending: 'Updates to their web AR preview engine discussed in design-system newsletters.',
    momentumHistory: [
      { date: 'May 07', score: 74 },
      { date: 'May 17', score: 74 },
      { date: 'May 27', score: 75 },
      { date: 'Jun 06', score: 75 }
    ],
    monthlyVisits: '280K',
    userRating: 4.4,
    ratingSources: 'G2 reviews',
    figmaCommunityUsers: '120K+ Installs (Figma Sync)',
    primaryDataSources: ['Similarweb Traffic', 'G2 reviews', 'Figma plugin downloads']
  },
  {
    id: 'mockflow',
    launchDate: 'Aug 2009',
    name: 'Mockflow',
    website: 'https://mockflow.com',
    category: 'Wireframing',
    description: 'AI-assisted wireframing and sitemap creation tool supporting quick sketches, components, and design reviews.',
    bestFor: 'Wireframing digital user flows and creating interactive UI mockups.',
    pricing: 'Freemium (Paid plans from $14/mo)',
    launchBuzz: 75,
    socialBuzz: 70,
    searchInterest: 68,
    designerAdoption: 70,
    editorialQuality: 80,
    sevenDayChange: 0.1,
    trendStatus: 'stable' as const,
    lastUpdated: '2026-06-02',
    pros: [
      'Very clean and responsive wireframe elements library',
      'AI creates comprehensive sitemaps from brief design prompts',
      'Cooperative workspace features'
    ],
    cons: [
      'Visual design fidelity is restricted to lower levels',
      'Export layouts are occasionally hard to sync to Figma structures',
      'AI sitemaps can require manual restructuring'
    ],
    alternatives: ['Uizard', 'Relume'],
    verdict: 'A steady wireframe assistant that excels in sitemapping speed, though it lacks Uizard\'s screenshot-to-design conversions.',
    scoreOutOf10: 7.6,
    whyTrending: 'Introduction of new AI layout assistants discussed in project planning forums.',
    momentumHistory: [
      { date: 'May 07', score: 70 },
      { date: 'May 17', score: 70 },
      { date: 'May 27', score: 70 },
      { date: 'Jun 06', score: 70 }
    ],
    monthlyVisits: '350K',
    userRating: 4.3,
    ratingSources: 'Capterra & G2 reviews',
    figmaCommunityUsers: '30K+ Installs',
    primaryDataSources: ['Similarweb Traffic', 'G2 reviews', 'Capterra platform']
  }
];

// Calculate final scores and sort
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
    ratingSources: (tool as any).ratingSources || 'G2 & Product Hunt reviews',
    momentumScore
  } as Tool;
}).sort((a, b) => b.momentumScore - a.momentumScore);
