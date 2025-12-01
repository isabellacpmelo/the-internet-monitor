import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import type { InternetData } from '../types/filters'

export function useDatasetCsv(filePath: string) {
  const [data, setData] = useState<InternetData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAndParseCsv = async () => {
      try {
        setLoading(true)
        const response = await fetch(filePath)
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }
        const csvText = await response.text()

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: {
            Download: true,
            Upload: true,
          },
          complete: (result) => {
            if (result.errors.length > 0) {
              setError('Error processing csv file.')
              return
            }

            setData(result.data as InternetData[])
            setError(null)
          },
          error: (error: { message: string }) => {
            setError(`Error passing csv file: ${error.message}`)
          },
        })
      } catch (err) {
        setError(
          `Error loading the file: ${
            err instanceof Error ? err.message : 'Unknown'
          }`
        )
      } finally {
        setLoading(false)
      }
    }

    fetchAndParseCsv()
  }, [filePath])

  return { data, loading, error }
}
