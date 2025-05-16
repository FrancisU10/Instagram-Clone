import { Container, Flex, Box } from "@chakra-ui/react";
import FeedPosts from "../../comp/FeedPosts/FeedPosts";
import SuggestedUsers from "../../comp/SuggestedUsers/SuggestedUsers";

const HomePage = () => {
  return (
    <Container maxW="container.lg" px={{ base: 2, md: 6 }} py={6}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={{ base: 12, lg: 16 }}
        justify="center"
        align="start"
      >
        <Box flex="2" minW="0">
          <FeedPosts />
        </Box>

        <Box
          flex="1"
          maxW="300px"
          display={{ base: "none", lg: "block" }}
        >
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;