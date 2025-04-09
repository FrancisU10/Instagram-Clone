import { Flex, AvatarRoot, AvatarFallback, AvatarImage, AvatarGroup, VStack, Text, Button } from "@chakra-ui/react"

const ProfileHeader = () => {
  return (
    <Flex gap={{base:4, sm:10}} py={10} direction={{base:"column", sm:"row"}}>
        <AvatarRoot boxSize={"120px"} alignSelf={"flex-start"}>
            <AvatarFallback name="Francis Uko"/>
            <AvatarImage src={"/profilepic.png"}/>
        </AvatarRoot>

        <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
            <Flex gap={4} direction={{base: "column", sm:"row"}} justifyContent={{base: "center", sm: "flex-start"}} alignItems={"center"} w={"full"}>
                <Text fontSize={{base: "sm", md: "lg"}}>
                    francis.uko10
                </Text>
                <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                    <Button bg={"gray.700"} color={"white"} _hover={{bg: "gray.800"}} size={{base: "xs", md: "sm"}}>
                        Edit Profile
                    </Button>
                </Flex>
            </Flex>

            <Flex alignItems={"center"} gap={{base: 2, sm: 4}}>
                <Text font={{base: "xs", md: "sm"}}>
                    <Text as={"span"} fontWeight={"bold"} mr={1}>
                        4
                    </Text>
                    Posts
                </Text>

                <Text font={{base: "xs", md: "sm"}}>
                    <Text as={"span"} fontWeight={"bold"} mr={1}>
                        1M
                    </Text>
                    Followers
                </Text>

                <Text font={{base: "xs", md: "sm"}}>
                    <Text as={"span"} fontWeight={"bold"} mr={1}>
                        500
                    </Text>
                    Following
                </Text>
            </Flex>

            <Flex alignItems={"center"} gap={4}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                    Francis
                </Text>
            </Flex>

            <Text fontSize={"sm"} cursor={"pointer"} color={"blue.100"}>
                @georgiatech
            </Text>
        </VStack>
    </Flex>
  )
}

export default ProfileHeader