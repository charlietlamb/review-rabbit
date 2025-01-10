/**
 * Parses a CSV file into a 2D array
 * @param file The CSV file to parse
 * @returns Promise resolving to a 2D array of strings
 */
export async function parseCSVFile(file: File): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string
        const rows = text.split(/\r?\n/).filter((row) => row.trim())
        const data = rows.map((row) => {
          // Handle both quoted and unquoted CSV values
          const matches = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)
          if (!matches) return []
          return matches.map((value) => value.replace(/(^"|"$)/g, '').trim())
        })
        resolve(data)
      } catch (error) {
        reject(
          new Error('Failed to parse CSV file: ' + (error as Error).message)
        )
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsText(file)
  })
}

/**
 * Validates if a file is a CSV
 * @param file File to validate
 * @returns boolean indicating if file is CSV
 */
export function isCSVFile(file: File): boolean {
  return file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv')
}
