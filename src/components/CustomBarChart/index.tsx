import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

interface BarChartData {
  [key: string]: string | number
}

interface CustomBarChartProps {
  data: BarChartData[]
  xAxisKey: string
  downloadKey?: string
  uploadKey?: string
  downloadColor?: string
  uploadColor?: string
  width?: number
  height?: number
  xAxisAngle?: number
  xAxisHeight?: number
  yAxisLabel?: string
}

export function CustomBarChart({
  data,
  xAxisKey,
  downloadKey = 'download',
  uploadKey = 'upload',
  downloadColor = '#1a5a8fff',
  uploadColor = '#6d346fff',
  width = 340,
  height = 300,
  xAxisAngle = 0,
  xAxisHeight = 50,
  yAxisLabel = 'Velocidade (Mbps)',
}: CustomBarChartProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray='3 3' opacity={0.3} />
        <XAxis
          dataKey={xAxisKey}
          angle={xAxisAngle}
          textAnchor={xAxisAngle !== 0 ? 'end' : 'middle'}
          height={xAxisHeight}
          fontSize={13}
          fontWeight='500'
          tick={{ fill: '#374151' }}
        />
        <YAxis
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
          dataKey={downloadKey}
          fill={downloadColor}
          name='Download'
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey={uploadKey}
          fill={uploadColor}
          name='Upload'
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
