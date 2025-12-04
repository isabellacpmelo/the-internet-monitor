import { useMemo, useState } from 'react'
import './style.css'
import { TableHeadButton } from '../TableHeadButton'
import type { InternetData } from '../../types/filters'

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

  const downloadCSV = () => {
    const headers = [
      'ID',
      'Download (Mbps)',
      'Upload (Mbps)',
      'Administração',
      'Localização',
      'Tecnologia',
    ]
    const csvHeaders = headers.join(',')

    const csvRows = sortedDataset.map((row) =>
      [
        row.ID,
        row.Download,
        row.Upload,
        `"${row.Dependencia_Adm}"`,
        `"${row.Localizacao}"`,
        `"${row.Tipo_Tecnologia}"`,
      ].join(',')
    )

    const csvContent = [csvHeaders, ...csvRows].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)

      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
      link.setAttribute('download', `internet-dataset-${timestamp}.csv`)

      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div>
      <div className='w-full flex justify-between items-center my-4'>
        <h3>
          Tabela com os dados do dataset ({sortedDataset.length} registros)
        </h3>
        <div className='flex gap-3'>
          <button
            type='button'
            onClick={downloadCSV}
            className='flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'>
            <i className='bi bi-download' />
            <span>Baixar CSV</span>
          </button>
          <button
            type='button'
            onClick={() => {
              setSortColumn('ID')
              setSortDirection('asc')
            }}
            className='flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'>
            <i className='bi bi-arrow-counterclockwise' />
            <span>Resetar ordenação</span>
          </button>
        </div>
      </div>
      <div className='dataset-table-container'>
        <table className='dataset-table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>
                Download (Mbps)
                <TableHeadButton
                  column='Download'
                  onSort={handleSort}
                  currentSortColumn={sortColumn}
                  sortDirection={sortDirection}
                />
              </th>
              <th>
                Upload (Mbps)
                <TableHeadButton
                  column='Upload'
                  onSort={handleSort}
                  currentSortColumn={sortColumn}
                  sortDirection={sortDirection}
                />
              </th>
              <th>
                Administração
                <TableHeadButton
                  column='Dependencia_Adm'
                  onSort={handleSort}
                  currentSortColumn={sortColumn}
                  sortDirection={sortDirection}
                />
              </th>
              <th>
                Localização
                <TableHeadButton
                  column='Localizacao'
                  onSort={handleSort}
                  currentSortColumn={sortColumn}
                  sortDirection={sortDirection}
                />
              </th>
              <th>
                Tecnologia
                <TableHeadButton
                  column='Tipo_Tecnologia'
                  onSort={handleSort}
                  currentSortColumn={sortColumn}
                  sortDirection={sortDirection}
                />
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
    </div>
  )
}
