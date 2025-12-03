interface SpeedData {
  download: number
  upload: number
}

interface DatasetSummaryLinesProps {
  label: string
  originalValue?: string | number
  filteredValue?: string | number
  originalSpeedData?: SpeedData
  filteredSpeedData?: SpeedData
  type?: 'simple' | 'speed'
}

export function DatasetSummaryLines({
  label,
  originalValue,
  filteredValue,
  originalSpeedData,
  filteredSpeedData,
  type = 'simple',
}: DatasetSummaryLinesProps) {
  const formatNumber = (num: number) => num.toFixed(2)

  if (type === 'speed') {
    return (
      <div className='grid grid-cols-3'>
        <div className='stats-type'>{label}</div>
        <div className='grid grid-cols-2'>
          <div>⬇️ {formatNumber(originalSpeedData?.download || 0)}</div>
          <div>⬆️ {formatNumber(originalSpeedData?.upload || 0)}</div>
        </div>
        <div className='grid grid-cols-2'>
          <div>⬇️ {formatNumber(filteredSpeedData?.download || 0)}</div>
          <div>⬆️ {formatNumber(filteredSpeedData?.upload || 0)}</div>
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-3'>
      <div className='stats-type'>{label}</div>
      <div>{originalValue}</div>
      <div>{filteredValue}</div>
    </div>
  )
}
