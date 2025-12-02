import { DatasetTable } from '../../components/DatasetTable'
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
    <div className='p-4'>
      <h1 className='text-2xl'>Welcome to the internet monitor :)</h1>

      <Filters data={data} />
      <p>Total de linhas do csv: {data.length}</p>
      <p>Total de linhas com o filtro: {filteredData.length}</p>

      <DatasetTable dataset={filteredData} />
    </div>
  )
}

export default MainTemplate
