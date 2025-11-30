import { useDatasetCsv } from './hooks/useDatasetCsv'

function App() {
  const datasetFilePath = '/src/assets/csv/internet-dataset.csv'
  const { data, loading, error } = useDatasetCsv(datasetFilePath)

  if (loading) {
    return <div>Carregando dados...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='p-4'>
      <h1 className='text-2xl'>Welcome to the internet monitor :)</h1>
      <p>Total de linhas do csv: {data.length}</p>
      <div>
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
            {data.map((row, idx) => {
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
      </div>
    </div>
  )
}

export default App
