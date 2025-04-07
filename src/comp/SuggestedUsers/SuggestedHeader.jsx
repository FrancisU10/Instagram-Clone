import { Flex, AvatarRoot, AvatarFallback, AvatarImage, Text, Link } from "@chakra-ui/react"
import {Link as RouterLink} from "react-router-dom";

const SuggestedHeader = () => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
            <AvatarRoot size={"lg"}>
                <AvatarFallback name="Francis Uko"/>
                <AvatarImage src={"/profilepic.png"}/>
            </AvatarRoot>

            <Text fontSize={12} fontWeight={"bold"}>
                francis.uko10
            </Text>
        </Flex>
        <Link as={RouterLink} to={"/auth"} fontSize={14} fontWeight={"medium"} color={"blue.400"} cursor="pointer">
            Log out
        </Link>
    </Flex>
  )
}

export default SuggestedHeader