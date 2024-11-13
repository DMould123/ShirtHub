import React from 'react';
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
        <Stack direction="row" spacing={3} align="center" mb={{ base: 4, md: 0 }}>
          <Image src={footballShirtIcon} alt="Football Shirt Icon" boxSize="50px" />
          <Text fontSize="lg" fontWeight="bold">ShirtHub</Text>
        </Stack>

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
