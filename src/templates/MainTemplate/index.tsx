import { DatasetTable } from '../../components/DatasetTable'
import { DatasetSummary } from '../../components/DatasetSummary'
import { Filters } from '../../components/Filters'
import { useFilters } from '../../contexts/FiltersContext'
import { useDatasetCsv } from '../../hooks/useDatasetCsv'
import { DatasetCharts } from '../../components/DatasetChats'

function MainTemplate() {
  const datasetFilePath = '/src/assets/csv/internet-dataset.csv'
  const { data, loading, error } = useDatasetCsv(datasetFilePath)
  const { applyFilters } = useFilters()

  const filteredData = applyFilters(data)

  if (loading) {
    return <div>Carregando dados...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='p-16 mb-8'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>
          <i className='bi bi-router mr-3' />
          Monitor de Internet
        </h1>
        <p className='text-gray-600'>
          Análise completa de velocidades de internet
        </p>
      </div>

      <DatasetCharts data={data} />

      <Filters data={data} />

      <div className='bg-red-500 w-full h-1 my-2' />
      <DatasetSummary data={data} filteredData={filteredData} />
      <div className='bg-red-500 w-full h-1 my-2' />
      <DatasetTable dataset={filteredData} />
    </div>
  )
}

export default MainTemplate
