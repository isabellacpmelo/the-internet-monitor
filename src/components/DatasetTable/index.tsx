import { useMemo, useState } from 'react'
import type { InternetData } from '../../hooks/useDatasetCsv'
import './index.css'

type SortableColumn = keyof InternetData

interface DatasetTableProps {
  dataset: InternetData[]
}

export function DatasetTable({ dataset }: DatasetTableProps) {
  const [sortColumn, setSortColumn] = useState<SortableColumn>('ID')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const sortedDataset = useMemo(() => {
    const sortedData = [...dataset]
    sortedData.sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1
      }
      return 0
    })
    return sortedData
  }, [dataset, sortColumn, sortDirection])

  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    <div className='dataset-table-container'>
      <table className='dataset-table'>
        <thead>
          <tr>
            <th>
              Id{' '}
              <button type='button' onClick={() => handleSort('ID')}>
                ↕️
              </button>
            </th>
            <th>
              Download
              <button type='button' onClick={() => handleSort('Download')}>
                ↕️
              </button>
            </th>
            <th>
              Upload
              <button type='button' onClick={() => handleSort('Upload')}>
                ↕️
              </button>
            </th>
            <th>
              Dependencia Adm
              <button
                type='button'
                onClick={() => handleSort('Dependencia_Adm')}>
                ↕️
              </button>
            </th>
            <th>
              Localização
              <button type='button' onClick={() => handleSort('Localizacao')}>
                ↕️
              </button>
            </th>
            <th>
              Tipo de tecnologia
              <button
                type='button'
                onClick={() => handleSort('Tipo_Tecnologia')}>
                ↕️
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedDataset.map((row) => (
            <tr key={row.ID}>
              <td>{row.ID}</td>
              <td>{row.Download}</td>
              <td>{row.Upload}</td>
              <td>{row.Dependencia_Adm}</td>
              <td>{row.Localizacao}</td>
              <td>{row.Tipo_Tecnologia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
