import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home'

function RouterView() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterView
