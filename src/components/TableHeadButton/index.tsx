import type { InternetData } from '../../types/filters'

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
  sortDirection,
}: TableHeadButtonProps) {
  const isActive = currentSortColumn === column
  const getArrowIcon = () => {
    if (!isActive) return 'bi-arrow-down-up'
    return sortDirection === 'asc' ? 'bi-arrow-up' : 'bi-arrow-down'
  }

  return (
    <button
      className={`cursor-pointer ml-2 ${
        isActive ? 'opacity-90' : 'opacity-50'
      }  ease-in-out`}
      title='Reordenar'
      aria-label='Reordenar'
      type='button'
      onClick={() => onSort(column)}>
      <i className={`bi ${getArrowIcon()}`} />
    </button>
  )
}
