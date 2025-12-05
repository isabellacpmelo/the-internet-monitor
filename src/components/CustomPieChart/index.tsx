import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'

interface PieChartData {
  name: string
  value: number
  percentage: string
  [key: string]: string | number
}

interface CustomPieChartProps {
  data: PieChartData[]
  colors: string[]
  width?: number
  height?: number
}

export function CustomPieChart({
  data,
  colors,
  width = 300,
  height = 300,
}: CustomPieChartProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart>
        <Pie
          data={data}
          labelLine={false}
          label={{
            position: 'inside',
            fontSize: 12,
            fontWeight: 'bold',
            fill: 'white',
          }}
          fill='#8884d8'
          dataKey='value'>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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
              data.find((item) => item.value === value)?.percentage
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
  )
}
