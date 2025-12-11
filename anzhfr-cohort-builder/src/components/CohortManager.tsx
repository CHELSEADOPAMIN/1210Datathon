"use client"

import { useState } from "react"
import { Save, Trash2, Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

import { useDemographicsStore } from "@/store/useDemographicsStore"
import { useClinicalStore } from "@/store/useClinicalStore"
import { useCohortStore } from "@/store/useCohortStore"
import { cn } from "@/lib/utils"

export function CohortManager() {
  const demographics = useDemographicsStore()
  const clinical = useClinicalStore()
  const { savedCohorts, saveCohort, deleteCohort, comparisonCohortId, setComparisonCohort } = useCohortStore()

  const [saveOpen, setSaveOpen] = useState(false)
  const [comboboxOpen, setComboboxOpen] = useState(false)
  const [cohortName, setCohortName] = useState("")

  const handleSave = () => {
    if (!cohortName.trim()) return

    const criteria = {
      ageRange: demographics.ageRange,
      selectedGenders: demographics.selectedGenders,
      selectedFractureTypes: clinical.selectedFractureTypes,
      selectedDelayReasons: clinical.selectedDelayReasons,
      selectedASAGrades: clinical.selectedASAGrades,
      selectedPatientTypes: clinical.selectedPatientTypes,
      selectedFrailtyScores: clinical.selectedFrailtyScores,
      selectedWeightBearings: clinical.selectedWeightBearings,
      selectedHospital: clinical.selectedHospital,
    }

    saveCohort(cohortName, criteria)
    setCohortName("")
    setSaveOpen(false)
  }

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation() // Prevent selecting the item when deleting
    deleteCohort(id)
  }

  const selectedCohortName = savedCohorts.find(c => c.id === comparisonCohortId)?.name

  return (
    <div className="flex items-center gap-4 w-full">
      {/* 1. Comparison Selector (Replaced Select with Combobox for better customization) */}
      <div className="flex items-center gap-2 flex-1">
        <Label className="whitespace-nowrap text-sm font-medium">
          Compare with:
        </Label>
        
        <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={comboboxOpen}
              className="w-[240px] justify-between"
            >
              {comparisonCohortId ? selectedCohortName : "None (Single View)"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-0">
            <Command>
              <CommandInput placeholder="Search cohort..." />
              <CommandList>
                <CommandEmpty>No cohort found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    value="none"
                    onSelect={() => {
                      setComparisonCohort(null)
                      setComboboxOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        comparisonCohortId === null ? "opacity-100" : "opacity-0"
                      )}
                    />
                    None (Single View)
                  </CommandItem>
                </CommandGroup>
                
                {savedCohorts.length > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup heading="Saved Cohorts">
                      {savedCohorts.map((cohort) => (
                        <CommandItem
                          key={cohort.id}
                          value={cohort.name}
                          onSelect={() => {
                            setComparisonCohort(cohort.id)
                            setComboboxOpen(false)
                          }}
                          className="group flex justify-between items-center"
                        >
                          <div className="flex items-center">
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                comparisonCohortId === cohort.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <span className="truncate max-w-[140px]">{cohort.name}</span>
                          </div>
                          
                          {/* Delete Button - Visible on hover or always visible */}
                          <div
                            role="button"
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded-sm transition-opacity"
                            onClick={(e) => handleDelete(e, cohort.id)}
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* 2. Save Button */}
      <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Save className="h-4 w-4" />
            Save Current
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Cohort</DialogTitle>
            <DialogDescription>
              Save your current filters as a cohort for future comparison.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={cohortName}
                onChange={(e) => setCohortName(e.target.value)}
                placeholder="e.g. High Risk Group"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
