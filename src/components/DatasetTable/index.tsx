import { useMemo, useState } from 'react'
import './style.css'
import { TableHeadButton } from '../TableHeadButton'
import { AppButton } from '../AppButton'
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
    <div className='dataset-table-wrapper'>
      <div className='table-header'>
        <div className='table-title-section'>
          <h2 className='table-title'>
            <i className='bi bi-table' />
            Dataset
          </h2>
          <span className='record-count'>{sortedDataset.length} registros</span>
        </div>

        <div className='table-actions'>
          <AppButton
            variant='outlined'
            icon={<i className='bi bi-arrow-counterclockwise' />}
            onClick={() => {
              setSortColumn('ID')
              setSortDirection('asc')
            }}>
            Resetar
          </AppButton>
          <AppButton
            icon={<i className='bi bi-download' />}
            onClick={downloadCSV}>
            Exportar CSV
          </AppButton>
        </div>
      </div>

      <div className='table-container'>
        <div className='table-scroll-wrapper'>
          <table className='modern-table'>
            <thead>
              <tr>
                <th className='id-column'>ID</th>
                <th className='sortable-column'>
                  <div className='column-header'>
                    <span>Download</span>
                    <small>(Mbps)</small>
                    <TableHeadButton
                      column='Download'
                      onSort={handleSort}
                      currentSortColumn={sortColumn}
                      sortDirection={sortDirection}
                    />
                  </div>
                </th>
                <th className='sortable-column'>
                  <div className='column-header'>
                    <span>Upload</span>
                    <small>(Mbps)</small>
                    <TableHeadButton
                      column='Upload'
                      onSort={handleSort}
                      currentSortColumn={sortColumn}
                      sortDirection={sortDirection}
                    />
                  </div>
                </th>
                <th className='sortable-column'>
                  <div className='column-header'>
                    <span>Administração</span>
                    <TableHeadButton
                      column='Dependencia_Adm'
                      onSort={handleSort}
                      currentSortColumn={sortColumn}
                      sortDirection={sortDirection}
                    />
                  </div>
                </th>
                <th className='sortable-column'>
                  <div className='column-header'>
                    <span>Localização</span>
                    <TableHeadButton
                      column='Localizacao'
                      onSort={handleSort}
                      currentSortColumn={sortColumn}
                      sortDirection={sortDirection}
                    />
                  </div>
                </th>
                <th className='sortable-column'>
                  <div className='column-header'>
                    <span>Tecnologia</span>
                    <TableHeadButton
                      column='Tipo_Tecnologia'
                      onSort={handleSort}
                      currentSortColumn={sortColumn}
                      sortDirection={sortDirection}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedDataset.map((row, index) => (
                <tr
                  key={row.ID}
                  className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>
                    <span>{row.ID}</span>
                  </td>
                  <td>
                    <span>{row.Download}</span>
                  </td>
                  <td>
                    <span>{row.Upload}</span>
                  </td>
                  <td>
                    <span>{row.Dependencia_Adm}</span>
                  </td>
                  <td>
                    <span>{row.Localizacao}</span>
                  </td>
                  <td>
                    <span>{row.Tipo_Tecnologia}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
