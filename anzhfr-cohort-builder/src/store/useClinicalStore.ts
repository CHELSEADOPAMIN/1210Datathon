import { create } from 'zustand'

// Define the keys that store array of strings for categorical filters
type ClinicalArrayKeys = 
  | 'selectedFractureTypes' 
  | 'selectedDelayReasons' 
  | 'selectedASAGrades' 
  | 'selectedPatientTypes' 
  | 'selectedFrailtyScores'

interface ClinicalState {
  // 1. Fracture Type (ftype): '1'-'4'
  selectedFractureTypes: string[]
  
  // 2. Surgery Delay Reason (delay): '1'-'7'
  selectedDelayReasons: string[]
  
  // 3. ASA Grades (asa): '1'-'5'
  selectedASAGrades: string[]
  
  // 4. Patient Type (ptype): '1'-'3'
  selectedPatientTypes: string[]
  
  // 5. Clinical Frailty Scale (frailty/cfs): '1'-'10'
  selectedFrailtyScores: string[]
  
  // Hospital Settings
  selectedHospital: string | null

  // Actions
  toggleCategoricalFilter: (category: ClinicalArrayKeys, value: string) => void
  setHospital: (code: string | null) => void
}

export const useClinicalStore = create<ClinicalState>((set) => ({
  selectedFractureTypes: [], // Empty = Select All
  selectedDelayReasons: [],
  selectedASAGrades: [],
  selectedPatientTypes: [],
  selectedFrailtyScores: [],
  selectedHospital: null,

  toggleCategoricalFilter: (category, value) =>
    set((state) => {
      const currentList = state[category]
      const isSelected = currentList.includes(value)

      if (isSelected) {
        // Remove if present
        return {
          [category]: currentList.filter((item) => item !== value),
        } as Partial<ClinicalState>
      } else {
        // Add if absent
        return {
          [category]: [...currentList, value],
        } as Partial<ClinicalState>
      }
    }),

  setHospital: (code) => set({ selectedHospital: code }),
}))

