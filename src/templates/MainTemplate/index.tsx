import { DatasetTable } from '../../components/DatasetTable'
import { DatasetSummary } from '../../components/DatasetSummary'
import { Filters } from '../../components/Filters'
import { useFilters } from '../../contexts/FiltersContext'
import { useDatasetCsv } from '../../hooks/useDatasetCsv'

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
      <h1 className='text-2xl'>Welcome to the internet monitor :)</h1>

      <Filters data={data} />

      <div className='bg-red-500 w-full h-1 my-2' />
      <DatasetSummary data={data} filteredData={filteredData} />
      <div className='bg-red-500 w-full h-1 my-2' />
      <DatasetTable dataset={filteredData} />
    </div>
  )
}

export default MainTemplate
