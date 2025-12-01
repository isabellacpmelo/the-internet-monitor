export interface InternetData {
  ID: string
  Download: number
  Upload: number
  Dependencia_Adm: string
  Localizacao: string
  Tipo_Tecnologia: string
}

export interface FilterRange {
  min: number
  max: number
}

export interface DatasetFilters {
  downloadRange: FilterRange
  uploadRange: FilterRange
  dependenciaAdm: string[]
  localizacao: string[]
  tipoTecnologia: string[]
}
