import { Flex, AvatarRoot, AvatarFallback, AvatarImage, Text } from "@chakra-ui/react"

const Comment = ({createdAt, username, profilePic, text}) => {
  return (
    <Flex gap={4}>
        <AvatarRoot size={"sm"} alignSelf={"flex-start"}>
            <AvatarFallback name= {username}/>
            <AvatarImage src={profilePic}/>
        </AvatarRoot>

        <Flex direction={"column"} >
            <Flex gap={1}>
                <Text fontWeight={"bold"} fontSize={12}>
                    {username}
                </Text>
                <Text fontSize={12}>
                    {text}
                </Text>
            </Flex>
            <Text fontSize={12} color={"gray.500"}>
                {createdAt}
            </Text>
        </Flex>
    </Flex>
  )
}

export default Comment