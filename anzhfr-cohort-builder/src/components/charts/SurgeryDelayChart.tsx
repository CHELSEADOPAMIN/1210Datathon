"use client"

import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Patient } from "@/types/patients"

// Distinct colors for 7 categories
const COLORS = [
  "#22c55e", // 1. No Delay (Green)
  "#ef4444", // 2. Medical Unfit (Red)
  "#f97316", // 3. Anticoagulation (Orange)
  "#eab308", // 4. Theatre (Yellow)
  "#3b82f6", // 5. Surgeon (Blue)
  "#a855f7", // 6. Diagnosis (Purple)
  "#64748b", // 7. Other (Slate)
]

const LABELS: Record<string, string> = {
  "1": "No Delay",
  "2": "Medical Unfit",
  "3": "Anticoagulation",
  "4": "Theatre Unavail.",
  "5": "Surgeon Unavail.",
  "6": "Diagnosis Delayed",
  "7": "Other",
}

interface SurgeryDelayChartProps {
  data: Patient[]
  comparisonData?: Patient[]
  comparisonLabel?: string | null
}

export function SurgeryDelayChart({ data, comparisonData, comparisonLabel }: SurgeryDelayChartProps) {
  const processData = (sourceData: Patient[]) => {
    const counts: Record<string, number> = {
      "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0
    }
    let unknown = 0

    sourceData.forEach((p) => {
      if (counts[p.surgeryDelay] !== undefined) {
        counts[p.surgeryDelay]++
      } else {
        unknown++
      }
    })

    const result = Object.keys(counts).map((key, index) => ({
      name: LABELS[key],
      value: counts[key],
      fill: COLORS[index],
      rawCode: key
    })).filter(item => item.value > 0)

    if (unknown > 0) {
      result.push({
        name: "Unknown",
        value: unknown,
        fill: "#e2e8f0", 
        rawCode: "unknown"
      })
    }
    
    return result
  }

  const chartData = useMemo(() => processData(data), [data])
  const compChartData = useMemo(() => comparisonData ? processData(comparisonData) : [], [comparisonData])

  const hasComparison = comparisonData && comparisonData.length > 0

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Surgery Delay Reason</CardTitle>
        <CardDescription>
          Reasons for delay {'>'} 48h
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="h-[300px] w-full flex">
            {/* Primary Chart */}
            <div className={`h-full ${hasComparison ? 'w-1/2' : 'w-full'} flex flex-col items-center`}>
                {hasComparison && <span className="text-xs font-semibold text-muted-foreground mb-2">Current</span>}
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={hasComparison ? 40 : 60}
                            outerRadius={hasComparison ? 60 : 80}
                            paddingAngle={2}
                            strokeWidth={2}
                            // label={({ value }) => value} 
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} stroke="var(--background)" />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: number, name: string) => [`${value} patients`, name]}
                        />
                        {!hasComparison && <Legend 
                            layout="vertical" 
                            verticalAlign="middle" 
                            align="right"
                            iconType="circle"
                            wrapperStyle={{ fontSize: '12px', lineHeight: '24px' }}
                        />}
                    </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                        No data
                    </div>
                )}
            </div>

            {/* Comparison Chart */}
            {hasComparison && (
                <div className="h-full w-1/2 flex flex-col items-center border-l border-dashed pl-2">
                    <span className="text-xs font-semibold text-muted-foreground mb-2 truncate max-w-[120px]" title={comparisonLabel || "Comparison"}>
                        {comparisonLabel || "Comparison"}
                    </span>
                    {compChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={compChartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={2}
                                strokeWidth={2}
                            >
                                {compChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} stroke="var(--background)" />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                formatter={(value: number, name: string) => [`${value} patients`, name]}
                            />
                        </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                            No data
                        </div>
                    )}
                </div>
            )}
        </div>
        
        {/* Shared Legend if comparing - this one is tricky due to many colors, let's skip for simplicity or show a simplified one? 
            Since colors are consistent, user can infer. Or we can just let tooltip do the job. 
            For Delay chart, legend is vital. Let's try to render a compact legend. */}
      </CardContent>
    </Card>
  )
}
