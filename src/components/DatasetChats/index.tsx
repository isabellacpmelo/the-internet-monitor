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

  const speedByAdminData = Object.entries(stats.averagesByAdministration).map(
    ([admin, speeds]) => ({
      dependencia: admin,
      download: Number(speeds.download.toFixed(2)),
      upload: Number(speeds.upload.toFixed(2)),
    })
  )

  const adminDistributionData = Object.entries(stats.administrationCount).map(
    ([admin, count]) => ({
      name: admin,
      value: count,
      percentage: ((count / stats.totalRecords) * 100).toFixed(1),
    })
  )

  const ADMIN_COLORS = ['#4c6d4cff', '#9c7c65ff', '#1d6136ff']

  const technologyDistributionData = Object.entries(stats.technologyCount).map(
    ([tech, count]) => ({
      name: tech,
      value: count,
      percentage: ((count / stats.totalRecords) * 100).toFixed(1),
    })
  )

  const TECH_COLORS = ['#222e42ff', '#1a4e3dff', '#aa833fff', '#925858ff']

  return (
    <div className=''>
      <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
        <i className='bi bi-bar-chart-fill mr-3' />
        Velocidades de Internet por Tipo de Tecnologia
      </h2>

      <div className='mt-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
        {technologyDistributionData.map((item, index) => (
          <div
            key={item.name}
            className='text-center p-4 rounded-lg'
            style={{ backgroundColor: TECH_COLORS[index] + '20' }}>
            <div className='flex items-center justify-center gap-2 mb-2'>
              <span
                className='w-4 h-4 rounded-full'
                style={{ backgroundColor: TECH_COLORS[index] }}></span>
              <h3 className='text-lg font-bold text-gray-800'>
                <i
                  className={`bi ${
                    item.name === 'Fibra'
                      ? 'bi-ethernet'
                      : item.name === 'Radio'
                      ? 'bi-broadcast'
                      : item.name === 'Cable Modem'
                      ? 'bi-router'
                      : 'bi-globe'
                  } mr-2`}
                />
                {item.name}
              </h3>
            </div>
            <p
              className='text-2xl font-bold mb-1'
              style={{ color: TECH_COLORS[index] }}>
              {item.value.toLocaleString()}
            </p>
            <p className='text-sm text-gray-600'>registros</p>
            <p
              className='text-lg font-semibold mt-2'
              style={{ color: TECH_COLORS[index] }}>
              {item.percentage}%
            </p>
            <p className='text-xs text-gray-500'>do total</p>
          </div>
        ))}
      </div>

      <ResponsiveContainer width='100%' height={400}>
        <PieChart>
          <Pie
            data={technologyDistributionData}
            cx='50%'
            cy='50%'
            labelLine={false}
            label
            outerRadius={120}
            fill='#8884d8'
            dataKey='value'>
            {technologyDistributionData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={TECH_COLORS[index % TECH_COLORS.length]}
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
                technologyDistributionData.find((item) => item.value === value)
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

      <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
        <i className='bi bi-building mr-3' />
        Velocidades por Dependência Administrativa
      </h2>

      <ResponsiveContainer width={'100%'} height={400}>
        <BarChart
          data={speedByAdminData}
          margin={{ top: 30, right: 30, left: 20, bottom: 80 }}>
          <CartesianGrid strokeDasharray='3 3' opacity={0.3} />
          <XAxis
            dataKey='dependencia'
            angle={-45}
            textAnchor='end'
            height={80}
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
            fill='#2b5679ff'
            name='Download'
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey='upload'
            fill='#51923eff'
            name='Upload'
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
        <i className='bi bi-pie-chart mr-3' />
        Distribuição por Dependência Administrativa
      </h2>
      <ResponsiveContainer width='100%' height={400}>
        <PieChart>
          <Pie
            data={adminDistributionData}
            cx='50%'
            cy='50%'
            labelLine={false}
            label
            outerRadius={120}
            fill='#8884d8'
            dataKey='value'>
            {adminDistributionData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={ADMIN_COLORS[index % ADMIN_COLORS.length]}
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
                adminDistributionData.find((item) => item.value === value)
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

      <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
        <i className='bi bi-pie-chart-fill mr-3' />
        Distribuição por Tipo de Tecnologia
      </h2>
    </div>
  )
}
