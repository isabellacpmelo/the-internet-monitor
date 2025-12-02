import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type {
  DatasetFilters,
  FilterOptions,
  FilterRange,
  InternetData,
} from '../types/filters'

interface FiltersContextType {
  filters: DatasetFilters
  setDownloadRange: (range: FilterRange) => void
  setUploadRange: (range: FilterRange) => void
  setDependenciaAdm: (values: string[]) => void
  setLocalizacao: (values: string[]) => void
  setTipoTecnologia: (values: string[]) => void
  resetFilters: () => void
  applyFilters: (data: InternetData[]) => InternetData[]
  getFilterOptions: (data: InternetData[]) => FilterOptions
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined)

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<DatasetFilters>({
    downloadRange: { min: 0, max: Infinity },
    uploadRange: { min: 0, max: Infinity },
    dependenciaAdm: [],
    localizacao: [],
    tipoTecnologia: [],
  })

  const setDownloadRange = (range: FilterRange) => {
    setFilters((prev) => ({ ...prev, downloadRange: range }))
  }

  const setUploadRange = (range: FilterRange) => {
    setFilters((prev) => ({ ...prev, uploadRange: range }))
  }

  const setDependenciaAdm = (values: string[]) => {
    setFilters((prev) => ({ ...prev, dependenciaAdm: values }))
  }

  const setLocalizacao = (values: string[]) => {
    setFilters((prev) => ({ ...prev, localizacao: values }))
  }

  const setTipoTecnologia = (values: string[]) => {
    setFilters((prev) => ({ ...prev, tipoTecnologia: values }))
  }

  const resetFilters = () => {
    setFilters({
      downloadRange: { min: 0, max: Infinity },
      uploadRange: { min: 0, max: Infinity },
      dependenciaAdm: [],
      localizacao: [],
      tipoTecnologia: [],
    })
  }

  const applyFilters = useMemo(() => {
    return (data: InternetData[]): InternetData[] => {
      return data.filter((item) => {
        if (
          item.Download < filters.downloadRange.min ||
          item.Download > filters.downloadRange.max
        ) {
          return false
        }

        if (
          item.Upload < filters.uploadRange.min ||
          item.Upload > filters.uploadRange.max
        ) {
          return false
        }

        if (
          filters.dependenciaAdm.length > 0 &&
          !filters.dependenciaAdm.includes(item.Dependencia_Adm)
        ) {
          return false
        }

        if (
          filters.localizacao.length > 0 &&
          !filters.localizacao.includes(item.Localizacao)
        ) {
          return false
        }

        if (
          filters.tipoTecnologia.length > 0 &&
          !filters.tipoTecnologia.includes(item.Tipo_Tecnologia)
        ) {
          return false
        }

        return true
      })
    }
  }, [filters])

  const getFilterOptions = (data: InternetData[]): FilterOptions => {
    if (data.length === 0) {
      return {
        downloadRange: { min: 0, max: 0 },
        uploadRange: { min: 0, max: 0 },
        dependenciaAdmOptions: [],
        localizacaoOptions: [],
        tipoTecnologiaOptions: [],
      }
    }

    const downloadValues = data.map((item) => item.Download)
    const uploadValues = data.map((item) => item.Upload)

    return {
      downloadRange: {
        min: Math.min(...downloadValues),
        max: Math.max(...downloadValues),
      },
      uploadRange: {
        min: Math.min(...uploadValues),
        max: Math.max(...uploadValues),
      },
      dependenciaAdmOptions: [
        ...new Set(data.map((item) => item.Dependencia_Adm)),
      ].sort(),
      localizacaoOptions: [
        ...new Set(data.map((item) => item.Localizacao)),
      ].sort(),
      tipoTecnologiaOptions: [
        ...new Set(data.map((item) => item.Tipo_Tecnologia)),
      ].sort(),
    }
  }

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setDownloadRange,
        setUploadRange,
        setDependenciaAdm,
        setLocalizacao,
        setTipoTecnologia,
        resetFilters,
        applyFilters,
        getFilterOptions,
      }}>
      {children}
    </FiltersContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFilters = () => {
  const context = useContext(FiltersContext)
  if (!context) {
    throw new Error('UseFilters needs FiltersProvider')
  }

  return context
}
