"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useDemographicsStore } from "@/store/useDemographicsStore"

export function DemographicsFilter() {
  const { 
    ageRange, 
    setAgeRange, 
    selectedGenders, 
    toggleGender 
  } = useDemographicsStore()

  // Genders map
  const genders = [
    { id: "1", label: "Male" },
    { id: "2", label: "Female" },
    { id: "3", label: "Intersex / Indeterminate" },
  ]

  return (
    <div className="space-y-6">
      {/* Age Range Slider */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Age Range</Label>
          <span className="text-sm text-muted-foreground tabular-nums">
            {ageRange[0]} - {ageRange[1]} years
          </span>
        </div>
        <Slider
          defaultValue={[50, 110]}
          min={50}
          max={110}
          step={1}
          value={ageRange}
          onValueChange={(val) => setAgeRange(val as [number, number])}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>50</span>
          <span>110</span>
        </div>
      </div>

      {/* Gender Checkboxes */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Gender</Label>
        <div className="space-y-2">
          {genders.map((g) => {
            const isChecked = selectedGenders.length === 0 
              ? false // Visual logic: Empty means "All", so unchecked checkboxes? 
                      // Or should we check all? Usually "Unchecked = All included implicitly" is cleaner visually, 
                      // but "Checked = Filter applied".
                      // Let's check if selectedGenders includes it.
              : selectedGenders.includes(g.id);

            // However, typical filter UI:
            // If list is empty -> Show as all unchecked or all checked?
            // User requirement: "Empty array means Select All".
            // Implementation: We will just toggle.
            
            return (
              <div key={g.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`gender-${g.id}`} 
                  checked={selectedGenders.includes(g.id)}
                  onCheckedChange={() => toggleGender(g.id)}
                />
                <Label 
                  htmlFor={`gender-${g.id}`} 
                  className="text-sm font-normal cursor-pointer"
                >
                  {g.label}
                </Label>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

