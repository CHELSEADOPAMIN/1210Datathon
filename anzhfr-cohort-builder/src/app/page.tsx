import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Users, Activity, FileText, Download } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* 1. 顶部导航栏 */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
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
        {/* 2. 左侧侧边栏 - 筛选区 (Filters) */}
        <aside className="w-80 bg-white border-r overflow-y-auto p-6 flex flex-col gap-6">
          <div>
            <h2 className="font-semibold text-lg mb-4">Cohort Filters</h2>
            <p className="text-sm text-zinc-500 mb-4">Define your patient population.</p>
          </div>
          
          <Separator />

          {/* 示例筛选器：年龄 */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label className="font-medium">Age Range</Label>
              <span className="text-sm text-zinc-500">65 - 90+</span>
            </div>
            <Slider defaultValue={[65]} max={100} min={50} step={1} />
          </div>

          <Separator />

          {/* 示例筛选器：布尔逻辑 */}
          <div className="space-y-4">
            <Label className="font-medium">Inclusion Criteria</Label>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="cognitive" className="text-sm font-normal">Cognitive Impairment</Label>
              <Switch id="cognitive" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="surgery" className="text-sm font-normal">Surgery within 48h</Label>
              <Switch id="surgery" />
            </div>
          </div>

          <div className="mt-auto pt-6">
            <Button className="w-full">Apply Filters</Button>
          </div>
        </aside>

        {/* 3. 右侧主区域 - 可视化 (Visualization) */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* 顶部关键指标 (KPI Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <Users className="h-4 w-4 text-zinc-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
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

            {/* 图表区域占位符 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="h-[400px]">
                <CardHeader>
                  <CardTitle>Age Distribution</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[300px] text-zinc-400 border-2 border-dashed m-4 rounded-lg">
                  [Histogram Placeholder]
                </CardContent>
              </Card>

              <Card className="h-[400px]">
                <CardHeader>
                  <CardTitle>Gender Breakdown ooo
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[300px] text-zinc-400 border-2 border-dashed m-4 rounded-lg">
                  [Pie Chart Placeholder]
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}