import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { Box, Flex, Text, Link, Image, Stack } from '@chakra-ui/react';
import footballShirtIcon from '../assets/football-shirt.png';

const Footer = () => {
  return (
    <Box
      as="footer"
      py={6}
      px={8}
      bg="gray.800"
      color="white"
      width="100%"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="6xl"
        mx="auto"
        textAlign={{ base: "center", md: "left" }}
      >
        {/* Logo and Title */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none' }}>
          <Image src={footballShirtIcon} alt="Football Shirt Icon"  style={{ marginLeft: '8px', width: '24px', height: '24px' }} />
          <Text
            fontSize={{ base: '22', sm: '28' }}
            fontWeight="extrabold"
            textTransform="uppercase"
            ml={2}
            bgGradient="linear(to-r, teal.400, green.500)"
            bgClip="text"
          >
            ShirtHub
          </Text>
        </Link>

        <Text fontSize="lg">© 2024 ShirtHub. All rights reserved</Text>

        {/* Social Links */}
        <Flex justify="center" mb={{ base: 4, md: 0 }}>
          <Link
            href="https://www.linkedin.com/in/david-mould-b6731a21/"
            isExternal
            mx={2}
            _hover={{ color: 'teal.400' }}
          >
            <FaLinkedin size={24} />
          </Link>
          <Link
            href="https://twitter.com/DM12_51"
            isExternal
            mx={2}
            _hover={{ color: 'teal.400' }}
          >
            <FaTwitter size={24} />
          </Link>
          <Link
            href="https://github.com/DMould123"
            isExternal
            mx={2}
            _hover={{ color: 'teal.400' }}
          >
            <FaGithub size={24} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
