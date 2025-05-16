import {
  Dialog,
  Portal,
  CloseButton,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import usePostComment from "../../hooks/usePostComment";
import { useEffect, useRef } from "react";

const CommentsModal = ({ open , setOpen, post }) => {
  const {handlePostComment, isCommenting} = usePostComment()
  const commentRef = useRef(null);
	const commentsContainerRef = useRef(null);
  const handleSubmitComment = async (e) => {
		e.preventDefault();
		await handlePostComment(post.id, commentRef.current.value);
		commentRef.current.value = "";
	};
  useEffect(() => {
		const scrollToBottom = () => {
			commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
		};
		if (open) {
			setTimeout(() => {
				scrollToBottom();
			}, 100);
		}
	}, [open, post.comments.length]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="black"
            color="white"
            maxW="400px"
            w="full"
            borderRadius="lg"
            border="1px solid gray"
            p={4}
          >
            <Dialog.CloseTrigger asChild>
              <CloseButton position="absolute" top={2} right={2} />
            </Dialog.CloseTrigger>

            <Dialog.Header>
              <Dialog.Title>Comments</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Flex mb={4} gap={4} flexDir="column" maxH="250px" overflowY="auto" ref={commentsContainerRef}>
                {post.comments.map((comment) => (
                    <Comment
                      key={`${comment.user?.uid}-${comment.createdAt}`}
                      comment={comment}
                    />
                ))}
              </Flex>

              <form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
                <Input placeholder="Comment" size="sm" ref={commentRef}/>
                <Flex w="full" justifyContent="flex-end">
                  <Button type="submit" size="sm" my={4} loading = {isCommenting}>
                    Post
                  </Button>
                </Flex>
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CommentsModal;