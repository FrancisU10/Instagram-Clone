import { Box } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Tooltip } from "../../components/ui/tooltip";

const Home = () => {
	return (
		<Tooltip
			content="Home"
			showArrow
			openDelay={500}
			positioning={{ placement: "left-start" }}
		>
			<Box
				as={Link}
				to="/"
				display="flex"
				alignItems="center"
				gap={4}
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
				ml={1}
			>
				<AiFillHome size={25} />
				<Box display={{ base: "none", md: "block" }}>Home</Box>
			</Box>
		</Tooltip>
	);
};

export default Home;