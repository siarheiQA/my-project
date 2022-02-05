import { Adminka, App } from 'components'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import './models/init'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="adminka" element={<Adminka />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
