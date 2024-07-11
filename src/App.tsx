import RouterView from './router'
import Father from './components/Log'

import './App.css'

function App() {
  return (
    <div className="App">
      <header className="header">
        <div>this is header</div>
      </header>
      <RouterView />
      <Father />
    </div>
  )
}

export default App
