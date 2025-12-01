import type { InternetData } from '../../hooks/useDatasetCsv'

type SortableColumn = keyof InternetData

interface TableHeadButtonProps {
  column: SortableColumn
  onSort: (column: SortableColumn) => void
  currentSortColumn?: SortableColumn
  sortDirection?: 'asc' | 'desc'
}

export function TableHeadButton({ 
  column, 
  onSort, 
  currentSortColumn, 
  sortDirection 
}: TableHeadButtonProps) {
  const isActive = currentSortColumn === column
  const getArrowIcon = () => {
    if (!isActive) return 'bi-arrow-down-up'
    return sortDirection === 'asc' ? 'bi-arrow-up' : 'bi-arrow-down'
  }

  return (
    <button
    className='cursor-pointer'
      title='Reordenar'
      aria-label='Reordenar'
      type='button'
      onClick={() => onSort(column)}
      style={{
        marginLeft: '8px',
        opacity: isActive ? 1 : 0.6,
        transition: 'opacity 0.2s ease'
      }}
    >
      <i className={`bi ${getArrowIcon()}`} />
    </button>
  )
}