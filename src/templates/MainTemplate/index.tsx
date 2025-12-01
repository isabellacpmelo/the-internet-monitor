import { DatasetTable } from '../../components/DatasetTable'
import { useDatasetCsv } from '../../hooks/useDatasetCsv'

function MainTemplate() {
  const datasetFilePath = '/src/assets/csv/internet-dataset.csv'
  const { data, loading, error } = useDatasetCsv(datasetFilePath)

  if (loading) {
    return <div>Carregando dados...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='p-4'>
      <h1 className='text-2xl'>Welcome to the internet monitor :)</h1>
      <p>Total de linhas do csv: {data.length}</p>
      <p>Total de linhas com o filtro: {0}</p>
      <DatasetTable dataset={data} />
    </div>
  )
}

export default MainTemplate
