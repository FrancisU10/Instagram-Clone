import { Flex, AvatarRoot, AvatarFallback, AvatarImage, VStack, Text, Button } from "@chakra-ui/react"
import { useState } from "react"
import useUserProfileStore from "../../store/userProfileStore"
import useAuthStore from "../../store/authStore"
import EditProfile from "./EditProfile"
import useFollowUser from "../../hooks/useFollowUser"

const ProfileHeader = () => {
    const {userProfile} = useUserProfileStore()
    const authUser = useAuthStore(state => state.user)
    const {isFollowing, isUpdating, handleFollowUser} = useFollowUser(userProfile?.uid)
    const [isOpen, setIsOpen] = useState(false);
    const visitingOwnProfileAndAuth = authUser?.username && userProfile?.username && authUser.username === userProfile.username;
    const visitingAnotherProfileAndAuth = authUser?.username && userProfile?.username && authUser.username !== userProfile.username;

  return (
    <Flex gap={{base:4, sm:10}} py={10} direction={{base:"column", sm:"row"}}>
        <AvatarRoot boxSize={"120px"} alignSelf={"flex-start"}>
            <AvatarFallback name= {userProfile.fullName}/>
            <AvatarImage src={userProfile.profilePicURL}/>
        </AvatarRoot>

        <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
            <Flex gap={4} direction={{base: "column", sm:"row"}} justifyContent={{base: "center", sm: "flex-start"}} alignItems={"center"} w={"full"}>
                <Text fontSize={{base: "sm", md: "lg"}}>
                    {userProfile.username}
                </Text>
                {visitingOwnProfileAndAuth && (
                    <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                    <Button bg={"gray.700"} color={"white"} _hover={{bg: "gray.800"}} size={{base: "xs", md: "sm"}} onClick={() => setIsOpen(true)}>
                        Edit Profile
                    </Button>
                </Flex>)}

                {visitingAnotherProfileAndAuth && (
                    <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                    <Button bg={"blue.500"} color={"white"} _hover={{bg: "blue.600"}} size={{base: "xs", md: "sm"}} onClick={handleFollowUser} loading={isUpdating}>
                       {isFollowing ? "Unfollow" : "Follow"}
                    </Button>
                </Flex>)}
                
            </Flex>

            <Flex alignItems={"center"} gap={{base: 2, sm: 4}}>
                <Text font={{base: "xs", md: "sm"}}>
                    <Text as={"span"} fontWeight={"bold"} mr={1}>
                        {userProfile.posts.length}
                    </Text>
                    Posts
                </Text>

                <Text font={{base: "xs", md: "sm"}}>
                    <Text as={"span"} fontWeight={"bold"} mr={1}>
                        {userProfile.followers.length}
                    </Text>
                    Followers
                </Text>

                <Text font={{base: "xs", md: "sm"}}>
                    <Text as={"span"} fontWeight={"bold"} mr={1}>
                        {userProfile.following.length}
                    </Text>
                    Following
                </Text>
            </Flex>

            <Flex alignItems={"center"} gap={4}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                    {userProfile.fullName}
                </Text>
            </Flex>

            <Text fontSize={"sm"}>
                {userProfile.bio}
            </Text>
        </VStack>
        {isOpen && <EditProfile isOpen= {isOpen} onClose = {() => setIsOpen(false)}/>}
    </Flex>
  )
}

export default ProfileHeader