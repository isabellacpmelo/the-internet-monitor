import { useMemo } from 'react'
import type { InternetData } from '../types/filters'

export interface DatasetStats {
  totalRecords: number
  downloadStats: {
    average: number
    min: number
    max: number
    median: number
  }
  uploadStats: {
    average: number
    min: number
    max: number
    median: number
  }
  technologyCount: Record<string, number>
  locationCount: Record<string, number>
  administrationCount: Record<string, number>
  averagesByTechnology: Record<string, { download: number; upload: number }>
  averagesByLocation: Record<string, { download: number; upload: number }>
  averagesByAdministration: Record<string, { download: number; upload: number }>
}

export function useDatasetStats(data: InternetData[]): DatasetStats {
  return useMemo(() => {
    if (data.length === 0) {
      return {
        totalRecords: 0,
        downloadStats: { average: 0, min: 0, max: 0, median: 0 },
        uploadStats: { average: 0, min: 0, max: 0, median: 0 },
        technologyCount: {},
        locationCount: {},
        administrationCount: {},
        averagesByTechnology: {},
        averagesByLocation: {},
        averagesByAdministration: {},
      }
    }

    // Calcular estatísticas de download
    const downloadValues = data
      .map((item) => item.Download)
      .sort((a, b) => a - b)
    const downloadAverage =
      downloadValues.reduce((sum, val) => sum + val, 0) / downloadValues.length
    const downloadMedian =
      downloadValues.length % 2 === 0
        ? (downloadValues[downloadValues.length / 2 - 1] +
            downloadValues[downloadValues.length / 2]) /
          2
        : downloadValues[Math.floor(downloadValues.length / 2)]

    // Calcular estatísticas de upload
    const uploadValues = data.map((item) => item.Upload).sort((a, b) => a - b)
    const uploadAverage =
      uploadValues.reduce((sum, val) => sum + val, 0) / uploadValues.length
    const uploadMedian =
      uploadValues.length % 2 === 0
        ? (uploadValues[uploadValues.length / 2 - 1] +
            uploadValues[uploadValues.length / 2]) /
          2
        : uploadValues[Math.floor(uploadValues.length / 2)]

    // Contagem por tecnologia
    const technologyCount = data.reduce((acc, item) => {
      acc[item.Tipo_Tecnologia] = (acc[item.Tipo_Tecnologia] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Contagem por localização
    const locationCount = data.reduce((acc, item) => {
      acc[item.Localizacao] = (acc[item.Localizacao] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Contagem por administração
    const administrationCount = data.reduce((acc, item) => {
      acc[item.Dependencia_Adm] = (acc[item.Dependencia_Adm] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Médias por tecnologia
    const techGroups = data.reduce((acc, item) => {
      const tech = item.Tipo_Tecnologia
      if (!acc[tech]) {
        acc[tech] = { downloads: [], uploads: [] }
      }
      acc[tech].downloads.push(item.Download)
      acc[tech].uploads.push(item.Upload)
      return acc
    }, {} as Record<string, { downloads: number[]; uploads: number[] }>)

    const averagesByTechnology = Object.keys(techGroups).reduce((acc, tech) => {
      const downloads = techGroups[tech].downloads
      const uploads = techGroups[tech].uploads
      acc[tech] = {
        download:
          downloads.reduce((sum, val) => sum + val, 0) / downloads.length,
        upload: uploads.reduce((sum, val) => sum + val, 0) / uploads.length,
      }
      return acc
    }, {} as Record<string, { download: number; upload: number }>)

    // Médias por localização
    const locationGroups = data.reduce((acc, item) => {
      const location = item.Localizacao
      if (!acc[location]) {
        acc[location] = { downloads: [], uploads: [] }
      }
      acc[location].downloads.push(item.Download)
      acc[location].uploads.push(item.Upload)
      return acc
    }, {} as Record<string, { downloads: number[]; uploads: number[] }>)

    const averagesByLocation = Object.keys(locationGroups).reduce(
      (acc, location) => {
        const downloads = locationGroups[location].downloads
        const uploads = locationGroups[location].uploads
        acc[location] = {
          download:
            downloads.reduce((sum, val) => sum + val, 0) / downloads.length,
          upload: uploads.reduce((sum, val) => sum + val, 0) / uploads.length,
        }
        return acc
      },
      {} as Record<string, { download: number; upload: number }>
    )

    // Médias por administração
    const administrationGroups = data.reduce((acc, item) => {
      const admin = item.Dependencia_Adm
      if (!acc[admin]) {
        acc[admin] = { downloads: [], uploads: [] }
      }
      acc[admin].downloads.push(item.Download)
      acc[admin].uploads.push(item.Upload)
      return acc
    }, {} as Record<string, { downloads: number[]; uploads: number[] }>)

    const averagesByAdministration = Object.keys(administrationGroups).reduce(
      (acc, admin) => {
        const downloads = administrationGroups[admin].downloads
        const uploads = administrationGroups[admin].uploads
        acc[admin] = {
          download:
            downloads.reduce((sum, val) => sum + val, 0) / downloads.length,
          upload: uploads.reduce((sum, val) => sum + val, 0) / uploads.length,
        }
        return acc
      },
      {} as Record<string, { download: number; upload: number }>
    )

    return {
      totalRecords: data.length,
      downloadStats: {
        average: downloadAverage,
        min: Math.min(...downloadValues),
        max: Math.max(...downloadValues),
        median: downloadMedian,
      },
      uploadStats: {
        average: uploadAverage,
        min: Math.min(...uploadValues),
        max: Math.max(...uploadValues),
        median: uploadMedian,
      },
      technologyCount,
      locationCount,
      administrationCount,
      averagesByTechnology,
      averagesByLocation,
      averagesByAdministration,
    }
  }, [data])
}
