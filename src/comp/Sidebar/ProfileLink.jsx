import { AvatarImage, AvatarRoot, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Tooltip } from "../../components/ui/tooltip";
import useAuthStore from "../../store/authStore";

const ProfileLink = () => {
	const authUser = useAuthStore((state) => state.user);

	return (
		<Tooltip
			content="Profile"
			showArrow
			openDelay={500}
			positioning={{ placement: "left-start" }}
		>
			<Box
				as={Link}
				to={`/${authUser?.username}`}
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
                <AvatarRoot size={"sm"}>
                    <AvatarImage src={authUser?.profilePicURL || ""}/>
                </AvatarRoot>
				<Box display={{ base: "none", md: "block" }}>Profile</Box>
			</Box>
		</Tooltip>
	);
};

export default ProfileLink;