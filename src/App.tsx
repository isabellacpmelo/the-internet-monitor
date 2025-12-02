import { FiltersProvider } from './contexts/FiltersContext'
import MainTemplate from './templates/MainTemplate'

function App() {
  return (
    <FiltersProvider>
      <MainTemplate />
    </FiltersProvider>
  )
}

export default App
