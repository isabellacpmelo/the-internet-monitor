import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
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

  const speedByLocationData = Object.entries(stats.averagesByLocation).map(
    ([location, speeds]) => ({
      regiao: location,
      download: Number(speeds.download.toFixed(2)),
      upload: Number(speeds.upload.toFixed(2)),
    })
  )

  const locationDistributionData = Object.entries(stats.locationCount).map(
    ([location, count]) => ({
      name: location,
      value: count,
      percentage: ((count / stats.totalRecords) * 100).toFixed(1),
    })
  )

  const COLORS = ['#623db6ff', '#284449ff']

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

      <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
        <i className='bi bi-geo-alt-fill mr-3' />
        Comparativo de Velocidades por Região
      </h2>

      <ResponsiveContainer width={'100%'} height={400}>
        <BarChart
          data={speedByLocationData}
          margin={{ top: 30, right: 30, left: 20, bottom: 80 }}>
          <CartesianGrid strokeDasharray='3 3' opacity={0.3} />
          <XAxis
            dataKey='regiao'
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
            fill='#233b21ff'
            name='Download'
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey='upload'
            fill='#351d49ff'
            name='Upload'
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
        <i className='bi bi-pie-chart-fill mr-3' />
        Distribuição de Registros por Localização
      </h2>

      <div className='bg-white rounded-lg shadow-lg p-8'>
        <ResponsiveContainer width='100%' height={400}>
          <PieChart>
            <Pie
              data={locationDistributionData}
              cx='50%'
              cy='50%'
              labelLine={false}
              label
              outerRadius={120}
              fill='#8884d8'
              dataKey='value'>
              {locationDistributionData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#f9fafb',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value, name) => [
                `${value} registros (${
                  locationDistributionData.find((item) => item.value === value)
                    ?.percentage
                }%)`,
                name === 'value' ? 'Quantidade' : name,
              ]}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '20px',
                fontWeight: '500',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
