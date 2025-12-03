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
      <div className='max-w-4xl'>
        <div>
          <h2>
            <i className='bi bi-file-earmark-text mr-2' />
            Resumo Geral
          </h2>

          <div className='grid grid-cols-3'>
            <h3 className='bg-black/15'>
              <span className='text-transparent'>Tipo</span>
            </h3>
            <h3 className='bg-black/15'>Sem Filtro</h3>
            <h3 className='bg-black/15'>Com Filtro</h3>
          </div>

          <div className='summary-container mt-2'>
            <DatasetSummaryLines
              label='Dados totais'
              originalValue={stats.totalRecords}
              filteredValue={filteredStats.totalRecords}
            />
          </div>

          <div className='summary-container'>
            <h4>Velocidade Download</h4>
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
            <h4>Velocidade Upload</h4>
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
            <h4>Distribuição por Tecnologia</h4>
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
            <h4>Distribuição por Localização</h4>
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
            <h4>Distribuição por Administração</h4>
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

        <div>
          <h2>
            <i className='bi bi-pc-display mr-2' />
            Médias de Velocidade por Tecnologia
          </h2>

          <div className='grid grid-cols-3'>
            <h3 className='bg-black/15'>
              <span className='text-transparent'>Tipo</span>
            </h3>
            <h3 className='bg-black/15'>Sem Filtro</h3>
            <h3 className='bg-black/15'>Com Filtro</h3>
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

        <div>
          <h2>
            <i className='bi bi-geo mr-2' />
            Médias de Velocidade por Localização
          </h2>
          <div className='grid grid-cols-3'>
            <h3 className='bg-black/15'>
              <span className='text-transparent'>Tipo</span>
            </h3>
            <h3 className='bg-black/15'>Sem Filtro</h3>
            <h3 className='bg-black/15'>Com Filtro</h3>
          </div>
          <div>
            <DatasetSummaryLines
              label='Urbana'
              originalSpeedData={stats.averagesByLocation['Urbana']}
              filteredSpeedData={filteredStats.averagesByLocation['Urbana']}
              type='speed'
            />
          </div>
          <div>
            <DatasetSummaryLines
              label='Rural'
              originalSpeedData={stats.averagesByLocation['Rural']}
              filteredSpeedData={filteredStats.averagesByLocation['Rural']}
              type='speed'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
