# 1210Datathon
cd anzhfr-cohort-builder
pnpm create next-app@latest . --use-pnpm --typescript --eslint --tailwind --src-dir --app --turbopack --import-alias "@/*"
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card slider select checkbox label table switch input dialog separator badge
pnpm add recharts papaparse @google/generative-ai zustand clsx tailwind-merge lucide-react
