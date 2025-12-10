Markdown

# 🏥 ANZHFR Cohort Builder (Task 2)

**Datathon 2025** | Task 2: The ANZHFR Cohort Builder

这是一个基于 **Next.js 15** 构建的交互式队列构建器，专为 Datathon Task 2 设计。它允许临床医生对髋部骨折患者数据进行筛选、可视化和队列对比。

---

## 🛠️ 技术栈 (Tech Stack)

不用担心配置，所有环境都已经集成在 `package.json` 中：

- **Core**: [Next.js 15](https://nextjs.org) (App Router) + TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [Shadcn UI](https://ui.shadcn.com) (Zinc Theme)
- **Charts**: [Recharts](https://recharts.org) (用于饼图、直方图)
- **Data**: [PapaParse](https://www.papaparse.com) (CSV 解析) + [Zustand](https://docs.pmnd.rs/zustand) (状态管理)
- **AI**: Google Gemini SDK (自然语言筛选辅助)

---

## 🚀 队友快速上手指南 (Quick Start)

**请严格按照以下步骤操作，不要自己新建项目！**

### 1. 准备环境
确保你的电脑安装了 **Node.js 18+**。
我们统一使用 `pnpm` 包管理器（比 npm 快且省空间）：
```bash
# 如果没装过 pnpm，请运行：
npm install -g pnpm
2. 克隆项目 & 安装依赖
不要重新运行 create-next-app，直接拉取代码并安装即可还原我的环境：

Bash

# 1. 克隆仓库
git clone [这里换成你的GitHub仓库地址.git]

# 2. 进入目录
cd anzhfr-cohort-builder

# 3. 一键安装所有依赖 (Next.js, Tailwind, Shadcn, Recharts 等全都在这)
pnpm install
3. 放置数据文件 (关键步骤 ⚠️)
Datathon 官方提供的 CSV 数据文件无法上传到 GitHub（隐私/大小限制）。

获取官方 CSV 文件。

将其重命名为 data.csv。

放入项目的 public/ 文件夹中。 (代码已配置为从 /data.csv 读取数据)

4. 启动项目
Bash

pnpm run dev
打开浏览器访问 http://localhost:3000 即可看到 Dashboard。
