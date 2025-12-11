"use client"

import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Patient } from "@/types/patients"

// Colors
const COLORS = {
  Unrestricted: "#22c55e", // Green
  Restricted: "#f97316",   // Orange
  Unknown: "#94a3b8",      // Gray
}

interface WeightBearingChartProps {
  data: Patient[]
  comparisonData?: Patient[]
  comparisonLabel?: string | null
}

export function WeightBearingChart({ data, comparisonData, comparisonLabel }: WeightBearingChartProps) {
  const processData = (sourceData: Patient[]) => {
    let unrest = 0
    let rest = 0
    let unknown = 0

    sourceData.forEach((p) => {
      if (p.weightBearing === "1") unrest++
      else if (p.weightBearing === "2") rest++
      else unknown++ 
    })

    return [
      { name: "Unrestricted", value: unrest, fill: COLORS.Unrestricted },
      { name: "Restricted", value: rest, fill: COLORS.Restricted },
      { name: "Unknown/Not Started", value: unknown, fill: COLORS.Unknown },
    ].filter((item) => item.value > 0)
  }

  const chartData = useMemo(() => processData(data), [data])
  const compChartData = useMemo(() => comparisonData ? processData(comparisonData) : [], [comparisonData])

  const hasComparison = comparisonData && comparisonData.length > 0

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Weight Bearing</CardTitle>
        <CardDescription>
          Post-op Status
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
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} stroke="var(--background)" />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: number) => [`${value} patients`, 'Count']}
                        />
                        {!hasComparison && <Legend verticalAlign="bottom" height={36} iconType="circle"/>}
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
                                formatter={(value: number) => [`${value} patients`, 'Count']}
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
        {/* Shared Legend if comparing */}
        {hasComparison && (
            <div className="flex justify-center gap-4 text-xs mt-2 pb-2">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{background: COLORS.Unrestricted}}></div>Unrestr.</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{background: COLORS.Restricted}}></div>Restr.</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{background: COLORS.Unknown}}></div>Unknown</div>
            </div>
        )}
      </CardContent>
    </Card>
  )
}
