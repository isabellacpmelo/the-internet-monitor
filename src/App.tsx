import { FiltersProvider } from './contexts/FiltersContext'
import MainTemplate from './templates/MainTemplate'

import { useDatasetCsv } from './hooks/useDatasetCsv'

function App() {
  const datasetFilePath = '/assets/csv/internet-dataset.csv'
  const { data, loading, error } = useDatasetCsv(datasetFilePath)

  if (loading) {
    return (
      <div className='h-screen flex flex-col justify-center items-center gap-4'>
        <div className='loadingio-spinner-radio-nq4q5u6dq7r'>
          <div className='ldio-x2uulkbinbj'>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className='font-bold text-gray-900 text-xl animate-pulse'>
          Carregando...
        </div>
      </div>
    )
  }
  if (error) {
    return <div>Erro: {error}</div>
  }

  return (
    <FiltersProvider data={data}>
      <MainTemplate />
    </FiltersProvider>
  )
}

export default App
