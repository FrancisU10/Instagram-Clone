import { Box, Flex } from "@chakra-ui/react";
import { Tooltip } from "../../components/ui/tooltip";
import { CreatePostLogo } from "../../assets/constants";

const CreatePost = () => {
	return (
		<Tooltip
			content="Create"
			showArrow
			openDelay={500}
			positioning={{ placement: "right-start" }}
		>
			<Flex
				alignItems="center"
				gap={4}
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
				ml={1}
			>
				<CreatePostLogo />
				<Box display={{ base: "none", md: "block" }}>Create</Box>
			</Flex>
		</Tooltip>
	);
};

export default CreatePost;