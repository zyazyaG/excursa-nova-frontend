import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import Home from './pages/Home/Home'
import Generate from './pages/Generate/Generate'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
