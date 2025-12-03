import { useDatasetStats } from '../../hooks/DatasetStats'
import type { InternetData } from '../../types/filters'

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
          <h4>Ocorrencias Gerais sem filtro</h4>
          <div className='grid grid-cols-3'>
            <h3 className='text-transparent'>Tipo</h3>
            <h3>Sem Filtro</h3>
            <h3>Com Filtro</h3>
          </div>
          <div className='w-full flex justify-center'>
            <h4>Ocorrencias Gerais</h4>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Dados totais</h3>
            <h3>{stats.totalRecords}</h3>
            <h3>{filteredStats.totalRecords}</h3>
          </div>
          <div className='w-full flex justify-center'>
            <h4>Velocidade Download</h4>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Média</h3>
            <h3>{formatNumber(stats.downloadStats.average)}</h3>
            <h3>{formatNumber(filteredStats.downloadStats.average)}</h3>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Máximo</h3>
            <h3>{formatNumber(stats.downloadStats.max)}</h3>
            <h3>{formatNumber(filteredStats.downloadStats.max)}</h3>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Mínimo</h3>
            <h3>{formatNumber(stats.downloadStats.min)}</h3>
            <h3>{formatNumber(filteredStats.downloadStats.min)}</h3>
          </div>
          <div className='w-full flex justify-center'>
            <h4>Velocidade Upload</h4>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Média</h3>
            <h3>{formatNumber(stats.uploadStats.average)}</h3>
            <h3>{formatNumber(filteredStats.uploadStats.average)}</h3>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Máximo</h3>
            <h3>{formatNumber(stats.uploadStats.max)}</h3>
            <h3>{formatNumber(filteredStats.uploadStats.max)}</h3>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Mínimo</h3>
            <h3>{formatNumber(stats.uploadStats.min)}</h3>
            <h3>{formatNumber(filteredStats.uploadStats.min)}</h3>
          </div>
          <div className='w-full flex justify-center'>
            <h4>Distribuição por Tecnologia</h4>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Fibra</h3>
            {/* Porcentagem só da fibra */}
            <h3>
              {stats.technologyCount['Fibra']} (
              {formatPercent(
                stats.technologyCount['Fibra'],
                stats.totalRecords
              )}
              %)
            </h3>
            <h3>
              {filteredStats.technologyCount['Fibra']} (
              {formatPercent(
                filteredStats.technologyCount['Fibra'],
                filteredStats.totalRecords
              )}
              %)
            </h3>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Rádio</h3>
            {/* Porcentagem só da fibra */}
            <h3>
              {stats.technologyCount['Radio']} (
              {formatPercent(
                stats.technologyCount['Radio'],
                stats.totalRecords
              )}
              %)
            </h3>
            <h3>
              {filteredStats.technologyCount['Radio']} (
              {formatPercent(
                filteredStats.technologyCount['Radio'],
                filteredStats.totalRecords
              )}
              %)
            </h3>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Cable Modem</h3>
            {/* Porcentagem só da fibra */}
            <h3>
              {stats.technologyCount['Cable Modem']} (
              {formatPercent(
                stats.technologyCount['Cable Modem'],
                stats.totalRecords
              )}
              %)
            </h3>
            <h3>
              {filteredStats.technologyCount['Cable Modem']} (
              {formatPercent(
                filteredStats.technologyCount['Cable Modem'],
                filteredStats.totalRecords
              )}
              %)
            </h3>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Satelite</h3>
            {/* Porcentagem só da fibra */}
            <h3>
              {stats.technologyCount['Satelite']} (
              {formatPercent(
                stats.technologyCount['Satelite'],
                stats.totalRecords
              )}
              %)
            </h3>
            <h3>
              {filteredStats.technologyCount['Satelite']} (
              {formatPercent(
                filteredStats.technologyCount['Satelite'],
                filteredStats.totalRecords
              )}
              %)
            </h3>
          </div>
          <div className='w-full flex justify-center'>
            <h4>Distribuição por Localização</h4>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Urbana:</h3>
            {/* Porcentagem só da fibra */}
            <h3>
              {stats.locationCount['Urbana']} (
              {formatPercent(stats.locationCount['Urbana'], stats.totalRecords)}
              %)
            </h3>
            <h3>
              {filteredStats.locationCount['Urbana']} (
              {formatPercent(
                filteredStats.locationCount['Urbana'],
                filteredStats.totalRecords
              )}
              %)
            </h3>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Rural:</h3>
            {/* Porcentagem só da fibra */}
            <h3>
              {stats.locationCount['Rural']} (
              {formatPercent(stats.locationCount['Rural'], stats.totalRecords)}
              %)
            </h3>
            <h3>
              {filteredStats.locationCount['Rural']} (
              {formatPercent(
                filteredStats.locationCount['Rural'],
                filteredStats.totalRecords
              )}
              %)
            </h3>
          </div>
          <div className='w-full flex justify-center'>
            <h4>Distribuição por Administração</h4>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Municipal</h3>
            {/* Porcentagem só da fibra */}
            <h3>
              {stats.administrationCount['Municipal']} (
              {formatPercent(
                stats.administrationCount['Municipal'],
                stats.totalRecords
              )}
              %)
            </h3>
            <h3>
              {filteredStats.administrationCount['Municipal']} (
              {formatPercent(
                filteredStats.administrationCount['Municipal'],
                filteredStats.totalRecords
              )}
              %)
            </h3>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Estadual</h3>
            {/* Porcentagem só da fibra */}
            <h3>
              {stats.administrationCount['Estadual']} (
              {formatPercent(
                stats.administrationCount['Estadual'],
                stats.totalRecords
              )}
              %)
            </h3>
            <h3>
              {filteredStats.administrationCount['Estadual']} (
              {formatPercent(
                filteredStats.administrationCount['Estadual'],
                filteredStats.totalRecords
              )}
              %)
            </h3>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Federal</h3>
            {/* Porcentagem só da fibra */}
            <h3>
              {stats.administrationCount['Federal']} (
              {formatPercent(
                stats.administrationCount['Federal'],
                stats.totalRecords
              )}
              %)
            </h3>
            <h3>
              {filteredStats.administrationCount['Federal']} (
              {formatPercent(
                filteredStats.administrationCount['Federal'],
                filteredStats.totalRecords
              )}
              %)
            </h3>
          </div>
        </div>

        <div className='bg-blue-500 w-1/2 h-1 my-4' />

        <div>
          <h4>Médias de Velocidade por Tecnologia</h4>
          <div className='grid grid-cols-3'>
            <h3 className='text-transparent'>Tipo</h3>
            <h3>Sem Filtro</h3>
            <h3>Com Filtro</h3>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Satélite</h3>
            <div className='grid grid-cols-2'>
              <div>
                ⬇️
                {formatNumber(
                  stats.averagesByTechnology['Satelite']?.download || 0
                )}
              </div>
              <div>
                ⬆️
                {formatNumber(
                  stats.averagesByTechnology['Satelite']?.upload || 0
                )}
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div>
                ⬇️
                {formatNumber(
                  filteredStats.averagesByTechnology['Satelite']?.download || 0
                )}
              </div>
              <div>
                ⬆️
                {formatNumber(
                  filteredStats.averagesByTechnology['Satelite']?.upload || 0
                )}
              </div>
            </div>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Radio</h3>
            <div className='grid grid-cols-2'>
              <div>
                ⬇️
                {formatNumber(
                  stats.averagesByTechnology['Radio']?.download || 0
                )}
              </div>
              <div>
                ⬆️
                {formatNumber(stats.averagesByTechnology['Radio']?.upload || 0)}
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div>
                ⬇️
                {formatNumber(
                  filteredStats.averagesByTechnology['Radio']?.download || 0
                )}
              </div>
              <div>
                ⬆️
                {formatNumber(
                  filteredStats.averagesByTechnology['Radio']?.upload || 0
                )}
              </div>
            </div>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Cable Modem</h3>
            <div className='grid grid-cols-2'>
              <div>
                ⬇️
                {formatNumber(
                  stats.averagesByTechnology['Cable Modem']?.download || 0
                )}
              </div>
              <div>
                ⬆️
                {formatNumber(
                  stats.averagesByTechnology['Cable Modem']?.upload || 0
                )}
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div>
                ⬇️
                {formatNumber(
                  filteredStats.averagesByTechnology['Cable Modem']?.download ||
                    0
                )}
              </div>
              <div>
                ⬆️
                {formatNumber(
                  filteredStats.averagesByTechnology['Cable Modem']?.upload || 0
                )}
              </div>
            </div>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Fibra</h3>
            <div className='grid grid-cols-2'>
              <div>
                ⬇️
                {formatNumber(
                  stats.averagesByTechnology['Fibra']?.download || 0
                )}
              </div>
              <div>
                ⬆️
                {formatNumber(stats.averagesByTechnology['Fibra']?.upload || 0)}
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div>
                ⬇️
                {formatNumber(
                  filteredStats.averagesByTechnology['Fibra']?.download || 0
                )}
              </div>
              <div>
                ⬆️
                {formatNumber(
                  filteredStats.averagesByTechnology['Fibra']?.upload || 0
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='bg-blue-500 w-1/2 h-1 my-4' />

        <div>
          <h4>Médias de Velocidade por Tecnologia</h4>
          <div className='grid grid-cols-3'>
            <h3 className='text-transparent'>Tipo</h3>
            <h3>Sem Filtro</h3>
            <h3>Com Filtro</h3>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Urbana</h3>
            <div className='grid grid-cols-2'>
              <div>
                ⬇️
                {formatNumber(
                  stats.averagesByLocation['Urbana']?.download || 0
                )}
              </div>
              <div>
                ⬆️
                {formatNumber(stats.averagesByLocation['Urbana']?.upload || 0)}
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div>
                ⬇️
                {formatNumber(
                  filteredStats.averagesByLocation['Urbana']?.download || 0
                )}
              </div>
              <div>
                ⬆️
                {formatNumber(
                  filteredStats.averagesByLocation['Urbana']?.upload || 0
                )}
              </div>
            </div>
          </div>
          <div className='grid grid-cols-3'>
            <h3>Rural</h3>
            <div className='grid grid-cols-2'>
              <div>
                ⬇️
                {formatNumber(stats.averagesByLocation['Rural']?.download || 0)}
              </div>
              <div>
                ⬆️
                {formatNumber(stats.averagesByLocation['Rural']?.upload || 0)}
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div>
                ⬇️
                {formatNumber(
                  filteredStats.averagesByLocation['Rural']?.download || 0
                )}
              </div>
              <div>
                ⬆️
                {formatNumber(
                  filteredStats.averagesByLocation['Rural']?.upload || 0
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
