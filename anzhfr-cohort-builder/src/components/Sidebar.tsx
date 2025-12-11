"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { AdminFilter } from "./filters/AdminFilter"
import { ClinicalFilter } from "./filters/ClinicalFilter"
import { DemographicsFilter } from "./filters/DemographicsFilter"

export function Sidebar({ className }: { className?: string }) {
  // Reset function logic would be here
  // For now we just implement the layout
  const handleReset = () => {
    window.location.reload() // Simplest reset for now, better to use store reset actions later
  }

  return (
    <aside className={`bg-white border-r overflow-y-auto flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-6 pb-4">
        <h2 className="font-semibold text-lg">Cohort Filters</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Define your patient population.
        </p>
      </div>

      <Separator />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-2">
        <Accordion type="multiple" defaultValue={["demographics", "clinical"]} className="w-full">

          <AccordionItem value="demographics" className="border-b-0">
            <AccordionTrigger className="text-base font-semibold">
              Demographics
            </AccordionTrigger>
            <AccordionContent>
              <DemographicsFilter />
            </AccordionContent>
          </AccordionItem>

          <Separator className="my-2" />

          <AccordionItem value="clinical" className="border-b-0">
            <AccordionTrigger className="text-base font-semibold">
              Clinical Features
            </AccordionTrigger>
            <AccordionContent>
              <ClinicalFilter />
            </AccordionContent>
          </AccordionItem>

          <Separator className="my-2" />

          <AccordionItem value="admin" className="border-b-0">
            <AccordionTrigger className="text-base font-semibold">
              Administrative
            </AccordionTrigger>
            <AccordionContent>
              <AdminFilter />
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t mt-auto bg-white sticky bottom-0 z-10">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button>
            Apply
          </Button>
        </div>
      </div>
    </aside>
  )
}

