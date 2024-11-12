import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  IconButton
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaTshirt } from 'react-icons/fa'
import { IoMoon } from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'
import footballShirtIcon from '../assets/football-shirt.png'
import { PlusSquareIcon } from '@chakra-ui/icons'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container maxW="1200px" px={4} py={2}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: 'column', sm: 'row' }}
      >
        <Text
          fontSize={{ base: '22', sm: '28' }}
          fontWeight="extrabold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, teal.400, green.500)"
          bgClip="text"
          lineHeight="1.2"
        >
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            ShirtHub
            <img
              src={footballShirtIcon}
              alt="Football Shirt"
              style={{ marginLeft: '8px', width: '24px', height: '24px' }}
            />
          </Link>
        </Text>

        <HStack spacing={4} alignItems="center">
          <Link to="/create">
            <Button
              leftIcon={<FaTshirt />}
              rightIcon={<PlusSquareIcon />}
              variant="solid"
              colorScheme="teal"
              size="sm"
              fontWeight="bold"
              _hover={{ bg: 'green.400' }}
            >
              Add Shirt
            </Button>
          </Link>

          <Button onClick={toggleColorMode} size="sm" variant="ghost">
            {colorMode === 'light' ? <IoMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar
