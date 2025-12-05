import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts'

interface ScatterDataPoint {
  download: number
  upload: number
  tecnologia?: string
  id?: number
  [key: string]: string | number | undefined
}

interface CustomScatterChartProps {
  data: ScatterDataPoint[]
  width?: number | `${number}%`
  height?: number
  xAxisLabel?: string
  yAxisLabel?: string
  scatterColor?: string
  scatterStrokeColor?: string
  scatterRadius?: number
  regressionLineColor?: string
  showReferenceLines?: boolean
  xReferenceLines?: number[]
  yReferenceLines?: number[]
}

export function CustomScatterChart({
  data,
  width = '100%',
  height = 300,
  xAxisLabel = 'Download (Mbps)',
  yAxisLabel = 'Upload (Mbps)',
  scatterColor = '#252683ff',
  scatterStrokeColor = '#6d69b5ff',
  scatterRadius = 5,
  regressionLineColor = '#f59e0b',
  showReferenceLines = true,
  xReferenceLines = [100, 300, 500],
  yReferenceLines = [25, 50, 100],
}: CustomScatterChartProps) {
  const calculateRegressionLine = (): [
    { x: number; y: number },
    { x: number; y: number }
  ] => {
    const n = data.length
    const sumX = data.reduce((sum, d) => sum + d.download, 0)
    const sumY = data.reduce((sum, d) => sum + d.upload, 0)
    const sumXY = data.reduce((sum, d) => sum + d.download * d.upload, 0)
    const sumXX = data.reduce((sum, d) => sum + d.download * d.download, 0)

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    const minX = Math.min(...data.map((d) => d.download))
    const maxX = Math.max(...data.map((d) => d.download))

    return [
      { x: minX, y: Math.max(0, slope * minX + intercept) },
      { x: maxX, y: slope * maxX + intercept },
    ]
  }

  const getQualityClassification = (download: number, upload: number) => {
    if (download > 300 && upload > 50) return 'Excelente'
    if (download > 100 && upload > 25) return 'Boa'
    if (download > 50 && upload > 10) return 'Regular'
    return 'Baixa'
  }

  return (
    <ResponsiveContainer width={width} height={height} className='text-sm'>
      <ScatterChart>
        <CartesianGrid strokeDasharray='3 3' opacity={0.3} />
        <XAxis
          dataKey='download'
          type='number'
          domain={['dataMin', 'dataMax']}
          label={{
            value: xAxisLabel,
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
            value: yAxisLabel,
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
          segment={calculateRegressionLine()}
          stroke={regressionLineColor}
          strokeWidth={3}
        />

        {showReferenceLines && (
          <>
            {xReferenceLines.map((x) => (
              <ReferenceLine
                key={`x-${x}`}
                x={x}
                stroke='#9ca3af'
                strokeDasharray='2 2'
                strokeWidth={1}
                opacity={0.5}
              />
            ))}
            {yReferenceLines.map((y) => (
              <ReferenceLine
                key={`y-${y}`}
                y={y}
                stroke='#9ca3af'
                strokeDasharray='2 2'
                strokeWidth={1}
                opacity={0.5}
              />
            ))}
          </>
        )}

        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{
            backgroundColor: '#f9fafb',
            border: '1px solid #9ea6b1ff',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              const ratio = ((data.upload / data.download) * 100).toFixed(1)
              const efficiency = getQualityClassification(
                data.download,
                data.upload
              )

              return (
                <div className='bg-white p-3 border rounded shadow-lg'>
                  <p className='font-semibold text-gray-800 mb-2'>
                    Velocidades
                  </p>
                  <p className='text-blue-600'>
                    <i className='bi bi-download' /> Download: {data.download}{' '}
                    Mbps
                  </p>
                  <p className='text-green-600'>
                    <i className='bi bi-upload' /> Upload: {data.upload} Mbps
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
          data={data}
          fill={scatterColor}
          name='Conexões'
          r={scatterRadius}
          fillOpacity={0.7}
          stroke={scatterStrokeColor}
          strokeWidth={1}
        />
      </ScatterChart>
    </ResponsiveContainer>
  )
}
