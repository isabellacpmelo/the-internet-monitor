import { useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'
import type { DatasetFilters, FilterRange } from '../types/filters'

const PARAM_KEYS = {
  DOWNLOAD_MIN: 'downloadMin',
  DOWNLOAD_MAX: 'downloadMax',
  UPLOAD_MIN: 'uploadMin',
  UPLOAD_MAX: 'uploadMax',
  DEPENDENCIA_ADM: 'dependenciaAdm',
  LOCALIZACAO: 'localizacao',
  TIPO_TECNOLOGIA: 'tipoTecnologia',
} as const

export function useUrlFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const getFiltersFromUrl = useCallback(
    (defaultFilters: DatasetFilters): DatasetFilters => {
      const downloadMin = searchParams.get(PARAM_KEYS.DOWNLOAD_MIN)
      const downloadMax = searchParams.get(PARAM_KEYS.DOWNLOAD_MAX)
      const uploadMin = searchParams.get(PARAM_KEYS.UPLOAD_MIN)
      const uploadMax = searchParams.get(PARAM_KEYS.UPLOAD_MAX)
      const dependenciaAdm = searchParams.get(PARAM_KEYS.DEPENDENCIA_ADM)
      const localizacao = searchParams.get(PARAM_KEYS.LOCALIZACAO)
      const tipoTecnologia = searchParams.get(PARAM_KEYS.TIPO_TECNOLOGIA)

      const result = {
        downloadRange: {
          min:
            downloadMin && !isNaN(parseFloat(downloadMin))
              ? parseFloat(downloadMin)
              : defaultFilters.downloadRange.min,
          max:
            downloadMax && !isNaN(parseFloat(downloadMax))
              ? parseFloat(downloadMax)
              : defaultFilters.downloadRange.max,
        },
        uploadRange: {
          min:
            uploadMin && !isNaN(parseFloat(uploadMin))
              ? parseFloat(uploadMin)
              : defaultFilters.uploadRange.min,
          max:
            uploadMax && !isNaN(parseFloat(uploadMax))
              ? parseFloat(uploadMax)
              : defaultFilters.uploadRange.max,
        },
        dependenciaAdm: dependenciaAdm
          ? dependenciaAdm.split(',').filter(Boolean)
          : defaultFilters.dependenciaAdm,
        localizacao: localizacao
          ? localizacao.split(',').filter(Boolean)
          : defaultFilters.localizacao,
        tipoTecnologia: tipoTecnologia
          ? tipoTecnologia.split(',').filter(Boolean)
          : defaultFilters.tipoTecnologia,
      }

      return result
    },
    [searchParams]
  )

  const updateUrlFilters = useCallback(
    (filters: DatasetFilters) => {
      const newParams = new URLSearchParams()

      if (
        filters.downloadRange.min !== 0 ||
        filters.downloadRange.max !== Infinity
      ) {
        if (filters.downloadRange.min !== 0) {
          newParams.set(
            PARAM_KEYS.DOWNLOAD_MIN,
            filters.downloadRange.min.toString()
          )
        }
        if (filters.downloadRange.max !== Infinity) {
          newParams.set(
            PARAM_KEYS.DOWNLOAD_MAX,
            filters.downloadRange.max.toString()
          )
        }
      }

      if (
        filters.uploadRange.min !== 0 ||
        filters.uploadRange.max !== Infinity
      ) {
        if (filters.uploadRange.min !== 0) {
          newParams.set(
            PARAM_KEYS.UPLOAD_MIN,
            filters.uploadRange.min.toString()
          )
        }
        if (filters.uploadRange.max !== Infinity) {
          newParams.set(
            PARAM_KEYS.UPLOAD_MAX,
            filters.uploadRange.max.toString()
          )
        }
      }

      if (filters.dependenciaAdm.length > 0) {
        newParams.set(
          PARAM_KEYS.DEPENDENCIA_ADM,
          filters.dependenciaAdm.join(',')
        )
      }

      if (filters.localizacao.length > 0) {
        newParams.set(PARAM_KEYS.LOCALIZACAO, filters.localizacao.join(','))
      }

      if (filters.tipoTecnologia.length > 0) {
        newParams.set(
          PARAM_KEYS.TIPO_TECNOLOGIA,
          filters.tipoTecnologia.join(',')
        )
      }

      setSearchParams(newParams, { replace: true })
    },
    [setSearchParams]
  )

  const clearUrlFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true })
  }, [setSearchParams])

  const updateDownloadRange = useCallback(
    (range: FilterRange) => {
      const current = new URLSearchParams(searchParams)

      if (range.min === 0) {
        current.delete(PARAM_KEYS.DOWNLOAD_MIN)
      } else {
        current.set(PARAM_KEYS.DOWNLOAD_MIN, range.min.toString())
      }

      if (range.max === Infinity) {
        current.delete(PARAM_KEYS.DOWNLOAD_MAX)
      } else {
        current.set(PARAM_KEYS.DOWNLOAD_MAX, range.max.toString())
      }

      setSearchParams(current, { replace: true })
    },
    [searchParams, setSearchParams]
  )

  const updateUploadRange = useCallback(
    (range: FilterRange) => {
      const current = new URLSearchParams(searchParams)

      if (range.min === 0) {
        current.delete(PARAM_KEYS.UPLOAD_MIN)
      } else {
        current.set(PARAM_KEYS.UPLOAD_MIN, range.min.toString())
      }

      if (range.max === Infinity) {
        current.delete(PARAM_KEYS.UPLOAD_MAX)
      } else {
        current.set(PARAM_KEYS.UPLOAD_MAX, range.max.toString())
      }

      setSearchParams(current, { replace: true })
    },
    [searchParams, setSearchParams]
  )

  const updateStringArrayFilter = useCallback(
    (key: string, values: string[]) => {
      const current = new URLSearchParams(searchParams)

      if (values.length === 0) {
        current.delete(key)
      } else {
        current.set(key, values.join(','))
      }

      setSearchParams(current, { replace: true })
    },
    [searchParams, setSearchParams]
  )

  const updateDependenciaAdm = useCallback(
    (values: string[]) => {
      updateStringArrayFilter(PARAM_KEYS.DEPENDENCIA_ADM, values)
    },
    [updateStringArrayFilter]
  )

  const updateLocalizacao = useCallback(
    (values: string[]) => {
      updateStringArrayFilter(PARAM_KEYS.LOCALIZACAO, values)
    },
    [updateStringArrayFilter]
  )

  const updateTipoTecnologia = useCallback(
    (values: string[]) => {
      updateStringArrayFilter(PARAM_KEYS.TIPO_TECNOLOGIA, values)
    },
    [updateStringArrayFilter]
  )

  return {
    getFiltersFromUrl,
    updateUrlFilters,
    clearUrlFilters,
    updateDownloadRange,
    updateUploadRange,
    updateDependenciaAdm,
    updateLocalizacao,
    updateTipoTecnologia,
  }
}
