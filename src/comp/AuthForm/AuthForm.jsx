import { Box, VStack, Image, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import Login from "./Login"
import Signup from "./Signup"
import GoogleAuth from "./GoogleAuth"


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [inputs, setInputs] = useState ({
    email: '',
    password: '',
    confirmPassword: ''
  })

  


  return ( <>
   <Box border={"1px solid gray"} borderRadius={4} padding={5}>
    <VStack>
    <Image src="/logo.png" h={"24"} alt= "Instagram"/>

    {isLogin ? <Login/> : <Signup/>}
    
    <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
        <Box border={"1px solid gray"} w={100}/>
        <Text mx={1} color={"white"}> OR </Text>
        <Box border={"1px solid gray"} w={100}/>
    </Flex>

    <GoogleAuth/>

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