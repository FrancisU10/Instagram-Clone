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

const SuggestedUser = ({ user, setUser }) => {
  const authUser = useAuthStore((state) => state.user);

  if (!user) return null;

  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);

  const onFollowUser = async () => {
    const nextIsFollowing = await handleFollowUser();

    setUser((prev) => ({
      ...prev,
      followers: nextIsFollowing
        ? [...prev.followers, authUser.uid]
        : prev.followers.filter((uid) => uid !== authUser.uid),
    }));
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" w="full" py={2}>
      <Flex alignItems="center" gap={2}>
        <AvatarRoot size="md">
          <AvatarImage src={user.profilePicURL} />
        </AvatarRoot>

        <VStack alignItems="flex-start" spacing={0} minW={0}>
          <Box fontSize={12} fontWeight="bold" isTruncated>
            {user.fullName}
          </Box>
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