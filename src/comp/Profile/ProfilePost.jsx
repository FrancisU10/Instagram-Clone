import {
  Flex,
  GridItem,
  Image,
  Text,
  Dialog,
  Box,
  AvatarRoot,
  Button,
  AvatarImage,
  VStack
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdClose, MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
import usePostStore from "../../store/postStore";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Caption from "../Comment/Caption";

const ProfilePost = ({ post }) => {
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;

    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, "users", authUser.uid);
      await deleteDoc(doc(firestore, "posts", post.id));
      await updateDoc(userRef, { posts: arrayRemove(post.id) });

      deletePost(post.id);
      decrementPostsCount(post.id);
      showToast("Success", "Post deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog.Root size={"cover"}>
      <Dialog.Trigger asChild>
        <GridItem
          cursor="pointer"
          borderRadius={4}
          overflow="hidden"
          border="1px solid"
          borderColor="whiteAlpha.300"
          position="relative"
          aspectRatio={1 / 1}
        >
          <Flex
            opacity={0}
            _hover={{ opacity: 1 }}
            position="absolute"
            inset={0}
            bg="blackAlpha.700"
            transition="all 0.3s ease"
            zIndex={1}
            justify="center"
          >
            <Flex align="center" justify="center" gap={50}>
              <Flex>
                <AiFillHeart size={20} />
                <Text fontWeight="bold" ml={2}>
                  {post.likes.length}
                </Text>
              </Flex>
              <Flex>
                <FaComment size={20} />
                <Text fontWeight="bold" ml={2}>
                  {post.comments.length}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Image
            src={post.imageURL}
            alt="profile post"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </GridItem>
      </Dialog.Trigger>

      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger>
            <Box display="flex" justifyContent="flex-end" p={2}>
              <MdClose size={20} cursor="pointer" />
            </Box>
          </Dialog.CloseTrigger>

          <Dialog.Body bg="black" p={0}>
            <Flex
              direction={{ base: "column", md: "row" }}
              w="full"
              maxH="90vh"
              overflow="hidden"
            >
              <Flex
                flex={{ base: "none", md: 1.5 }}
                justify="center"
                align="center"
                borderBottom={{ base: "1px solid", md: "none" }}
                borderColor="whiteAlpha.300"
              >
                <Image
                  src={post.imageURL}
                  alt="profile post"
                  objectFit="contain"
                  maxH="90vh"
                  w="full"
                />
              </Flex>

              <Flex
                flex={1}
                direction="column"
                px={{ base: 4, md: 10 }}
                py={4}
                overflowY="auto"
                maxH="90vh"
              >
                <Flex align="center" justify="space-between" mb={2}>
                  <Flex align="center" gap={4}>
                    <AvatarRoot size="sm">
                      <AvatarImage src={userProfile.profilePicURL} />
                    </AvatarRoot>
                    <Text fontWeight="bold" fontSize="sm">
                      {userProfile.username}
                    </Text>
                  </Flex>
                  {authUser?.uid === userProfile.uid && (
                    <Button
                      onClick={handleDeletePost}
                      size="sm"
                      color="white"
                      bg="transparent"
                      isLoading={isDeleting}
                      _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                      borderRadius={4}
                      p={1}
                    >
                      <MdDelete size={20} />
                    </Button>
                  )}
                </Flex>

                <Box borderTop="1px solid" borderColor="whiteAlpha.300" py={2} />

                <VStack w="full" align="start" spacing={4}>
                  {post.caption && <Caption post={post} />}
                  {post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </VStack>

                <Box borderBottom="1px solid" borderColor="whiteAlpha.300" py={2} />

                <PostFooter isProfilePage post={post} />
              </Flex>
            </Flex>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default ProfilePost;