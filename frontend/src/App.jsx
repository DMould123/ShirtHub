import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import CreateShirt from './pages/CreateShirt'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

function App() {
  return (
    <Box minH={'100vh'}>
      <Navbar />
      <SignedIn>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateShirt />} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </Box>
  )
}

export default App
