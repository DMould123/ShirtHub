import {
	Box,
	Button,
	IconButton,
	Image,
	Heading,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
	Collapse,
	Divider,
	Tooltip,
	Checkbox,
	FormControl,
	FormLabel,
	Input,
	Select,
	Textarea,
	Spacer,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ChevronDownIcon, ChevronUpIcon, StarIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useShirtStore } from '../store/shirt';

const ShirtCard = ({ shirt }) => {
	const [showDetails, setShowDetails] = useState(false);
	const [showFrontImage, setShowFrontImage] = useState(true);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const { deleteShirt, updateShirt } = useShirtStore();

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const [updatedShirtData, setUpdatedShirtData] = useState(shirt);

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setUpdatedShirtData((prevData) => ({
			...prevData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleDeleteShirt = async (sid) => {
		const result = await deleteShirt(sid);
		toast({
			title: result.success ? "Deleted" : "Error",
			description: result.message,
			status: result.success ? "success" : "error",
			duration: 3000,
			isClosable: true,
		});
	};

	const handleUpdateShirt = async () => {
		const result = await updateShirt(shirt._id, updatedShirtData);
		toast({
			title: result.success ? "Updated" : "Error",
			description: result.message,
			status: result.success ? "success" : "error",
			duration: 3000,
			isClosable: true,
		});
		onClose();
	};

	return (
		<Box shadow='lg' rounded='lg' overflow='hidden' bg={bg} transition='all 0.3s' _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }} borderWidth="1px" borderColor="gray.200" p={4}>

			{/* Shirt Type Display */}
			<Text fontWeight="bold" color="teal.500" textAlign="center" fontSize="lg" mb={2}>{shirt.type}</Text>

			{/* Image Flip Section */}
			<Box onClick={() => setShowFrontImage(!showFrontImage)} cursor="pointer" mb={4} textAlign="center">
				<Image src={showFrontImage ? shirt.image : shirt.backImage} alt={showFrontImage ? `${shirt.team} Front` : `${shirt.team} Back`} h={80} w='full' objectFit='contain' borderRadius="md" />
				<Text fontSize="sm" color="gray.500" mt={1}>{showFrontImage ? "Click to view back" : "Click to view front"}</Text>
			</Box>

			<Box mt={4}>
				<Heading as='h3' size='md' mb={1}>{shirt.team}</Heading>
				<Text fontWeight='bold' fontSize='lg' color={textColor}>Season: {shirt.season}</Text>

				{/* Favorite Icon with Spacing */}
				<HStack spacing={4} align="center">
					<Tooltip label={shirt.favorite ? "Marked as Favorite" : "Not a Favorite"}>
						<StarIcon color={shirt.favorite ? "yellow.400" : "gray.300"} mb={2} />
					</Tooltip>
					<Spacer />
					<Button
						variant="link"
						colorScheme="teal"
						mt={2}
						rightIcon={showDetails ? <ChevronUpIcon /> : <ChevronDownIcon />}
						onClick={() => setShowDetails(!showDetails)}
					>
						{showDetails ? 'Hide Details' : 'Show Details'}
					</Button>
				</HStack>

				{/* Expandable Details Section */}
				<Collapse in={showDetails} animateOpacity>
					<VStack align="stretch" mt={4} spacing={2}>
						<Divider />
						<Text color={textColor}><strong>Brand:</strong> {shirt.brand}</Text>
						<Text color={textColor}><strong>Player:</strong> {shirt.player || 'N/A'}</Text>
						<Text color={textColor}><strong>Player Number:</strong> {shirt.playerNumber || 'N/A'}</Text>
						<Text color={textColor}><strong>Notes:</strong> {shirt.notes || 'None'}</Text>
					</VStack>
				</Collapse>

				{/* Action Buttons */}
				<HStack spacing={2} mt={4}>
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
					<IconButton icon={<DeleteIcon />} onClick={() => handleDeleteShirt(shirt._id)} colorScheme='red' />
				</HStack>
			</Box>

			{/* Edit Modal */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Shirt</ModalHeader>
					<ModalCloseButton />
					<ModalBody>

						{/* Form Fields */}
						<FormControl id="team" isRequired>
							<FormLabel>Team Name</FormLabel>
							<Input
								type="text"
								name="team"
								value={updatedShirtData.team}
								onChange={handleInputChange}
							/>
						</FormControl>
						<FormControl id="season" isRequired>
							<FormLabel>Season</FormLabel>
							<Input
								type="text"
								name="season"
								value={updatedShirtData.season}
								onChange={handleInputChange}
							/>
						</FormControl>
						<FormControl id="type" isRequired>
							<FormLabel>Shirt Type</FormLabel>
							<Select
								name="type"
								value={updatedShirtData.type}
								onChange={handleInputChange}
							>
								<option value="Home">Home</option>
								<option value="Away">Away</option>
								<option value="Third">Third</option>
							</Select>
						</FormControl>
						<FormControl id="size">
							<FormLabel>Size</FormLabel>
							<Select
								name="size"
								value={updatedShirtData.size}
								onChange={handleInputChange}
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
								value={updatedShirtData.brand}
								onChange={handleInputChange}
							/>
						</FormControl>
						<FormControl id="player">
							<FormLabel>Player Name</FormLabel>
							<Input
								type="text"
								name="player"
								value={updatedShirtData.player}
								onChange={handleInputChange}
							/>
						</FormControl>
						<FormControl id="playerNumber">
							<FormLabel>Player Number</FormLabel>
							<Input
								type="number"
								name="playerNumber"
								value={updatedShirtData.playerNumber}
								onChange={handleInputChange}
							/>
						</FormControl>
						<FormControl id="image" isRequired>
							<FormLabel>Front Image URL</FormLabel>
							<Input
								type="url"
								name="image"
								value={updatedShirtData.image}
								onChange={handleInputChange}
							/>
						</FormControl>
						<FormControl id="backImage" isRequired>
							<FormLabel>Back Image URL</FormLabel>
							<Input
								type="url"
								name="backImage"
								value={updatedShirtData.backImage}
								onChange={handleInputChange}
							/>
						</FormControl>
						<FormControl id="favorite" display="flex" alignItems="center" mt={4}>
							<FormLabel>Favorite</FormLabel>
							<Checkbox
								name="favorite"
								isChecked={updatedShirtData.favorite}
								onChange={handleInputChange}
								colorScheme="yellow"
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" onClick={handleUpdateShirt}>Update</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default ShirtCard;
