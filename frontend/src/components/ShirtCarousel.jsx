import React, { useState } from 'react';
import { Box, IconButton, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import ShirtCard from './ShirtCard';

const MotionFlex = motion(Flex);

const ShirtCarousel = ({ shirts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;

  const handleNext = () => {
    if (currentIndex < shirts.length - itemsToShow) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Calculate the visible shirts based on the current index
  const visibleShirts = shirts.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <Box position="relative" overflow="hidden">
      <MotionFlex
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
        }}
      >
        {visibleShirts.map((shirt) => (
          <Box key={shirt._id} width={`${100 / itemsToShow}%`} p={2}>
            <ShirtCard shirt={shirt} />
          </Box>
        ))}
      </MotionFlex>

      <IconButton
        icon={<ChevronLeftIcon />}
        onClick={handlePrev}
        position="absolute"
        left={0}
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
        isDisabled={currentIndex === 0}
      />
      <IconButton
        icon={<ChevronRightIcon />}
        onClick={handleNext}
        position="absolute"
        right={0}
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
        isDisabled={currentIndex >= shirts.length - itemsToShow}
      />
    </Box>
  );
};

export default ShirtCarousel;
