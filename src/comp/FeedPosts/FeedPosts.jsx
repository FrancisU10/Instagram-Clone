import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack, Text } from "@chakra-ui/react"
import FeedPost from "./FeedPost"
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const FeedPosts = () => {
 const {isLoading, posts} = useGetFeedPosts()
  
  return (
    <Container maxW={"container.sm"} py={10} px={2}>
        {isLoading && [0, 1, 2].map((_, idx) => (
          <VStack key={idx} gap={"4"} alignItems={"flex-start"} mb={"10"}>
            <Flex gap={"2"}>
              <SkeletonCircle size={"10"}/>
              <VStack gap={"2"} alignItems={"flex-start"}>
                <Skeleton height={"10px"} w={"200px"}/>
                <Skeleton height={"10px"} w={"200px"}/>
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"400px"}> contents wrapped </Box> 
            </Skeleton>
          </VStack>
        ))}

       {!isLoading && posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}
			 {!isLoading && posts.length === 0 && (
      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        py={20}
        w="full"
      >
          <Text fontSize="xl" fontWeight="bold" color="gray.200" mb={2}>
            Your feed is feeling a little empty.
          </Text>
          <Text fontSize="md" color="gray.400">
            Start following users to see their posts here.
          </Text>
      </Flex>
    )}
    </Container>
  )
}

export default FeedPosts