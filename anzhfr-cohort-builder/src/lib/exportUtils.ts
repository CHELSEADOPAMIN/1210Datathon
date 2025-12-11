import { Patient } from "@/types/patients"
import Papa from "papaparse"

export function exportToCSV(data: Patient[], filename: string = "cohort-export.csv") {
  if (!data || data.length === 0) {
    alert("No data to export")
    return
  }

  // Convert data to CSV string
  // We can choose which fields to export. Let's export all for now.
  // Or map to human readable headers? Let's keep it simple (raw data).
  const csv = Papa.unparse(data)

  // Create a blob and trigger download
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  
  // Create a fake URL
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

