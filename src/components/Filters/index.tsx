/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'
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
    getFilterOptions,
  } = useFilters()

  const [downloadMin, setDownloadMin] = useState(0)
  const [downloadMax, setDownloadMax] = useState(1000)
  const [uploadMin, setUploadMin] = useState(0)
  const [uploadMax, setUploadMax] = useState(100)

  const options = getFilterOptions(data)

  useEffect(() => {
    if (data.length > 0) {
      setDownloadMin(options.downloadRange.min)
      setDownloadMax(options.downloadRange.max)
      setUploadMin(options.uploadRange.min)
      setUploadMax(options.uploadRange.max)

      setDownloadRange({
        min: options.downloadRange.min,
        max: options.downloadRange.max,
      })
      setUploadRange({
        min: options.uploadRange.min,
        max: options.uploadRange.max,
      })
    }
  }, [data, options, setDownloadRange, setUploadRange])

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
        <div>
          <div>
            <input
              type='number'
              value={downloadMin}
              min={options.downloadRange.min}
              max={options.downloadRange.max}
              onChange={(e) => {
                const value = Number(e.target.value)
                setDownloadMin(value)
                setDownloadRange({ min: value, max: downloadMax })
              }}
              placeholder='Mín'
            />
            <span>-</span>
            <input
              type='number'
              value={downloadMax}
              min={options.downloadRange.min}
              max={options.downloadRange.max}
              onChange={(e) => {
                const value = Number(e.target.value)
                setDownloadMax(value)
                setDownloadRange({ min: downloadMin, max: value })
              }}
              placeholder='Máx'
            />
          </div>
          <span>
            ({options.downloadRange.min.toFixed(1)} -{' '}
            {options.downloadRange.max.toFixed(1)} Mbps)
          </span>
        </div>
      </div>

      <div>
        <label>Range de Upload (Mbps):</label>
        <div>
          <div>
            <input
              type='number'
              value={uploadMin}
              min={options.uploadRange.min}
              max={options.uploadRange.max}
              onChange={(e) => {
                const value = Number(e.target.value)
                setUploadMin(value)
                setUploadRange({ min: value, max: uploadMax })
              }}
              placeholder='Mín'
            />
            <span>-</span>
            <input
              type='number'
              value={uploadMax}
              min={options.uploadRange.min}
              max={options.uploadRange.max}
              onChange={(e) => {
                const value = Number(e.target.value)
                setUploadMax(value)
                setUploadRange({ min: uploadMin, max: value })
              }}
              placeholder='Máx'
            />
          </div>
          <span>
            ({options.uploadRange.min.toFixed(1)} -{' '}
            {options.uploadRange.max.toFixed(1)} Mbps)
          </span>
        </div>
      </div>

      <div>
        <label>Tipo de Administração:</label>
        <div>
          {options.dependenciaAdmOptions.map((option) => (
            <label key={option}>
              <input
                type='checkbox'
                checked={filters.dependenciaAdm.includes(option)}
                onChange={(e) =>
                  handleDependenciaAdmChange(option, e.target.checked)
                }
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label>Localização:</label>
        <div>
          {options.localizacaoOptions.map((option) => (
            <label key={option}>
              <input
                type='checkbox'
                checked={filters.localizacao.includes(option)}
                onChange={(e) =>
                  handleLocalizacaoChange(option, e.target.checked)
                }
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label>Tipo de Tecnologia:</label>
        <div>
          {options.tipoTecnologiaOptions.map((option) => (
            <label key={option}>
              <input
                type='checkbox'
                checked={filters.tipoTecnologia.includes(option)}
                onChange={(e) =>
                  handleTipoTecnologiaChange(option, e.target.checked)
                }
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <button type='button' onClick={resetFilters}>
        Limpar Filtros
      </button>
    </div>
  )
}
