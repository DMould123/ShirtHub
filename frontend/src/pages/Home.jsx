import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useShirtStore } from "../store/shirt"; // Updated to reflect shirts
import ShirtCard from "../components/ShirtCard"; // Updated to reflect ShirtCard component

const Home = () => {
	const { fetchShirts, shirts } = useShirtStore(); // Updated to fetch shirts instead of products

	useEffect(() => {
		fetchShirts(); // Fetch shirts from the store when the component mounts
	}, [fetchShirts]);

	console.log("shirts", shirts);

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, teal.400, green.500)"} // Updated gradient for a fresh look
					bgClip={"text"}
					textAlign={"center"}
				>
					Available Shirts 🏅
				</Text>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{shirts.map((shirt) => (
						<ShirtCard key={shirt._id} shirt={shirt} /> // Updated to ShirtCard
					))}
				</SimpleGrid>

				{shirts.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No shirts found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='green.500' _hover={{ textDecoration: "underline" }}>
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
