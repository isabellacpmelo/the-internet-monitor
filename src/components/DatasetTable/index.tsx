import type { InternetData } from '../../hooks/useDatasetCsv'

interface DatasetTableProps {
  dataset: InternetData[]
}

export function DatasetTable({ dataset }: DatasetTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Download</th>
          <th>Upload</th>
          <th>Dependencia Adm</th>
          <th>Localização</th>
          <th>Tipo de tecnologia</th>
        </tr>
      </thead>
      <tbody>
        {dataset.map((row, idx) => {
          return (
            <tr key={idx}>
              <td>{row.ID}</td>
              <td>{row.Download}</td>
              <td>{row.Upload}</td>
              <td>{row.Dependencia_Adm}</td>
              <td>{row.Localizacao}</td>
              <td>{row.Tipo_Tecnologia}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
