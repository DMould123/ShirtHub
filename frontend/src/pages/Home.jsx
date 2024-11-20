import { Container, Text, VStack, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useShirtStore } from '../store/shirt'
import ShirtCard from '../components/ShirtCard'
import { useUser } from '@clerk/clerk-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

const Home = () => {
  const { fetchShirts, shirts } = useShirtStore()
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadShirts = async () => {
      if (user) {
        try {
          await fetchShirts(user.id)
        } catch (err) {
          setError('Failed to fetch shirts. Please try again later.')
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    loadShirts()
  }, [fetchShirts, user])

  if (loading) {
    return (
      <Container
        maxW="container.xl"
        py={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" color="green.500" />
      </Container>
    )
  }

  if (error) {
    return (
      <Container
        maxW="container.xl"
        py={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="red.500"
          textAlign="center"
        >
          {error}
        </Text>
      </Container>
    )
  }

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
          Shirt Collection 👕
        </Text>

        {shirts.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={15}
            slidesPerView={1} // Default to 1 slide for mobile
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            style={{ width: '100%', padding: '20px 0', paddingBottom: '40px' }}
            breakpoints={{
              700: {
                // For screens 700px and wider
                slidesPerView: 1,
                spaceBetween: 20
              },
              1024: {
                // For screens 1024px and wider
                slidesPerView: 3,
                spaceBetween: 30
              }
            }}
          >
            {shirts.map((shirt) => (
              <SwiperSlide
                key={shirt._id}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <ShirtCard shirt={shirt} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Text
            fontSize="xl"
            textAlign={'center'}
            fontWeight="bold"
            color="gray.500"
          >
            No shirts found
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
