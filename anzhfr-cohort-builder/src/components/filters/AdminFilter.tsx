"use client"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useClinicalStore } from "@/store/useClinicalStore"
import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"

export function AdminFilter() {
  const {
    selectedPatientTypes,
    toggleCategoricalFilter,
    selectedHospital,
    setHospital
  } = useClinicalStore()

  const [open, setOpen] = React.useState(false)

  // Patient Types
  const patientTypes = [
    { id: "1", label: "Public" },
    { id: "2", label: "Private" },
    { id: "3", label: "Overseas" },
  ]

  // Mock Hospital List (In reality this might come from a separate store or API)
  const hospitals = [
    { value: "H01", label: "Royal Melbourne Hospital" },
    { value: "H02", label: "The Alfred" },
    { value: "H03", label: "St Vincent's Hospital" },
    { value: "H04", label: "Austin Hospital" },
    { value: "H05", label: "Monash Medical Centre" },
  ]

  return (
    <div className="space-y-6">

      {/* Patient Type - Segmented Control Style */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Patient Type</Label>
        <div className="flex rounded-md shadow-sm">
          {patientTypes.map((type, index) => {
            const isSelected = selectedPatientTypes.includes(type.id)
            const isFirst = index === 0
            const isLast = index === patientTypes.length - 1

            return (
              <button
                key={type.id}
                onClick={() => toggleCategoricalFilter('selectedPatientTypes', type.id)}
                className={cn(
                  "flex-1 px-3 py-2 text-sm font-medium border focus:z-10 focus:ring-2 focus:ring-primary",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary z-10"
                    : "bg-background text-foreground hover:bg-muted border-input",
                  isFirst && "rounded-l-md",
                  isLast && "rounded-r-md",
                  !isFirst && "-ml-px" // Overlap borders
                )}
              >
                {type.label}
              </button>
            )
          })}
        </div>
        <p className="text-xs text-muted-foreground">
          {selectedPatientTypes.length === 0 ? "Showing all patient types" : `Selected: ${selectedPatientTypes.length}`}
        </p>
      </div>

      {/* Hospital Selector (Combobox) */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Hospital</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedHospital
                ? hospitals.find((h) => h.value === selectedHospital)?.label
                : "All Hospitals"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search hospital..." />
              <CommandList>
                <CommandEmpty>No hospital found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    value="all"
                    onSelect={() => {
                      setHospital(null)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedHospital === null ? "opacity-100" : "opacity-0"
                      )}
                    />
                    All Hospitals
                  </CommandItem>
                  {hospitals.map((hospital) => (
                    <CommandItem
                      key={hospital.value}
                      value={hospital.label}
                      onSelect={() => {
                        setHospital(hospital.value === selectedHospital ? null : hospital.value)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedHospital === hospital.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {hospital.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

    </div>
  )
}

