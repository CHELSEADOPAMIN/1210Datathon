import { create } from 'zustand'

interface DemographicsState {
  ageRange: [number, number]
  selectedGenders: string[]
  setAgeRange: (newRange: [number, number]) => void
  toggleGender: (code: string) => void
}

export const useDemographicsStore = create<DemographicsState>((set) => ({
  ageRange: [50, 110],
  selectedGenders: [], // Empty means "Select All" logic in UI

  setAgeRange: (newRange) => set({ ageRange: newRange }),

  toggleGender: (code) =>
    set((state) => {
      const isSelected = state.selectedGenders.includes(code)
      if (isSelected) {
        // Remove if already selected
        return {
          selectedGenders: state.selectedGenders.filter((c) => c !== code),
        }
      } else {
        // Add if not selected
        return {
          selectedGenders: [...state.selectedGenders, code],
        }
      }
    }),
}))

