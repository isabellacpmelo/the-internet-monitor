import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useDatasetStats } from '../../hooks/DatasetStats'
import type { InternetData } from '../../types/filters'

interface DatasetChartsProps {
  data: InternetData[]
}

export function DatasetCharts({ data }: DatasetChartsProps) {
  const stats = useDatasetStats(data)

  const speedByTechData = Object.entries(stats.averagesByTechnology).map(
    ([tech, speeds]) => ({
      tecnologia: tech,
      download: Number(speeds.download.toFixed(2)),
      upload: Number(speeds.upload.toFixed(2)),
    })
  )

  return (
    <div className=''>
      <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
        <i className='bi bi-bar-chart-fill mr-3' />
        Velocidades de Internet por Tipo de Tecnologia
      </h2>

      <ResponsiveContainer width={'100%'} height={400}>
        <BarChart
          data={speedByTechData}
          margin={{ top: 30, right: 30, left: 20, bottom: 80 }}>
          <CartesianGrid strokeDasharray='3 3' opacity={0.3} />
          <XAxis
            dataKey='tecnologia'
            angle={-45}
            textAnchor='end'
            height={50}
            fontSize={13}
            fontWeight='500'
            tick={{ fill: '#374151' }}
          />
          <YAxis
            label={{
              value: 'Velocidade (Mbps)',
              angle: -90,
              position: 'insideLeft',
              style: {
                textAnchor: 'middle',
                fill: '#374151',
                fontWeight: '500',
              },
            }}
            tick={{ fill: '#374151' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#f9fafb',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            labelStyle={{ color: '#1f2937', fontWeight: '600' }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontWeight: '500',
            }}
          />
          <Bar
            dataKey='download'
            fill='#431d5cff'
            name='Download'
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey='upload'
            fill='#04595fff'
            name='Upload'
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
