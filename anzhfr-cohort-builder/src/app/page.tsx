"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import { transformRow } from "@/lib/dataprocessor"; 
import { Patient } from "@/types/patients"; 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, FileText, Download } from "lucide-react"
import { Sidebar } from "@/components/Sidebar"

export default function Home() {
  const [data, setData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse("/data.csv", { 
      download: true,     
      header: true,       
      skipEmptyLines: true, 
      complete: (results) => {
        console.log("原始数据条数:", results.data.length);
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cleanData = results.data.map((row: any, index: number) => {
          return transformRow(row, index); 
        });
        console.log("清洗后第一条数据:", cleanData[0]);
        
        setData(cleanData);
        setLoading(false);
      },
      error: (error) => {
        console.error("数据加载失败:", error);
        setLoading(false);
      }
    });
  }, []);

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
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* 2. New Sidebar Component */}
        <Sidebar className="w-80 flex-shrink-0" />

        {/* 3. Main Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {loading ? (
             <div className="text-center mt-20 text-lg text-zinc-500">
               Reading data, please wait...
             </div>
          ) : (
             <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold">Data Loaded Successfully!</h1>
                  <p>Loaded {data.length} patients.</p>
                </div>
            
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                      <Users className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{data.length}</div>
                      <p className="text-xs text-zinc-500">Matches current criteria</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg. Length of Stay</CardTitle>
                      <Activity className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8.5 Days</div>
                      <p className="text-xs text-zinc-500">-1.2% from benchmark</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts Placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                </div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
