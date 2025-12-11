"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, LabelList, YAxis, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Patient } from "@/types/patients"

interface LengthOfStayChartProps {
  data: Patient[]
  comparisonData?: Patient[]
  comparisonLabel?: string | null
}

export function LengthOfStayChart({ data, comparisonData, comparisonLabel }: LengthOfStayChartProps) {
  const chartData = useMemo(() => {
    // Define bins
    const bins = [
        { label: "0-7 Days", min: 0, max: 7 },
        { label: "8-14 Days", min: 8, max: 14 },
        { label: "15-21 Days", min: 15, max: 21 },
        { label: "22-28 Days", min: 22, max: 28 },
        { label: "29+ Days", min: 29, max: 9999 },
    ]

    const result = bins.map(bin => ({
        label: bin.label,
        current: 0,
        comparison: 0,
        min: bin.min,
        max: bin.max
    }))

    // Fill Current
    data.forEach((p) => {
        if (p.lengthOfStay === -1) return
        for (const bin of result) {
            if (p.lengthOfStay >= bin.min && p.lengthOfStay <= bin.max) {
                bin.current++
                break
            }
        }
    })

    // Fill Comparison
    if (comparisonData) {
        comparisonData.forEach((p) => {
            if (p.lengthOfStay === -1) return
            for (const bin of result) {
                if (p.lengthOfStay >= bin.min && p.lengthOfStay <= bin.max) {
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
        <CardTitle>Length of Stay</CardTitle>
        <CardDescription>
          Duration of hospital admission
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
                <Bar 
                    dataKey="current" 
                    name="Current" 
                    fill="var(--chart-5)" 
                    radius={[4, 4, 0, 0]} 
                    maxBarSize={50}
                />
                {hasComparison && (
                    <Bar 
                        dataKey="comparison" 
                        name={comparisonLabel || "Comparison"} 
                        fill="#94a3b8" 
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
