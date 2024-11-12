import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { Box, Flex, Text, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      as="footer"
      py={4}
      bg="gray.800"
      color="white"
      position="relative"
      bottom={0}
      width="100%"
      textAlign="center"
    >
      <Flex justify="center" align="center" direction="column">
        <Flex mb={2}>
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
        <Text fontSize="sm">David Mould 2024 ©</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
