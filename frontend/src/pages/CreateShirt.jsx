import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Heading,
  Checkbox,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { useShirtStore } from '../store/shirt'

const CreateShirt = () => {
  const [shirtData, setShirtData] = useState({
    team: '',
    season: '',
    type: '',
    size: '',
    brand: '',
    player: '',
    playerNumber: '',
    image: '',
    favorite: false,
    notes: ''
  })
  const toast = useToast()
  const createShirt = useShirtStore((state) => state.createShirt) // Access createShirt from useShirtStore

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setShirtData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await createShirt(shirtData)

    if (result.success) {
      toast({
        title: 'Shirt Added!',
        description:
          'Your new football shirt has been added to the collection.',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      setShirtData({
        team: '',
        season: '',
        type: '',
        size: '',
        brand: '',
        player: '',
        playerNumber: '',
        image: '',
        favorite: false,
        notes: ''
      })
    } else {
      toast({
        title: 'Error',
        description: result.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <Container maxW="600px" py={6}>
      <Heading as="h1" mb={6} textAlign="center" fontSize="2xl">
        Add a New Football Shirt
      </Heading>
      <Box
        as="form"
        onSubmit={handleSubmit}
        p={6}
        borderRadius="md"
        boxShadow="lg"
      >
        <VStack spacing={4} align="stretch">
          <FormControl id="team" isRequired>
            <FormLabel>Team Name</FormLabel>
            <Input
              type="text"
              name="team"
              value={shirtData.team}
              onChange={handleChange}
              placeholder="e.g., Manchester United"
            />
          </FormControl>

          <FormControl id="season" isRequired>
            <FormLabel>Season</FormLabel>
            <Input
              type="text"
              name="season"
              value={shirtData.season}
              onChange={handleChange}
              placeholder="e.g., 2023/2024"
            />
          </FormControl>

          <FormControl id="type" isRequired>
            <FormLabel>Shirt Type</FormLabel>
            <Select
              name="type"
              value={shirtData.type}
              onChange={handleChange}
              placeholder="Select shirt type"
            >
              <option value="home">Home</option>
              <option value="away">Away</option>
              <option value="third">Third</option>
            </Select>
          </FormControl>

          <FormControl id="size">
            <FormLabel>Size</FormLabel>
            <Select
              name="size"
              value={shirtData.size}
              onChange={handleChange}
              placeholder="Select size"
            >
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </Select>
          </FormControl>

          <FormControl id="brand">
            <FormLabel>Brand</FormLabel>
            <Input
              type="text"
              name="brand"
              value={shirtData.brand}
              onChange={handleChange}
              placeholder="e.g., Nike"
            />
          </FormControl>

          <FormControl id="player">
            <FormLabel>Player Name</FormLabel>
            <Input
              type="text"
              name="player"
              value={shirtData.player}
              onChange={handleChange}
              placeholder="e.g., Ronaldo"
            />
          </FormControl>

          <FormControl id="playerNumber">
            <FormLabel>Player Number</FormLabel>
            <Input
              type="number"
              name="playerNumber"
              value={shirtData.playerNumber}
              onChange={handleChange}
              placeholder="e.g., 7"
            />
          </FormControl>

          <FormControl id="image" isRequired>
            <FormLabel>Image URL</FormLabel>
            <Input
              type="url"
              name="image"
              value={shirtData.image}
              onChange={handleChange}
              placeholder="URL of the shirt image"
            />
          </FormControl>

          <FormControl id="favorite">
            <Checkbox
              name="favorite"
              isChecked={shirtData.favorite}
              onChange={handleChange}
            >
              Mark as Favorite
            </Checkbox>
          </FormControl>

          <FormControl id="notes">
            <FormLabel>Notes</FormLabel>
            <Textarea
              name="notes"
              value={shirtData.notes}
              onChange={handleChange}
              placeholder="Add any notes about this shirt"
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full" mt={4}>
            Add Shirt
          </Button>
        </VStack>
      </Box>
    </Container>
  )
}

export default CreateShirt
