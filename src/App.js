import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage.js'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Homepage />}
        />
        <Route path='/register' element={<Homepage />}/>
        <Route path='/login' element={<Homepage />}/>
      </Routes>
    </div>
  )
}

export default App
