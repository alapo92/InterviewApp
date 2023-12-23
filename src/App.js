import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage.js'
import Signup from './pages/Signup.js'
import Login from './pages/Login.js'
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
        <Route path='/register' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
  )
}

export default App
