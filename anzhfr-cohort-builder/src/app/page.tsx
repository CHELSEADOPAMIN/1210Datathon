"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import { transformRow } from "@/lib/dataprocessor"; 
import { Patient } from "@/types/patients"; 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, FileText, Download } from "lucide-react"
import { Sidebar } from "@/components/Sidebar"
import { useFilteredPatients } from "@/hooks/useFilteredPatients" 
import { GenderPieChart } from "@/components/charts/GenderPieChart" 
import { AgeDistributionChart } from "@/components/charts/AgeDistributionChart"
import { PatientTypeChart } from "@/components/charts/PatientTypeChart"
import { SurgeryDelayChart } from "@/components/charts/SurgeryDelayChart" 
import { LengthOfStayChart } from "@/components/charts/LengthOfStayChart"
import { WeightBearingChart } from "@/components/charts/WeightBearingChart"
import { CohortManager } from "@/components/CohortManager" 
import { exportToCSV } from "@/lib/exportUtils" // Import export util

export default function Home() {
  const [data, setData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  // Hook returns object with primary and secondary data
  const { primaryData, secondaryData, isComparing, secondaryLabel } = useFilteredPatients(data);

  useEffect(() => {
    Papa.parse("/data.csv", { 
      download: true,     
      header: true,       
      skipEmptyLines: true, 
      complete: (results) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cleanData = results.data.map((row: any, index: number) => {
          return transformRow(row, index); 
        });
        setData(cleanData);
        setLoading(false);
      },
      error: (error) => {
        console.error("Data load failed:", error);
        setLoading(false);
      }
    });
  }, []);

  // Helper to calc AVG LOS
  const calcAvgLOS = (patients: Patient[]) => {
    if (!patients.length) return "0";
    const valid = patients.filter(p => p.lengthOfStay > 0);
    if (!valid.length) return "0";
    return (valid.reduce((acc, curr) => acc + curr.lengthOfStay, 0) / valid.length).toFixed(1);
  };

  const handleExport = () => {
    exportToCSV(primaryData, `cohort-export-${new Date().toISOString().slice(0, 10)}.csv`)
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* 1. Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-zinc-900">ANZHFR Cohort Builder</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Load Data
          </Button>
        </div>
      </header>

      <main className="flex-1 flex">
        {/* 2. Sidebar */}
        <Sidebar className="w-80 flex-shrink-0" />

        {/* 3. Main Content Area */}
        <div className="flex-1 p-8">
          {loading ? (
             <div className="text-center mt-20 text-lg text-zinc-500">
               Reading data, please wait...
             </div>
          ) : (
             <div className="max-w-6xl mx-auto space-y-8">
                {/* Cohort Manager / Header Section */}
                <div className="space-y-4">
                    <div className="flex items-end justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Cohort Overview</h1>
                            <p className="text-muted-foreground">
                                Analyzing <span className="font-semibold text-foreground">{primaryData.length}</span> patients 
                                (from total {data.length})
                            </p>
                        </div>
                    </div>
                    
                    {/* Comparison Controls */}
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <CohortManager />
                    </div>
                </div>
            
                {/* KPI Cards (Enhanced for Comparison) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Selected</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">{primaryData.length}</div>
                        {isComparing && (
                            <div className="text-sm text-muted-foreground border-l pl-2 border-zinc-300">
                                vs {secondaryData.length} <span className="text-xs">({secondaryLabel})</span>
                            </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {((primaryData.length / data.length) * 100).toFixed(1)}% of total population
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg. Length of Stay</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">{calcAvgLOS(primaryData)} Days</div>
                        {isComparing && (
                            <div className="text-sm text-muted-foreground border-l pl-2 border-zinc-300">
                                vs {calcAvgLOS(secondaryData)}
                            </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Average duration</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts Area - Now Fully Supporting Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Row 1: Age (Full Width) */}
                  <div className="md:col-span-2">
                    <AgeDistributionChart 
                        data={primaryData} 
                        comparisonData={isComparing ? secondaryData : undefined}
                        comparisonLabel={secondaryLabel}
                    />
                  </div>

                  {/* Row 2: Pie Charts */}
                  <GenderPieChart 
                        data={primaryData} 
                        comparisonData={isComparing ? secondaryData : undefined}
                        comparisonLabel={secondaryLabel}
                  />
                  <PatientTypeChart 
                        data={primaryData} 
                        comparisonData={isComparing ? secondaryData : undefined}
                        comparisonLabel={secondaryLabel}
                  />

                  {/* Row 3: Surgery Delay & Weight Bearing */}
                  <div className="md:col-span-2">
                    <SurgeryDelayChart 
                        data={primaryData} 
                        comparisonData={isComparing ? secondaryData : undefined}
                        comparisonLabel={secondaryLabel}
                    />
                  </div>
                  <WeightBearingChart 
                        data={primaryData} 
                        comparisonData={isComparing ? secondaryData : undefined}
                        comparisonLabel={secondaryLabel}
                  />

                  {/* Row 4: Length of Stay (Full Width) */}
                   <div className="md:col-span-2">
                    <LengthOfStayChart 
                        data={primaryData} 
                        comparisonData={isComparing ? secondaryData : undefined}
                        comparisonLabel={secondaryLabel}
                    />
                  </div>
                </div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
