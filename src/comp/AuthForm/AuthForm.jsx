import { Box, VStack, Image, Input, Button, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  return ( <>
   <Box border={"1px solid gray"} borderRadius={4} padding={5}>
    <VStack>
    <Image src="/logo.png" h={"24"} alt= "Instagram"/>
    <Input placeholder="Email" fontSize={14} type="email"/>
    <Input placeholder="Password" fontSize={14} type="password"/>

    {!isLogin ? <Input placeholder="Confirm Password" fontSize={14} type="password"/> : null}

    <Button w={"full"} colorPalette={"blue"} size={"sm"} fontSize={14}>
        {isLogin ? "Log In" : "Sign Up"}
    </Button>
    
    
    <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
        <Box border={"1px solid gray"} w={100}/>
        <Text mx={1} color={"white"}> OR </Text>
        <Box border={"1px solid gray"} w={100}/>
    </Flex>

    <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}>
        <Image src="/google.png" w={5} alt="Google logo"/>
        <Text mx={2} color={"blue.500"}> Login With Google </Text>
    </Flex>

    </VStack>
   </Box>

   <Box border={"1px solid gray"} borderRadius={4} padding={5}>
    <Flex alignItems={"center"} justifyContent={"center"}>
        <Box mx={2} fontSize={14}>
            {isLogin ? "Dont have an account?": "Already have an account?"}
        </Box>

        <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
            {isLogin ? "Sign Up" : "Log in"}
        </Box>

    </Flex>

   </Box>


    </>
  )
}

export default AuthForm