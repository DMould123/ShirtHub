import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import CreateShirt from './pages/CreateShirt'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Footer from './components/Footer';

function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box flex="1">
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
      <Footer />
    </Box>
  )
}

export default App
