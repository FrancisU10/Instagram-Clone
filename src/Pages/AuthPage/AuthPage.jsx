import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react"
import AuthForm from "../../comp/AuthForm/AuthForm";

const AuthPage = () => {
  return (
      <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
        <Container maxW={"container.md"} padding={0}>
          <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
            <Box display={{base: "none", md:"block"}}>
              <Image src= "/auth.png" h={650} alt="Phone img" />
            </Box>

            <VStack align={"stretch"}>
              <AuthForm />
              <Box textAlign={"center"}>Get the app.</Box>
              <Flex gap={5} justifyContent={"center"}>
              <Image src="/playstore.png" h={"10"} alt="Playstore logo" cursor={"pointer"}/>
              <Image src="/microsoft.png" h={"10"} alt="Microsoft logo" cursor={"pointer"}/>
              </Flex>
            </VStack>
          </Flex>
        </Container>
      </Flex>
  );
};

export default AuthPage