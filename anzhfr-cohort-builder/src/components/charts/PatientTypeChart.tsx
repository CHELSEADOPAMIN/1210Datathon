"use client"

import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Patient } from "@/types/patients"

const COLORS = {
  Public: "var(--chart-4)",   // Green/Teal
  Private: "var(--chart-5)",  // Orange/Yellow
  Overseas: "var(--chart-2)", // Purple/Blue
  Unknown: "var(--muted)",
}

interface PatientTypeChartProps {
  data: Patient[]
  comparisonData?: Patient[]
  comparisonLabel?: string | null
}

export function PatientTypeChart({ data, comparisonData, comparisonLabel }: PatientTypeChartProps) {
  const processData = (sourceData: Patient[]) => {
    let publicCount = 0
    let privateCount = 0
    let overseasCount = 0

    sourceData.forEach((p) => {
      if (p.patientType === "1") publicCount++
      else if (p.patientType === "2") privateCount++
      else if (p.patientType === "3") overseasCount++
    })

    return [
      { name: "Public", value: publicCount, fill: COLORS.Public },
      { name: "Private", value: privateCount, fill: COLORS.Private },
      { name: "Overseas", value: overseasCount, fill: COLORS.Overseas },
    ].filter((item) => item.value > 0)
  }

  const chartData = useMemo(() => processData(data), [data])
  const compChartData = useMemo(() => comparisonData ? processData(comparisonData) : [], [comparisonData])

  const hasComparison = comparisonData && comparisonData.length > 0

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Patient Type</CardTitle>
        <CardDescription>
          Public vs Private vs Overseas
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="h-[250px] w-full flex">
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
                            label={({ value }) => value} 
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
                                label={({ value }) => value} 
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
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{background: COLORS.Public}}></div>Public</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{background: COLORS.Private}}></div>Private</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{background: COLORS.Overseas}}></div>Overseas</div>
            </div>
        )}
      </CardContent>
    </Card>
  )
}
