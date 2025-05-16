import {
  Flex,
  AvatarRoot,
  AvatarFallback,
  AvatarImage,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";
import FollowersModal from "../Modals/FollowersModal";

const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);

  const [isOpen, setIsOpen] = useState(false);
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);

  const visitingOwnProfileAndAuth =
    authUser?.username && userProfile?.username && authUser.username === userProfile.username;

  const visitingAnotherProfileAndAuth =
    authUser?.username && userProfile?.username && authUser.username !== userProfile.username;

  return (
    <>
      <Flex
        direction={{ base: "column", sm: "row" }}
        alignItems={{ base: "center", sm: "flex-start" }}
        justifyContent="flex-start"
        wrap="wrap"
        gap={{ base: 6, sm: 12 }}
        py={6}
        w="full"
        maxW="1000px"
        mx="auto"
        px={{ base: 4, md: 6 }}
      >
        <AvatarRoot
          boxSize={{ base: "120px", md: "140px" }}
          alignSelf={{ base: "center", sm: "flex-start" }}
        >
          <AvatarFallback name={userProfile.fullName} />
          <AvatarImage src={userProfile.profilePicURL} />
        </AvatarRoot>

        <VStack alignItems="start" gap={4} flex={1} w="100%">
          <Flex
            gap={6}
            direction={{ base: "column", sm: "row" }}
            justifyContent={{ base: "center", sm: "flex-start" }}
            alignItems="center"
            w="full"
          >
            <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold">
              {userProfile.username}
            </Text>

            {visitingOwnProfileAndAuth && (
              <Button
                bg="gray.700"
                color="white"
                _hover={{ bg: "gray.800" }}
                size="md"
                px={6}
                onClick={() => setIsOpen(true)}
              >
                Edit Profile
              </Button>
            )}

            {visitingAnotherProfileAndAuth && (
              <Button
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.600" }}
                size="md"
                px={6}
                onClick={handleFollowUser}
                isLoading={isUpdating}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </Flex>

          <Flex alignItems="center" gap={{ base: 4, sm: 8 }}>
            <Text fontSize={{ base: "md", md: "lg" }}>
              <Text as="span" fontWeight="bold" mr={1}>
                {userProfile.posts.length}
              </Text>
              Posts
            </Text>

            <Text
              fontSize={{ base: "md", md: "lg" }}
              cursor="pointer"
              onClick={() => setIsFollowersOpen(true)}
              _hover={{ textDecoration: "underline" }}
            >
              <Text as="span" fontWeight="bold" mr={1}>
                {userProfile.followers.length}
              </Text>
              Followers
            </Text>

            <Text
              fontSize={{ base: "md", md: "lg" }}
              cursor="pointer"
              onClick={() => setIsFollowingOpen(true)}
              _hover={{ textDecoration: "underline" }}
            >
              <Text as="span" fontWeight="bold" mr={1}>
                {userProfile.following.length}
              </Text>
              Following
            </Text>
          </Flex>

          <Text fontSize={{ base: "md", md: "lg" }} fontWeight="semibold">
            {userProfile.fullName}
          </Text>

          <Text fontSize={{ base: "sm", md: "md" }}>{userProfile.bio}</Text>
        </VStack>
      </Flex>

      {isOpen && <EditProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />}

      <FollowersModal
        open={isFollowersOpen}
        setOpen={() => setIsFollowersOpen(false)}
        userIds={userProfile.followers}
        type="Followers"
      />

      <FollowersModal
        open={isFollowingOpen}
        setOpen={() => setIsFollowingOpen(false)}
        userIds={userProfile.following}
        type="Following"
      />
    </>
  );
};

export default ProfileHeader;