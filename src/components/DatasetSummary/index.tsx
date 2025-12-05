import { useDatasetStats } from '../../hooks/DatasetStats'
import type { InternetData } from '../../types/filters'
import './syle.css'

interface DatasetSummaryProps {
  data: InternetData[]
  title?: string
}

export function DatasetSummary({ data }: DatasetSummaryProps) {
  const stats = useDatasetStats(data)

  const formatNumber = (num: number) => num.toFixed(2)
  const formatPercent = (value: number, total: number) =>
    ((value / total) * 100).toFixed(1)

  return (
    <div>
      <div className='max-w-4xl'>
        <div>
          <h2>
            <i className='bi bi-file-earmark-text mr-2' />
            Resumo dos dados
          </h2>

          <div className='summary-container mt-6'>
            <h4 className='text-lg font-semibold mb-3 text-gray-800'>
              <i className='bi bi-database mr-2' />
              Total de Registros: {stats.totalRecords}
            </h4>
          </div>

          <div className='summary-container'>
            <h4 className='text-lg font-semibold mb-3 text-gray-800'>
              <i className='bi bi-download mr-2' />
              Velocidade Download (Mbps)
            </h4>
            <div className='grid grid-cols-3 gap-4 p-4  rounded-lg'>
              <div className='text-center'>
                <p className='text-sm text-gray-600'>Média</p>
                <p className='text-xl font-bold text-blue-600'>
                  {formatNumber(stats.downloadStats.average)}
                </p>
              </div>
              <div className='text-center'>
                <p className='text-sm text-gray-600'>Máximo</p>
                <p className='text-xl font-bold text-green-600'>
                  {formatNumber(stats.downloadStats.max)}
                </p>
              </div>
              <div className='text-center'>
                <p className='text-sm text-gray-600'>Mínimo</p>
                <p className='text-xl font-bold text-orange-600'>
                  {formatNumber(stats.downloadStats.min)}
                </p>
              </div>
            </div>
          </div>

          <div className='summary-container'>
            <h4 className='text-lg font-semibold mb-3 text-gray-800'>
              <i className='bi bi-upload mr-2' />
              Velocidade Upload (Mbps)
            </h4>
            <div className='grid grid-cols-3 gap-4 p-4 rounded-lg'>
              <div className='text-center'>
                <p className='text-sm text-gray-600'>Média</p>
                <p className='text-xl font-bold text-blue-600'>
                  {formatNumber(stats.uploadStats.average)}
                </p>
              </div>
              <div className='text-center'>
                <p className='text-sm text-gray-600'>Máximo</p>
                <p className='text-xl font-bold text-green-600'>
                  {formatNumber(stats.uploadStats.max)}
                </p>
              </div>
              <div className='text-center'>
                <p className='text-sm text-gray-600'>Mínimo</p>
                <p className='text-xl font-bold text-orange-600'>
                  {formatNumber(stats.uploadStats.min)}
                </p>
              </div>
            </div>
          </div>
          <div className='summary-container'>
            <h4 className='text-lg font-semibold mb-3 text-gray-800'>
              <i className='bi bi-router mr-2' />
              Distribuição por Tecnologia
            </h4>
            <div className='grid grid-cols-2 gap-3'>
              <div className='p-3'>
                <p className='text-sm text-gray-600'>Fibra</p>
                <p className='text-lg font-bold text-purple-600'>
                  {stats.technologyCount['Fibra'] || 0} (
                  {formatPercent(
                    stats.technologyCount['Fibra'] || 0,
                    stats.totalRecords
                  )}
                  %)
                </p>
              </div>
              <div className='p-3'>
                <p className='text-sm text-gray-600'>Rádio</p>
                <p className='text-lg font-bold text-blue-600'>
                  {stats.technologyCount['Radio'] || 0} (
                  {formatPercent(
                    stats.technologyCount['Radio'] || 0,
                    stats.totalRecords
                  )}
                  %)
                </p>
              </div>
              <div className='p-3'>
                <p className='text-sm text-gray-600'>Cable Modem</p>
                <p className='text-lg font-bold text-green-600'>
                  {stats.technologyCount['Cable Modem'] || 0} (
                  {formatPercent(
                    stats.technologyCount['Cable Modem'] || 0,
                    stats.totalRecords
                  )}
                  %)
                </p>
              </div>
              <div className='p-3 '>
                <p className='text-sm text-gray-600'>Satélite</p>
                <p className='text-lg font-bold text-orange-600'>
                  {stats.technologyCount['Satelite'] || 0} (
                  {formatPercent(
                    stats.technologyCount['Satelite'] || 0,
                    stats.totalRecords
                  )}
                  %)
                </p>
              </div>
            </div>
          </div>
          <div className='summary-container'>
            <h4 className='text-lg font-semibold mb-3 text-gray-800'>
              <i className='bi bi-geo-alt mr-2' />
              Distribuição por Localização
            </h4>
            <div className='grid grid-cols-2 gap-4'>
              <div className='p-4'>
                <p className='text-sm text-gray-600'>Urbana</p>
                <p className='text-xl font-bold text-emerald-600'>
                  {stats.locationCount['Urbana'] || 0} (
                  {formatPercent(
                    stats.locationCount['Urbana'] || 0,
                    stats.totalRecords
                  )}
                  %)
                </p>
              </div>
              <div className='p-4'>
                <p className='text-sm text-gray-600'>Rural</p>
                <p className='text-xl font-bold text-amber-600'>
                  {stats.locationCount['Rural'] || 0} (
                  {formatPercent(
                    stats.locationCount['Rural'] || 0,
                    stats.totalRecords
                  )}
                  %)
                </p>
              </div>
            </div>
          </div>
          <div className='summary-container'>
            <h4 className='text-lg font-semibold mb-3 text-gray-800'>
              <i className='bi bi-building mr-2' />
              Distribuição por Administração
            </h4>
            <div className='grid grid-cols-3 gap-3'>
              <div className='p-3'>
                <p className='text-sm text-gray-600'>Municipal</p>
                <p className='text-lg font-bold text-red-600'>
                  {stats.administrationCount['Municipal'] || 0} (
                  {formatPercent(
                    stats.administrationCount['Municipal'] || 0,
                    stats.totalRecords
                  )}
                  %)
                </p>
              </div>
              <div className='p-3'>
                <p className='text-sm text-gray-600'>Estadual</p>
                <p className='text-lg font-bold text-blue-600'>
                  {stats.administrationCount['Estadual'] || 0} (
                  {formatPercent(
                    stats.administrationCount['Estadual'] || 0,
                    stats.totalRecords
                  )}
                  %)
                </p>
              </div>
              <div className='p-3'>
                <p className='text-sm text-gray-600'>Federal</p>
                <p className='text-lg font-bold text-indigo-600'>
                  {stats.administrationCount['Federal'] || 0} (
                  {formatPercent(
                    stats.administrationCount['Federal'] || 0,
                    stats.totalRecords
                  )}
                  %)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className='text-xl font-bold mb-4 text-gray-800'>
            <i className='bi bi-pc-display mr-2' />
            Médias de Velocidade por Tecnologia
          </h2>

          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
            {Object.entries(stats.averagesByTechnology).map(
              ([tech, speeds]) => (
                <div key={tech} className='p-4 rounded-lg border'>
                  <h5 className='font-semibold text-gray-800 mb-3'>{tech}</h5>
                  <div className='space-y-2'>
                    <div>
                      <p className='text-xs text-gray-500'>Download</p>
                      <p className='text-lg font-bold text-blue-600'>
                        {speeds?.download
                          ? formatNumber(speeds.download)
                          : '0.00'}{' '}
                        Mbps
                      </p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500'>Upload</p>
                      <p className='text-lg font-bold text-green-600'>
                        {speeds?.upload ? formatNumber(speeds.upload) : '0.00'}{' '}
                        Mbps
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div>
          <h2 className='text-xl font-bold mb-4 text-gray-800'>
            <i className='bi bi-geo mr-2' />
            Médias de Velocidade por Localização
          </h2>
          <div className='grid grid-cols-2 gap-6'>
            {Object.entries(stats.averagesByLocation).map(
              ([location, speeds]) => (
                <div key={location} className='p-6 border shadow-sm'>
                  <h5 className='font-semibold text-gray-800 mb-4 flex items-center'>
                    <i
                      className={`bi ${
                        location === 'Urbana' ? 'bi-buildings' : 'bi-tree'
                      } mr-2`}
                    />
                    {location}
                  </h5>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='text-center'>
                      <p className='text-sm text-gray-500 mb-1'>Download</p>
                      <p className='text-2xl font-bold text-blue-600'>
                        {speeds?.download
                          ? formatNumber(speeds.download)
                          : '0.00'}
                      </p>
                      <p className='text-xs text-gray-400'>Mbps</p>
                    </div>
                    <div className='text-center'>
                      <p className='text-sm text-gray-500 mb-1'>Upload</p>
                      <p className='text-2xl font-bold text-green-600'>
                        {speeds?.upload ? formatNumber(speeds.upload) : '0.00'}
                      </p>
                      <p className='text-xs text-gray-400'>Mbps</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
