import { DatasetTable } from '../../components/DatasetTable'
import { DatasetSummary } from '../../components/DatasetSummary'
import { FilterDrawer } from '../../components/FilterDrawer'
import { useFilters } from '../../contexts/FiltersContext'
import { useDatasetCsv } from '../../hooks/useDatasetCsv'
import { useFilterDrawer } from '../../hooks/useFilterDrawer'
import { DatasetCharts } from '../../components/DatasetChats'
import { AppButton } from '../../components/AppButton'

function MainTemplate() {
  const datasetFilePath = '/assets/csv/internet-dataset.csv'
  const { data, loading, error } = useDatasetCsv(datasetFilePath)
  const { applyFilters, resetFilters } = useFilters()
  const { isDrawerOpen, openDrawer, closeDrawer } = useFilterDrawer()

  const filteredData = applyFilters(data)

  const handleResetFilters = () => {
    resetFilters(data)
  }

  if (loading) {
    return <div>Carregando dados...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='xl:p-16 p-4 my-10 max-w-7xl mx-auto'>
      <div className='text-center mb-8'>
        <h1 className='text-5xl font-bold text-gray-800 mb-2'>
          <i className='bi bi-router mr-3' />
          Monitor de Internet
        </h1>
        <p className='text-gray-600'>
          Análise completa de velocidades de internet
        </p>
      </div>

      <div className='flex justify-between items-center my-8 xl:p-4 p-2 bg-gray-100 rounded-lg border xl:mx-32'>
        <div className='flex items-center gap-3'>
          <i className='bi bi-funnel-fill text-2xl text-gray-600' />
          <div>
            <h3 className='text-lg font-semibold text-gray-800'>Filtros</h3>
            <p className='text-sm text-gray-600'>
              {filteredData.length} de {data.length} registros sendo exibidos
            </p>
          </div>
        </div>
        <div className='flex gap-3'>
          <AppButton
            variant='outlined'
            icon={<i className='bi bi-arrow-counterclockwise' />}
            onClick={handleResetFilters}
            title='Resetar todos os filtros'>
            Resetar Filtros
          </AppButton>
          <button
            type='button'
            onClick={openDrawer}
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
            title='Abrir painel de filtros'>
            <i className='bi bi-sliders' />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      <DatasetCharts data={filteredData} />
      <DatasetSummary data={filteredData} />
      <DatasetTable dataset={filteredData} />

      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        data={data}
        onReset={handleResetFilters}
      />
    </div>
  )
}

export default MainTemplate
