import { useDatasetStats } from '../../hooks/DatasetStats'
import type { InternetData } from '../../types/filters'
import './syle.css'

interface DatasetSummaryProps {
  data: InternetData[]
  title?: string
}

export function DatasetSummary({ data }: DatasetSummaryProps) {
  const stats = useDatasetStats(data)

  const formatNumber = (num: number) => num.toFixed(2)

  return (
    <div>
      <div className='text-center my-8'>
        <div>
          <h3 className='text-lg font-semibold mb-3 text-gray-800 text-center'>
            <i className='bi bi-download mr-2' />
            Velocidades Download (Mbps)
          </h3>
          <div className='grid grid-cols-3 gap-4 p-4  rounded-lg'>
            <div className='text-center'>
              <p className='text-sm text-gray-600'>Média</p>
              <p className='text-xl font-bold text-blue-600'>
                {formatNumber(stats.downloadStats.average)}
              </p>
            </div>
            <div className='text-center'>
              <p className='text-sm text-gray-600'>Máximo</p>
              <p className='text-xl font-bold text-green-600'>
                {formatNumber(stats.downloadStats.max)}
              </p>
            </div>
            <div className='text-center'>
              <p className='text-sm text-gray-600'>Mínimo</p>
              <p className='text-xl font-bold text-orange-600'>
                {formatNumber(stats.downloadStats.min)}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-3 text-gray-800 text-center'>
            <i className='bi bi-upload mr-2' />
            Velocidades Upload (Mbps)
          </h3>
          <div className='grid grid-cols-3 gap-4 p-4 rounded-lg'>
            <div className='text-center'>
              <p className='text-sm text-gray-600'>Média</p>
              <p className='text-xl font-bold text-blue-600'>
                {formatNumber(stats.uploadStats.average)}
              </p>
            </div>
            <div className='text-center'>
              <p className='text-sm text-gray-600'>Máximo</p>
              <p className='text-xl font-bold text-green-600'>
                {formatNumber(stats.uploadStats.max)}
              </p>
            </div>
            <div className='text-center'>
              <p className='text-sm text-gray-600'>Mínimo</p>
              <p className='text-xl font-bold text-orange-600'>
                {formatNumber(stats.uploadStats.min)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
