interface DatasetSummaryLinesProps {
  label: string
  originalValue: string | number
  filteredValue: string | number
}

export function DatasetSummaryLines({
  label,
  originalValue,
  filteredValue,
}: DatasetSummaryLinesProps) {
  return (
    <div className='grid grid-cols-3'>
      <div className='stats-type'>{label}</div>
      <div>{originalValue}</div>
      <div>{filteredValue}</div>
    </div>
  )
}
