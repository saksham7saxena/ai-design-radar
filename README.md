# AI Design Tools Radar

AI Design Tools Radar is a high-performance single-page market intelligence dashboard that tracks the real-time adoption and momentum of 25 premier AI tools for designers. Styled with a financial-market terminal aesthetic ("Bloomberg meets Product Hunt"), it provides clean comparative insights without filler stats, search clutter, or redundant forms.

## Key Features

- **Dynamic Animated SVG Logo**: A custom-designed SVG radar logo with concentric tracks and an active spinning sweeper group (`animate-[spin_4s_linear_infinite]`).
- **Market Pulse**: Dynamic top-line KPIs highlighting the fastest-rising tool, hottest category by average momentum, and the current overall market leader.
- **Momentum Leaderboard**: A dense, responsive data grid showcasing rank, tool name, category, launch date, estimated traffic, user ratings, weighted scores, 7-day shifts, and trend statuses.
- **Sortable Columns**: Clickable headers allowing instant sorting by Rank, Name, Category, Launch Date, Traffic volume, User Rating, or Momentum Score.
- **Advanced Filters**: Seamless real-time filtering via category pills, search bar input, Trend Status dropdowns, and Pricing Model selectors, complete with matching counters and a quick "Clear Filters" button.
- **Interactive Tool Details**: Click any tool in the leaderboard to open a modal detailing its website link, pros/cons list, category alternatives, catalyst reasoning, launch date, structured data source badges, and our editorial verdict.
- **Interactive Trend Visualizations**: A custom Recharts line chart mapping the 30-day historical momentum paths of the top 5 market-leading tools.
- **Emerging Tools Grid**: Spotlight on upcoming design tools gaining signal velocity across social channels, newsletters, and communities before they enter the formal radar.
- **WCAG AA Compliance**: High-contrast, accessibility-audited text hierarchy in both light editorial and dark mode.


---

## Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styles**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Getting Started

### Prerequisites

Ensure you have [Node.js v20+](https://nodejs.org/) and `npm` installed.

### Installation

1. Navigate to the project root directory:
   ```bash
   cd ai-design-radar
   ```

2. Install the application dependencies:
   ```bash
   npm install
   ```

3. Launch the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   [http://localhost:3000](http://localhost:3000)

---

## Momentum Scoring Model

The **Radar Momentum Score** (0–100 scale) is calculated using a weighted average of five distinct signals, making the ranking system fair across open-source and proprietary platforms:

$$\text{Momentum Score} = 30\% (\text{Launch Buzz}) + 25\% (\text{Social Buzz}) + 20\% (\text{Search Demand}) + 15\% (\text{Designer Adoption}) + 10\% (\text{Editorial Quality})$$

### Metrics Breakdown

- **Launch Buzz (30%)**: Initial Product Hunt ranking, launch-day velocity, maker participation, and user review counts.
- **Social Buzz (25%)**: Mentions, thread counts, and user sentiment analysis across X (Twitter), Reddit, LinkedIn, and core design boards.
- **Search Interest (20%)**: Rolling 30-day relative search engine interest and branded search term queries.
- **Designer Adoption (15%)**: Signal markers based on plugin install rates, community layout templates, and usage in design systems.
- **Editorial Quality (10%)**: Expert evaluation of usability, performance, and whether the tool solves a genuine UI/UX design problem.

---

## Project Structure

```
ai-design-radar/
├── src/
│   ├── app/
│   │   ├── globals.css      # Core styles & dark-mode dashboard variables
│   │   ├── layout.tsx       # Root layout & SEO title/description tags
│   │   └── page.tsx         # Dashboard layout, modals, charts, & page states
│   └── data/
│       └── toolsData.ts     # Interface declaration, mock data database, & calculations
├── package.json             # Core dependency packages and execution commands
└── README.md                # System user instructions
```

---

## Deployment to Vercel

The application is completely static-render optimized, making it extremely fast to deploy:

1. **Deploy via CLI**:
   Ensure you have the Vercel CLI installed (`npm install -g vercel`), then run:
   ```bash
   vercel
   ```

2. **Deploy via Github**:
   - Push your code to a GitHub repository.
   - Import your repository on the [Vercel Dashboard](https://vercel.com/new).
   - The default build presets for Next.js are preconfigured. Click **Deploy**.
