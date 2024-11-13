import { Container, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useShirtStore } from '../store/shirt'
import ShirtCarousel from '../components/ShirtCarousel'
import { useUser } from '@clerk/clerk-react';

const Home = () => {
  const { fetchShirts, shirts } = useShirtStore()
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchShirts(user.id);
    }
  }, [fetchShirts, user])

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={'30'}
          fontWeight={'bold'}
          bgGradient={'linear(to-r, teal.400, green.500)'}
          bgClip={'text'}
          textAlign={'center'}
        >
          Shirt Collection
        </Text>

        {shirts.length > 0 ? (
          <ShirtCarousel shirts={shirts} />
        ) : (
          <Text
            fontSize="xl"
            textAlign={'center'}
            fontWeight="bold"
            color="gray.500"
          >
            No shirts found 😢{' '}
            <Link to={'/create'}>
              <Text
                as="span"
                color="green.500"
                _hover={{ textDecoration: 'underline' }}
              >
                Add a New Shirt
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default Home
