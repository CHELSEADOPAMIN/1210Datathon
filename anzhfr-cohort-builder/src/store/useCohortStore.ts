import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 定义一个完整的筛选快照结构
export interface CohortCriteria {
  // Demographics
  ageRange: [number, number]
  selectedGenders: string[]
  
  // Clinical
  selectedFractureTypes: string[]
  selectedDelayReasons: string[]
  selectedASAGrades: string[]
  selectedPatientTypes: string[]
  selectedFrailtyScores: string[]
  selectedWeightBearings: string[]
  selectedHospital: string | null
}

export interface SavedCohort {
  id: string
  name: string
  timestamp: number
  criteria: CohortCriteria
}

interface CohortState {
  savedCohorts: SavedCohort[]
  comparisonCohortId: string | null // The ID of the cohort we are comparing AGAINST
  
  saveCohort: (name: string, criteria: CohortCriteria) => void
  deleteCohort: (id: string) => void
  setComparisonCohort: (id: string | null) => void
}

// 使用 persist 中间件，这样刷新页面后存档还在
export const useCohortStore = create<CohortState>()(
  persist(
    (set) => ({
      savedCohorts: [],
      comparisonCohortId: null,

      saveCohort: (name, criteria) =>
        set((state) => ({
          savedCohorts: [
            ...state.savedCohorts,
            {
              id: crypto.randomUUID(), // 使用原生 API 生成 ID
              name,
              timestamp: Date.now(),
              criteria: JSON.parse(JSON.stringify(criteria)), // 深拷贝以防万一
            },
          ],
        })),

      deleteCohort: (id) =>
        set((state) => ({
          savedCohorts: state.savedCohorts.filter((c) => c.id !== id),
          // 如果删除的是当前正在对比的，重置对比状态
          comparisonCohortId: state.comparisonCohortId === id ? null : state.comparisonCohortId,
        })),

      setComparisonCohort: (id) => set({ comparisonCohortId: id }),
    }),
    {
      name: 'anzhfr-cohort-storage', // localStorage key
    }
  )
)

