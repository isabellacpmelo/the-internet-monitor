import { useDatasetStats } from '../../hooks/DatasetStats'
import type { InternetData } from '../../types/filters'
import { DatasetSummaryLines } from '../DatasetSummaryLines'
import './syle.css'

interface DatasetSummaryProps {
  data: InternetData[]
  filteredData: InternetData[]
  title?: string
}

export function DatasetSummary({ data, filteredData }: DatasetSummaryProps) {
  const stats = useDatasetStats(data)
  const filteredStats = useDatasetStats(filteredData)
  console.log(filteredStats)

  const formatNumber = (num: number) => num.toFixed(2)
  const formatPercent = (value: number, total: number) =>
    ((value / total) * 100).toFixed(1)

  return (
    <div>
      <div>
        <div>
          <h2>Resumo Geral</h2>
          <div className='grid grid-cols-3'>
            <h4>
              <span className='text-transparent'>Tipo</span>
            </h4>
            <h4>Sem Filtro</h4>
            <h4>Com Filtro</h4>
          </div>

          <div className='summary-container'>
            <h3>Ocorrencias Gerais</h3>
            <DatasetSummaryLines
              label='Dados totais'
              originalValue={stats.totalRecords}
              filteredValue={filteredStats.totalRecords}
            />
          </div>

          <div className='summary-container'>
            <h3>Velocidade Download</h3>
            <DatasetSummaryLines
              label='Média'
              originalValue={formatNumber(stats.downloadStats.average)}
              filteredValue={formatNumber(filteredStats.downloadStats.average)}
            />
            <DatasetSummaryLines
              label='Máximo'
              originalValue={formatNumber(stats.downloadStats.max)}
              filteredValue={formatNumber(filteredStats.downloadStats.max)}
            />
            <DatasetSummaryLines
              label='Mínimo'
              originalValue={formatNumber(stats.downloadStats.min)}
              filteredValue={formatNumber(filteredStats.downloadStats.min)}
            />
          </div>

          <div className='summary-container'>
            <h3>Velocidade Upload</h3>
            <DatasetSummaryLines
              label='Média'
              originalValue={formatNumber(stats.uploadStats.average)}
              filteredValue={formatNumber(filteredStats.uploadStats.average)}
            />
            <DatasetSummaryLines
              label='Máximo'
              originalValue={formatNumber(stats.uploadStats.max)}
              filteredValue={formatNumber(filteredStats.uploadStats.max)}
            />
            <DatasetSummaryLines
              label='Mínimo'
              originalValue={formatNumber(stats.uploadStats.min)}
              filteredValue={formatNumber(filteredStats.uploadStats.min)}
            />
          </div>
          <div className='summary-container'>
            <h3>Distribuição por Tecnologia</h3>
            <DatasetSummaryLines
              label='Fibra'
              originalValue={`${
                stats.technologyCount['Fibra']
              } (${formatPercent(
                stats.technologyCount['Fibra'],
                stats.totalRecords
              )}%)`}
              filteredValue={`${
                filteredStats.technologyCount['Fibra']
              } (${formatPercent(
                filteredStats.technologyCount['Fibra'],
                filteredStats.totalRecords
              )}%)`}
            />
            <DatasetSummaryLines
              label='Rádio'
              originalValue={`${
                stats.technologyCount['Radio']
              } (${formatPercent(
                stats.technologyCount['Radio'],
                stats.totalRecords
              )}%)`}
              filteredValue={`${
                filteredStats.technologyCount['Radio']
              } (${formatPercent(
                filteredStats.technologyCount['Radio'],
                filteredStats.totalRecords
              )}%)`}
            />
            <DatasetSummaryLines
              label='Cable Modem'
              originalValue={`${
                stats.technologyCount['Cable Modem']
              } (${formatPercent(
                stats.technologyCount['Cable Modem'],
                stats.totalRecords
              )}%)`}
              filteredValue={`${
                filteredStats.technologyCount['Cable Modem']
              } (${formatPercent(
                filteredStats.technologyCount['Cable Modem'],
                filteredStats.totalRecords
              )}%)`}
            />
            <DatasetSummaryLines
              label='Satelite'
              originalValue={`${
                stats.technologyCount['Satelite']
              } (${formatPercent(
                stats.technologyCount['Satelite'],
                stats.totalRecords
              )}%)`}
              filteredValue={`${
                filteredStats.technologyCount['Satelite']
              } (${formatPercent(
                filteredStats.technologyCount['Satelite'],
                filteredStats.totalRecords
              )}%)`}
            />
          </div>
          <div className='summary-container'>
            <h3>Distribuição por Localização</h3>
            <DatasetSummaryLines
              label='Urbana'
              originalValue={`${stats.locationCount['Urbana']} (${formatPercent(
                stats.locationCount['Urbana'],
                stats.totalRecords
              )}%)`}
              filteredValue={`${
                filteredStats.locationCount['Urbana']
              } (${formatPercent(
                filteredStats.locationCount['Urbana'],
                filteredStats.totalRecords
              )}%)`}
            />
            <DatasetSummaryLines
              label='Rural'
              originalValue={`${stats.locationCount['Rural']} (${formatPercent(
                stats.locationCount['Rural'],
                stats.totalRecords
              )}%)`}
              filteredValue={`${
                filteredStats.locationCount['Rural']
              } (${formatPercent(
                filteredStats.locationCount['Rural'],
                filteredStats.totalRecords
              )}%)`}
            />
          </div>
          <div className='summary-container'>
            {' '}
            <h3>Distribuição por Administração</h3>
            <DatasetSummaryLines
              label='Municipal'
              originalValue={`${
                stats.administrationCount['Municipal']
              } (${formatPercent(
                stats.administrationCount['Municipal'],
                stats.totalRecords
              )}%)`}
              filteredValue={`${
                filteredStats.administrationCount['Municipal']
              } (${formatPercent(
                filteredStats.administrationCount['Municipal'],
                filteredStats.totalRecords
              )}%)`}
            />
            <DatasetSummaryLines
              label='Estadual'
              originalValue={`${
                stats.administrationCount['Estadual']
              } (${formatPercent(
                stats.administrationCount['Estadual'],
                stats.totalRecords
              )}%)`}
              filteredValue={`${
                filteredStats.administrationCount['Estadual']
              } (${formatPercent(
                filteredStats.administrationCount['Estadual'],
                filteredStats.totalRecords
              )}%)`}
            />
            <DatasetSummaryLines
              label='Federal'
              originalValue={`${
                stats.administrationCount['Federal']
              } (${formatPercent(
                stats.administrationCount['Federal'],
                stats.totalRecords
              )}%)`}
              filteredValue={`${
                filteredStats.administrationCount['Federal']
              } (${formatPercent(
                filteredStats.administrationCount['Federal'],
                filteredStats.totalRecords
              )}%)`}
            />
          </div>
        </div>

        <div className='bg-blue-500 w-1/2 h-1 my-4' />

        <div>
          <h2>Médias de Velocidade por Tecnologia</h2>

          <div className='grid grid-cols-3'>
            <h4>
              <span className='text-transparent'>Tipo</span>
            </h4>
            <h4>Sem Filtro</h4>
            <h4>Com Filtro</h4>
          </div>

          <DatasetSummaryLines
            label='Satélite'
            originalSpeedData={stats.averagesByTechnology['Satelite']}
            filteredSpeedData={filteredStats.averagesByTechnology['Satelite']}
            type='speed'
          />
          <DatasetSummaryLines
            label='Radio'
            originalSpeedData={stats.averagesByTechnology['Radio']}
            filteredSpeedData={filteredStats.averagesByTechnology['Radio']}
            type='speed'
          />
          <DatasetSummaryLines
            label='Cable Modem'
            originalSpeedData={stats.averagesByTechnology['Cable Modem']}
            filteredSpeedData={
              filteredStats.averagesByTechnology['Cable Modem']
            }
            type='speed'
          />
          <DatasetSummaryLines
            label='Fibra'
            originalSpeedData={stats.averagesByTechnology['Fibra']}
            filteredSpeedData={filteredStats.averagesByTechnology['Fibra']}
            type='speed'
          />
        </div>

        <div className='bg-blue-500 w-1/2 h-1 py-4' />

        <div>
          <h2>Médias de Velocidade por Localização</h2>
          <div className='grid grid-cols-3'>
            <h4>
              <span className='text-transparent'>Tipo</span>
            </h4>
            <h4>Sem Filtro</h4>
            <h4>Com Filtro</h4>
          </div>
          <DatasetSummaryLines
            label='Urbana'
            originalSpeedData={stats.averagesByLocation['Urbana']}
            filteredSpeedData={filteredStats.averagesByLocation['Urbana']}
            type='speed'
          />
          <DatasetSummaryLines
            label='Rural'
            originalSpeedData={stats.averagesByLocation['Rural']}
            filteredSpeedData={filteredStats.averagesByLocation['Rural']}
            type='speed'
          />
        </div>
      </div>
    </div>
  )
}
