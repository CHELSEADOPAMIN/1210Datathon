"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, LabelList, YAxis, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Patient } from "@/types/patients"

interface AgeDistributionChartProps {
  data: Patient[]
  comparisonData?: Patient[]
  comparisonLabel?: string | null
}

export function AgeDistributionChart({ data, comparisonData, comparisonLabel }: AgeDistributionChartProps) {
  const chartData = useMemo(() => {
    // Define bins
    const bins = [
        { label: "<60", min: 0, max: 59 },
        { label: "60-64", min: 60, max: 64 },
        { label: "65-69", min: 65, max: 69 },
        { label: "70-74", min: 70, max: 74 },
        { label: "75-79", min: 75, max: 79 },
        { label: "80-84", min: 80, max: 84 },
        { label: "85-89", min: 85, max: 89 },
        { label: "90-94", min: 90, max: 94 },
        { label: "95+", min: 95, max: 999 },
    ]

    // Initialize data structure for Recharts
    // [{ label: "60-64", current: 10, comparison: 5 }, ...]
    const result = bins.map(bin => ({
        label: bin.label,
        current: 0,
        comparison: 0,
        min: bin.min,
        max: bin.max
    }))

    // Fill Current
    data.forEach((p) => {
        if (p.age === -1) return 
        for (const bin of result) {
            if (p.age >= bin.min && p.age <= bin.max) {
                bin.current++
                break
            }
        }
    })

    // Fill Comparison
    if (comparisonData) {
        comparisonData.forEach((p) => {
            if (p.age === -1) return 
            for (const bin of result) {
                if (p.age >= bin.min && p.age <= bin.max) {
                    bin.comparison++
                    break
                }
            }
        })
    }

    return result
  }, [data, comparisonData])

  const hasComparison = comparisonData && comparisonData.length > 0

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Age Distribution</CardTitle>
        <CardDescription>
          Count of patients by age group
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
         <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                    dataKey="label" 
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                />
                <Tooltip
                  cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid gap-2">
                            <div className="font-bold text-muted-foreground">{label}</div>
                            {payload.map((entry: any, index: number) => (
                                <div key={index} className="flex justify-between gap-4 text-sm">
                                    <span style={{color: entry.color}}>
                                        {entry.name === 'current' ? 'Current' : (comparisonLabel || 'Comparison')}:
                                    </span>
                                    <span className="font-bold">{entry.value}</span>
                                </div>
                            ))}
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                {/* Current Data Bar */}
                <Bar 
                    dataKey="current" 
                    name="Current" 
                    fill="var(--chart-4)" 
                    radius={[4, 4, 0, 0]} 
                    maxBarSize={50}
                />
                
                {/* Comparison Data Bar */}
                {hasComparison && (
                    <Bar 
                        dataKey="comparison" 
                        name={comparisonLabel || "Comparison"} 
                        fill="#94a3b8" // Slate-400 for comparison (neutral)
                        radius={[4, 4, 0, 0]} 
                        maxBarSize={50}
                    />
                )}
                {hasComparison && <Legend />}
              </BarChart>
            </ResponsiveContainer>
         </div>
      </CardContent>
    </Card>
  )
}
