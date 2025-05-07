import { Flex, AvatarRoot, AvatarImage,  Link, Button } from "@chakra-ui/react"
import {Link as RouterLink} from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";

const SuggestedHeader = () => {
    const {handleLogout, isLoggingOut} = useLogout()
    const authUser = useAuthStore(state => state.user)
    if (!authUser) return null;
    
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
            <Link as={RouterLink} to ={`${authUser.username}`}>
                <AvatarRoot size={"lg"}>
                    <AvatarImage src={authUser.profilePicURL}/>
                </AvatarRoot>
            </Link>

            <Link as={RouterLink} to={`${authUser.username}`} fontSize={12} fontWeight={"bold"}>
                {authUser.username}
            </Link>
        </Flex>
        <Button size={"xs"} background={"transparent"} _hover={{background: "transparent"}} fontSize={14} fontWeight={"medium"} color={"blue.400"} cursor="pointer" loading = {isLoggingOut} onClick={handleLogout}>
            Log out
        </Button>
    </Flex>
  )
}

export default SuggestedHeader