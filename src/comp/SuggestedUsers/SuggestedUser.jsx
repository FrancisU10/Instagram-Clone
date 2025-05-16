import {
  Button,
  Flex,
  AvatarRoot,
  AvatarImage,
  VStack,
  Box,
} from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user, setUser }) => {
  const authUser = useAuthStore((state) => state.user);

  if (!user) return null;

  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);

  const onFollowUser = async () => {
    const nextIsFollowing = await handleFollowUser();

     if (typeof setUser === "function") {
    setUser((prev) => ({
      ...prev,
      followers: nextIsFollowing
        ? [...prev.followers, authUser.uid]
        : prev.followers.filter((uid) => uid !== authUser.uid),
    }));
  }
};

  return (
    <Flex justifyContent="space-between" alignItems="center" w="full" py={2}>
      <Flex alignItems="center" gap={2}>
        <Link to = {`/${user.username}`}>
          <AvatarRoot size="md">
            <AvatarImage src={user.profilePicURL} />
          </AvatarRoot>
        </Link>

        <VStack alignItems="flex-start" spacing={0} minW={0}>
          <Link to = {`/${user.username}`}>
            <Box fontSize={12} fontWeight="bold" isTruncated>
              {user.fullName}
            </Box>
          </Link>
          <Box fontSize={11} color="gray.500" isTruncated>
            {user.followers?.length ?? 0} followers
          </Box>
        </VStack>
      </Flex>

      {authUser?.uid !== user.uid && (
        <Button
          fontSize={13}
          bg="transparent"
          p={0}
          h="max-content"
          fontWeight="medium"
          color="blue.400"
          cursor="pointer"
          _hover={{ color: "white" }}
          onClick={onFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Flex>
  );
};

export default SuggestedUser;