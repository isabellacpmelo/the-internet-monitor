import { useMemo, useEffect, useRef } from 'react'
import { useFilters } from '../../contexts/FiltersContext'
import type { InternetData } from '../../types/filters'
import './style.css'

interface FiltersProps {
  data: InternetData[]
}

export function Filters({ data }: FiltersProps) {
  const {
    filters,
    setDownloadRange,
    setUploadRange,
    setDependenciaAdm,
    setLocalizacao,
    setTipoTecnologia,
    resetFilters,
    initializeFilters,
    getFilterOptions,
  } = useFilters()

  const options = useMemo(
    () => getFilterOptions(data),
    [data, getFilterOptions]
  )
  const isInitialized = useRef(false)

  useEffect(() => {
    if (data.length > 0 && !isInitialized.current) {
      initializeFilters(data)
      isInitialized.current = true
    }
  }, [data, initializeFilters])

  const downloadMin = data.length > 0 ? filters.downloadRange.min : 0
  const downloadMax = data.length > 0 ? filters.downloadRange.max : 1000
  const uploadMin = data.length > 0 ? filters.uploadRange.min : 0
  const uploadMax = data.length > 0 ? filters.uploadRange.max : 100

  const handleDependenciaAdmChange = (value: string, checked: boolean) => {
    if (checked) {
      setDependenciaAdm([...filters.dependenciaAdm, value])
    } else {
      setDependenciaAdm(filters.dependenciaAdm.filter((item) => item !== value))
    }
  }

  const handleLocalizacaoChange = (value: string, checked: boolean) => {
    if (checked) {
      setLocalizacao([...filters.localizacao, value])
    } else {
      setLocalizacao(filters.localizacao.filter((item) => item !== value))
    }
  }

  const handleTipoTecnologiaChange = (value: string, checked: boolean) => {
    if (checked) {
      setTipoTecnologia([...filters.tipoTecnologia, value])
    } else {
      setTipoTecnologia(filters.tipoTecnologia.filter((item) => item !== value))
    }
  }

  return (
    <div>
      <h4>Filtros</h4>

      <div>
        <label>Range de Download (Mbps):</label>
        <div className='range-container'>
          <div className='range-values'>
            <span className='range-value'>{downloadMin.toFixed(1)}</span>
            <span className='range-separator'>-</span>
            <span className='range-value'>{downloadMax.toFixed(1)}</span>
          </div>
          <div className='dual-range-wrapper'>
            <input
              type='range'
              min={options.downloadRange.min}
              max={options.downloadRange.max}
              step='0.1'
              value={downloadMin}
              onChange={(e) => {
                const value = Number(e.target.value)
                if (value <= downloadMax) {
                  setDownloadRange({ min: value, max: downloadMax })
                }
              }}
              className='range-slider range-slider-min'
            />
            <input
              type='range'
              min={options.downloadRange.min}
              max={options.downloadRange.max}
              step='0.1'
              value={downloadMax}
              onChange={(e) => {
                const value = Number(e.target.value)
                if (value >= downloadMin) {
                  setDownloadRange({ min: downloadMin, max: value })
                }
              }}
              className='range-slider range-slider-max'
            />
          </div>
          <span className='range-info'>
            ({options.downloadRange.min.toFixed(1)} -{' '}
            {options.downloadRange.max.toFixed(1)} Mbps)
          </span>
        </div>
      </div>

      <div>
        <label>Range de Upload (Mbps):</label>
        <div className='range-container'>
          <div className='range-values'>
            <span className='range-value'>{uploadMin.toFixed(1)}</span>
            <span className='range-separator'>-</span>
            <span className='range-value'>{uploadMax.toFixed(1)}</span>
          </div>
          <div className='dual-range-wrapper'>
            <input
              type='range'
              min={options.uploadRange.min}
              max={options.uploadRange.max}
              step='0.1'
              value={uploadMin}
              onChange={(e) => {
                const value = Number(e.target.value)
                if (value <= uploadMax) {
                  setUploadRange({ min: value, max: uploadMax })
                }
              }}
              className='range-slider range-slider-min'
            />
            <input
              type='range'
              min={options.uploadRange.min}
              max={options.uploadRange.max}
              step='0.1'
              value={uploadMax}
              onChange={(e) => {
                const value = Number(e.target.value)
                if (value >= uploadMin) {
                  setUploadRange({ min: uploadMin, max: value })
                }
              }}
              className='range-slider range-slider-max'
            />
          </div>
          <span className='range-info'>
            ({options.uploadRange.min.toFixed(1)} -{' '}
            {options.uploadRange.max.toFixed(1)} Mbps)
          </span>
        </div>
      </div>

      <div>
        <label>Tipo de Administração:</label>
        <div className='checkbox-group'>
          {options.dependenciaAdmOptions.map((option) => (
            <label key={option} className='checkbox-label'>
              <input
                type='checkbox'
                checked={filters.dependenciaAdm.includes(option)}
                onChange={(e) =>
                  handleDependenciaAdmChange(option, e.target.checked)
                }
                className='checkbox-input'
              />
              <span className='checkbox-text'>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label>Localização:</label>
        <div className='checkbox-group'>
          {options.localizacaoOptions.map((option) => (
            <label key={option} className='checkbox-label'>
              <input
                type='checkbox'
                checked={filters.localizacao.includes(option)}
                onChange={(e) =>
                  handleLocalizacaoChange(option, e.target.checked)
                }
                className='checkbox-input'
              />
              <span className='checkbox-text'>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label>Tipo de Tecnologia:</label>
        <div className='checkbox-group'>
          {options.tipoTecnologiaOptions.map((option) => (
            <label key={option} className='checkbox-label'>
              <input
                type='checkbox'
                checked={filters.tipoTecnologia.includes(option)}
                onChange={(e) =>
                  handleTipoTecnologiaChange(option, e.target.checked)
                }
                className='checkbox-input'
              />
              <span className='checkbox-text'>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <button type='button' onClick={resetFilters} className='reset-button'>
        Limpar Filtros
      </button>
    </div>
  )
}
