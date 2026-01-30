# 图表库使用情况 / Charting Libraries Usage

## 问题 / Question
这个仓库里的代码用了以下图表库吗？
Does the code in this repository use the following charting libraries?

- Recharts
- Chart.js
- D3.js
- ECharts

## 答案 / Answer

### ✅ 已使用 / Currently Used

**Recharts (v3.5.1)**
- ✅ 是的，本项目使用 Recharts 作为主要图表库
- ✅ Yes, this project uses Recharts as the primary charting library

#### 使用位置 / Usage Locations

在 `anzhfr-cohort-builder/src/components/charts/` 目录中的以下组件：
Used in the following components in the `anzhfr-cohort-builder/src/components/charts/` directory:

1. **AgeDistributionChart.tsx** - 年龄分布柱状图 / Age distribution bar chart
2. **GenderPieChart.tsx** - 性别分布饼图 / Gender distribution pie chart
3. **LengthOfStayChart.tsx** - 住院时长柱状图 / Length of stay bar chart
4. **PatientTypeChart.tsx** - 患者类型饼图 / Patient type pie chart
5. **SurgeryDelayChart.tsx** - 手术延迟饼图 / Surgery delay pie chart
6. **WeightBearingChart.tsx** - 负重状态饼图 / Weight bearing status pie chart

#### 依赖配置 / Dependency Configuration

```json
{
  "dependencies": {
    "recharts": "^3.5.1"
  }
}
```

### ❌ 未使用 / Not Used

以下图表库未在本项目中使用：
The following charting libraries are NOT used in this project:

- ❌ **Chart.js** - 未在依赖或代码中找到 / Not found in dependencies or code
- ❌ **D3.js** - 未在依赖或代码中找到 / Not found in dependencies or code
- ❌ **ECharts** - 未在依赖或代码中找到 / Not found in dependencies or code

## 为什么选择 Recharts？ / Why Recharts?

Recharts 是一个基于 React 组件构建的图表库，非常适合本项目：
Recharts is a charting library built with React components, which makes it ideal for this project:

- ✅ 与 React/Next.js 无缝集成 / Seamless integration with React/Next.js
- ✅ 声明式 API，易于使用 / Declarative API, easy to use
- ✅ 响应式设计支持 / Responsive design support
- ✅ 丰富的图表类型（饼图、柱状图等）/ Rich chart types (pie charts, bar charts, etc.)
- ✅ TypeScript 支持良好 / Good TypeScript support

## 技术栈总览 / Tech Stack Overview

完整的技术栈信息请参见主 README.md 文件。
For complete tech stack information, please refer to the main README.md file.

**核心技术 / Core Technologies:**
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS + Shadcn UI
- **Recharts** for data visualization
- PapaParse for CSV parsing
- Zustand for state management
- Google Gemini SDK for AI assistance
