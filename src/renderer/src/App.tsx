import HighlightList from './components/highlight-list'
import Search from './components/search'

function App(): JSX.Element {
  return (
    <div className="h-screen flex items-start justify-center py-5">
      <div className="container">
        <div className="flex gap-[50px] relative">
          <HighlightList />
          <Search />
        </div>
      </div>
    </div>
  )
}

export default App
