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
  ScatterChart,
  Scatter,
  ReferenceLine,
} from 'recharts'
import { useDatasetStats } from '../../hooks/DatasetStats'
import type { InternetData } from '../../types/filters'

interface DatasetChartsProps {
  data: InternetData[]
}

export function DatasetCharts({ data }: DatasetChartsProps) {
  const stats = useDatasetStats(data)

  const formatNumber = (num: number) => num.toFixed(2)

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

  const scatterData = data.map((item, index) => ({
    download: item.Download,
    upload: item.Upload,
    tecnologia: item.Tipo_Tecnologia,
    id: index,
  }))

  return (
    <div className=''>
      <div className='mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 mb-10'>
        {technologyDistributionData.map((item, index) => (
          <div
            key={item.name}
            className='text-center p-4 rounded-lg'
            style={{ backgroundColor: TECH_COLORS[index] + '20' }}>
            <div className='flex items-center justify-center gap-2 mb-2'>
              <span
                className='w-2 h-2 rounded-full mb-4 animate-ping'
                style={{ backgroundColor: TECH_COLORS[index] }}
              />
              <h3 className='text-lg font-bold text-gray-800'>
                <i
                  className={`bi ${
                    item.name === 'Fibra'
                      ? 'bi-router'
                      : item.name === 'Radio'
                      ? 'bi-broadcast-pin'
                      : item.name === 'Cable Modem'
                      ? 'bi-ethernet'
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

      <h2 className='text-2xl font-bold mb-8 text-center text-gray-800'>
        <i className='bi bi-pc-display mr-3' />
        Velocidades de Internet por Tipo de Tecnologia
      </h2>

      <div className='w-full flex flex-col md:flex-row justify-center items-center mb-4 gap-12 xl:gap-40'>
        <ResponsiveContainer width={300} height={300}>
          <PieChart>
            <Pie
              data={technologyDistributionData}
              labelLine={false}
              label
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
                  technologyDistributionData.find(
                    (item) => item.value === value
                  )?.percentage
                }%)`,
                name === 'value' ? 'Quantidade' : name,
              ]}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '16px',
                fontWeight: '500',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer width={340} height={300}>
          <BarChart data={speedByTechData}>
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
                paddingTop: '16px',
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

      <div className='mb-8'>
        <h5 className='text-center text-lg font-bold mb-4 text-gray-800'>
          <i className='bi bi-pc-display mr-2' />
          Médias de Velocidade por Tecnologia
        </h5>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {Object.entries(stats.averagesByTechnology).map(([tech, speeds]) => (
            <div key={tech} className='p-4 rounded-lg border'>
              <h5 className='font-semibold text-gray-800 mb-3 text-center'>
                {tech}
              </h5>
              <div className='space-y-2 text-center'>
                <div>
                  <p className='text-xs text-gray-500'>Download</p>
                  <p className='text-lg font-bold text-blue-600'>
                    {speeds?.download ? formatNumber(speeds.download) : '0.00'}{' '}
                    Mbps
                  </p>
                </div>
                <div>
                  <p className='text-xs text-gray-500'>Upload</p>
                  <p className='text-lg font-bold text-green-600'>
                    {speeds?.upload ? formatNumber(speeds.upload) : '0.00'} Mbps
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className='text-2xl font-bold mb-8 text-center text-gray-800'>
        <i className='bi bi-geo mr-3' />
        Comparativo de Velocidades por Região
      </h2>

      <div className='w-full flex flex-col md:flex-row justify-center items-center mb-4 gap-12 xl:gap-40'>
        <ResponsiveContainer width={300} height={300}>
          <PieChart>
            <Pie
              data={locationDistributionData}
              labelLine={false}
              label
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
                paddingTop: '16px',
                fontWeight: '500',
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer width={340} height={300}>
          <BarChart data={speedByLocationData}>
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
                paddingTop: '16px',
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
      </div>

      <div>
        <h5 className='text-lg text-center font-bold mb-4 text-gray-800 mt-8'>
          <i className='bi bi-geo mr-2' />
          Médias de Velocidade por Localização
        </h5>
        <div className='grid grid-cols-2 gap-6'>
          {Object.entries(stats.averagesByLocation).map(
            ([location, speeds]) => (
              <div key={location} className='p-6 border shadow-sm'>
                <h5 className='font-semibold text-gray-800 mb-4 flex items-center justify-center'>
                  <i
                    className={`bi ${
                      location === 'Urbana' ? 'bi-buildings' : 'bi-tree'
                    } mr-2`}
                  />
                  {location}
                </h5>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='text-center'>
                    <p className='text-sm text-gray-500 mb-1'>Download</p>
                    <p className='text-2xl font-bold text-blue-600'>
                      {speeds?.download
                        ? formatNumber(speeds.download)
                        : '0.00'}
                    </p>
                    <p className='text-xs text-gray-400'>Mbps</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-sm text-gray-500 mb-1'>Upload</p>
                    <p className='text-2xl font-bold text-green-600'>
                      {speeds?.upload ? formatNumber(speeds.upload) : '0.00'}
                    </p>
                    <p className='text-xs text-gray-400'>Mbps</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <h2 className='text-2xl font-bold mb-8 text-center text-gray-800 mt-8'>
        <i className='bi bi-buildings mr-3' />
        Velocidades por Dependência Administrativa
      </h2>

      <div className='w-full flex flex-col md:flex-row justify-center items-center mb-12 gap-12 xl:gap-40'>
        <ResponsiveContainer width={300} height={300}>
          <PieChart>
            <Pie
              data={adminDistributionData}
              labelLine={false}
              label
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
        <ResponsiveContainer width={340} height={300}>
          <BarChart data={speedByAdminData}>
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
                paddingTop: '0px',
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
      </div>

      <h2 className='text-2xl font-bold mb-8 text-center text-gray-800'>
        <i className='bi bi-graph-up mr-3' />
        Relação Download vs Upload
      </h2>

      <div className='max-w-3xl mx-auto'>
        <ResponsiveContainer width='100%' height={300} className='text-sm'>
          <ScatterChart>
            <CartesianGrid strokeDasharray='3 3' opacity={0.3} />
            <XAxis
              dataKey='download'
              type='number'
              domain={['dataMin', 'dataMax']}
              label={{
                value: 'Download (Mbps)',
                position: 'insideBottom',
                offset: -5,
                style: {
                  textAnchor: 'middle',
                  fill: '#374151',
                  fontWeight: '500',
                },
              }}
              tick={{ fill: '#374151' }}
            />
            <YAxis
              dataKey='upload'
              type='number'
              domain={['dataMin', 'dataMax']}
              label={{
                value: 'Upload (Mbps)',
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

            <ReferenceLine
              segment={(() => {
                const n = scatterData.length
                const sumX = scatterData.reduce((sum, d) => sum + d.download, 0)
                const sumY = scatterData.reduce((sum, d) => sum + d.upload, 0)
                const sumXY = scatterData.reduce(
                  (sum, d) => sum + d.download * d.upload,
                  0
                )
                const sumXX = scatterData.reduce(
                  (sum, d) => sum + d.download * d.download,
                  0
                )

                const slope =
                  (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
                const intercept = (sumY - slope * sumX) / n

                const minX = Math.min(...scatterData.map((d) => d.download))
                const maxX = Math.max(...scatterData.map((d) => d.download))

                return [
                  { x: minX, y: Math.max(0, slope * minX + intercept) },
                  { x: maxX, y: slope * maxX + intercept },
                ]
              })()}
              stroke='#f59e0b'
              strokeWidth={3}
            />

            <ReferenceLine
              x={100}
              stroke='#9ca3af'
              strokeDasharray='2 2'
              strokeWidth={1}
              opacity={0.5}
            />
            <ReferenceLine
              x={300}
              stroke='#9ca3af'
              strokeDasharray='2 2'
              strokeWidth={1}
              opacity={0.5}
            />
            <ReferenceLine
              x={500}
              stroke='#9ca3af'
              strokeDasharray='2 2'
              strokeWidth={1}
              opacity={0.5}
            />
            <ReferenceLine
              y={25}
              stroke='#9ca3af'
              strokeDasharray='2 2'
              strokeWidth={1}
              opacity={0.5}
            />
            <ReferenceLine
              y={50}
              stroke='#9ca3af'
              strokeDasharray='2 2'
              strokeWidth={1}
              opacity={0.5}
            />
            <ReferenceLine
              y={100}
              stroke='#9ca3af'
              strokeDasharray='2 2'
              strokeWidth={1}
              opacity={0.5}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: '#f9fafb',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  const ratio = ((data.upload / data.download) * 100).toFixed(1)
                  const efficiency =
                    data.download > 100
                      ? data.upload > 50
                        ? 'Excelente'
                        : data.upload > 25
                        ? 'Boa'
                        : 'Limitada'
                      : 'Baixa'
                  return (
                    <div className='bg-white p-3 border rounded shadow-lg'>
                      <p className='font-semibold text-gray-800 mb-2'>
                        Velocidades
                      </p>
                      <p className='text-blue-600'>
                        <i className='bi bi-download' /> Download:{' '}
                        {data.download} Mbps
                      </p>
                      <p className='text-green-600'>
                        <i className='bi bi-upload' /> Upload: {data.upload}{' '}
                        Mbps
                      </p>
                      <p className='text-orange-600'>
                        <i className='bi bi-calculator' /> Proporção: {ratio}%
                      </p>
                      <p className='text-gray-600'>
                        <i className='bi bi-lightning-charge' /> Qualidade:{' '}
                        {efficiency}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '16px',
                fontWeight: '500',
              }}
            />
            <Scatter
              data={scatterData}
              fill='#6366f1'
              name='Conexões'
              r={5}
              fillOpacity={0.7}
              stroke='#4f46e5'
              strokeWidth={1}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className='flex flex-col justify-between w-full'>
        <h3 className='text-lg font-bold text-gray-800 my-4 text-center'>
          <i className='bi bi-lightbulb mr-2' />
          Sobre o Gráfico de Dispersão
        </h3>
        <div className='text-sm  text-gray-700 max-w-3xl mx-auto flex flex-col md:flex-row justify-between gap-6'>
          <div className=''>
            <ul className='space-y-1'>
              <li>
                <span className='w-3 h-1 bg-orange-300 inline-block mr-2'></span>
                Laranja: Tendência real dos dados (regressão linear)
              </li>
              <li>
                <span className='w-3 h-1 bg-gray-400 inline-block mr-2 opacity-50'></span>
                Cinza: Marcos de velocidade (25, 50, 100, 300, 500 Mbps)
              </li>
            </ul>
          </div>
          <div>
            <ul className='space-y-1'>
              <li>
                • <span className='font-bold text-green-900'>Excelente:</span>{' '}
                Download &gt;100 Mbps e Upload &gt;50 Mbps
              </li>
              <li>
                • <span className='font-bold text-yellow-500'>Boa:</span>{' '}
                Download &gt;100 Mbps e Upload &gt;50 Mbps
              </li>
              <li>
                • <span className='font-bold text-amber-600'>Limitada:</span>
                Download &gt;100 Mbps mas Upload &lt;25 Mbps
              </li>
              <li>
                • <span className='font-bold text-red-500'>Baixa:</span>{' '}
                Download &lt;100 Mbps
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
