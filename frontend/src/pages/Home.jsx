import { Container, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShirtStore } from '../store/shirt';
import ShirtCard from '../components/ShirtCard';
import { useUser } from '@clerk/clerk-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Home = () => {
  const { fetchShirts, shirts } = useShirtStore();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchShirts(user.id);
    }
  }, [fetchShirts, user]);

  console.log('shirts', shirts);

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
       <Swiper
       modules={[Navigation, Pagination, Autoplay]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       pagination={{ clickable: true }}
       autoplay={{ delay: 3000 }}
       loop={true}
       style={{ width: '100%', padding: '20px 0', paddingBottom: '40px' }}
       breakpoints={{
         640: { slidesPerView: 1 },
         768: { slidesPerView: 2 },
         1024: { slidesPerView: 3 },
       }}
     >
       {shirts.map((shirt) => (
         <SwiperSlide
           key={shirt._id}
           style={{
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             height: '100%',
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
            No shirts found 😢{' '}
            <Link to={'/create'}>
              <Text as="span" color="green.500" _hover={{ textDecoration: 'underline' }}>
                Add a New Shirt
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default Home;
