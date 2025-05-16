import {
  Flex,
  Text,
  Button,
  Avatar,
} from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const UserCard = ({ user, type, onUnfollow }) => {
  const authUser = useAuthStore((state) => state.user);
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);

  const handleClick = async () => {
    const nextIsFollowing = await handleFollowUser();
    if (!nextIsFollowing && type === "Following") {
      onUnfollow(user.uid);
    }
  };

  return (
    <Flex w="full" justify="space-between" align="center">
    <Link to={`/${user.username}`}>
        <Flex align="center" gap={3}>
            <Avatar.Root size={"sm"}>
            <Avatar.Image src={user.profilePicURL} />
            </Avatar.Root>
            <Text fontSize="sm">{user.username}</Text>
        </Flex>
      </Link>

      {type === "Following" && user.uid !== authUser.uid && (
        <Button
          size="xs"
          variant="outline"
          colorScheme="blue"
          onClick={handleClick}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Flex>
  );
};

export default UserCard;