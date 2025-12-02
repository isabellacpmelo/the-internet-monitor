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

  return (
    <div>
      <div className='w-full flex justify-between my-4'>
        <h3>Tabela de com os dados do dataset</h3>
        <button
          type='button'
          onClick={() => {
            setSortColumn('ID')
            setSortDirection('asc')
          }}>
          <span>Resetar ordenação</span>
          <i className='bi bi-arrow-counterclockwise' />
        </button>
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
                Tipo de Tecnologia
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
