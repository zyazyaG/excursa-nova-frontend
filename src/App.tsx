import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import Home from './pages/Home/Home'
import Generate from './pages/Generate/Generate'
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/sign-in" element={ <SignIn />}/>
        <Route path="/sign-up" element={ <SignUp />}/>
        <Route path="/itinerary-generated" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
