"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useClinicalStore } from "@/store/useClinicalStore"
import { Badge } from "@/components/ui/badge"

export function ClinicalFilter() {
  const {
    selectedFractureTypes,
    selectedDelayReasons,
    selectedASAGrades,
    selectedFrailtyScores,
    toggleCategoricalFilter
  } = useClinicalStore()

  // 1. Fracture Types
  const fractureTypes = [
    { id: "1", label: "Intracapsular (Undisplaced)" },
    { id: "2", label: "Intracapsular (Displaced)" },
    { id: "3", label: "Trochanteric" },
    { id: "4", label: "Subtrochanteric" },
  ]

  // 2. Surgery Delay Reasons
  const delayReasons = [
    { id: "1", label: "No Delay (<48h)" },
    { id: "2", label: "Medical Unfit" },
    { id: "3", label: "Anticoagulation" },
    { id: "4", label: "Theatre Unavailable" },
    { id: "5", label: "Surgeon Unavailable" },
    { id: "6", label: "Diagnosis Delayed" },
    { id: "7", label: "Other" },
  ]

  // 3. ASA Grades
  const asaGrades = ["1", "2", "3", "4", "5"]

  // 4. Frailty Scores (Simple Range or Multi-select? User suggested Multi-select/Slider)
  // Let's implement a clean multi-select using a grid of small checkboxes/buttons for 1-10
  const frailtyScores = Array.from({ length: 10 }, (_, i) => String(i + 1))

  return (
    <div className="space-y-8">
      
      {/* Fracture Type */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Fracture Type</Label>
        <div className="space-y-2">
          {fractureTypes.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={`frac-${item.id}`}
                checked={selectedFractureTypes.includes(item.id)}
                onCheckedChange={() => toggleCategoricalFilter('selectedFractureTypes', item.id)}
              />
              <Label htmlFor={`frac-${item.id}`} className="text-sm font-normal cursor-pointer">
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* ASA Grade - Compact Button/Badge Style */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">ASA Grade</Label>
        <div className="flex flex-wrap gap-2">
          {asaGrades.map((grade) => {
            const isSelected = selectedASAGrades.includes(grade)
            return (
              <div
                key={grade}
                onClick={() => toggleCategoricalFilter('selectedASAGrades', grade)}
                className={`
                  cursor-pointer px-3 py-1.5 rounded-md text-sm border transition-colors
                  ${isSelected 
                    ? "bg-primary text-primary-foreground border-primary font-medium" 
                    : "bg-background hover:bg-muted text-foreground border-input"}
                `}
              >
                ASA {grade}
              </div>
            )
          })}
        </div>
      </div>

      {/* Surgery Delay Reason */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Surgery Delay Reason</Label>
        <div className="space-y-2">
          {delayReasons.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={`delay-${item.id}`}
                checked={selectedDelayReasons.includes(item.id)}
                onCheckedChange={() => toggleCategoricalFilter('selectedDelayReasons', item.id)}
              />
              <Label htmlFor={`delay-${item.id}`} className="text-sm font-normal cursor-pointer">
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Frailty Scale */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Clinical Frailty Scale</Label>
            <span className="text-xs text-muted-foreground">(1 = Very Fit)</span>
        </div>
        
        <div className="grid grid-cols-5 gap-2">
          {frailtyScores.map((score) => {
             const isSelected = selectedFrailtyScores.includes(score)
             return (
               <div
                key={score}
                onClick={() => toggleCategoricalFilter('selectedFrailtyScores', score)}
                className={`
                  cursor-pointer h-8 flex items-center justify-center rounded text-sm border transition-colors
                  ${isSelected
                    ? "bg-blue-600 text-white border-blue-600 font-medium"
                    : "bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-200"}
                `}
               >
                 {score}
               </div>
             )
          })}
        </div>
      </div>

    </div>
  )
}

