Here is a polished, natural English version of your content — suitable for GitHub, documentation, or submission:

⸻

🏥 ANZHFR Cohort Builder (Task 2)

Datathon 2025 | Task 2: ANZHFR Cohort Builder

This is an interactive cohort-building tool built with Next.js 15, designed specifically for Datathon Task 2. It allows clinicians to filter, visualize, and compare hip-fracture patient cohorts.

⸻

🛠️ Tech Stack

No setup worries — everything is pre-configured inside package.json:
	•	Core: Next.js 15￼ (App Router) + TypeScript
	•	Styling: Tailwind CSS￼ + Shadcn UI￼ (Zinc Theme)
	•	Charts: Recharts￼ for pie charts and histograms
	•	Data: PapaParse￼ for CSV parsing + Zustand￼ for state management
	•	AI: Google Gemini SDK for natural-language filtering assistance

⸻

🚀 Quick Start

Please follow these steps carefully.

1. Prepare your environment

Make sure your computer has Node.js 18+ installed.
We use pnpm as the package manager (faster and more space-efficient than npm):

# If you don’t have pnpm installed:
npm install -g pnpm


⸻

2. Clone the repo & install dependencies

Do not run create-next-app again.
Simply pull the project and install everything to fully restore the environment.

# 1. Clone the repository
git clone [replace-with-your-GitHub-repo.git]

# 2. Enter the project directory
cd anzhfr-cohort-builder

# 3. Install all dependencies (Next.js, Tailwind, Shadcn, Recharts, etc.)
pnpm install


⸻

3. Add the dataset (important ⚠️)

The official Datathon CSV cannot be uploaded to GitHub due to privacy and size restrictions.
	1.	Obtain the official CSV dataset.
	2.	Rename it to data.csv.
	3.	Place it inside the public/ folder.

The project is already configured to load data from /data.csv.

⸻

4. Start the project

pnpm run dev

Open http://localhost:3000 in your browser to access the dashboard.

⸻
