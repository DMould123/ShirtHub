import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import CreateShirt from './pages/CreateShirt'
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <Box minH={'100vh'}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateShirt />} />
      </Routes>
    </Box>
  )
}

export default App
