import { Box, Button, Flex, Input, Group, Text } from "@chakra-ui/react";
import { useRef, useState } from "react"
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";

const PostFooter = ({post, username, isProfilePage, creatorProfile}) => {
    const {isCommenting, handlePostComment} = usePostComment()
    const [comment, setComment] = useState("")
    const authUser = useAuthStore(state => state.user)
    const commentRef = useRef(null)
    const {handleLikePost, isLiked, likes} = useLikePost(post)
    const [isCommentOpen, setIsCommentOpen] = useState(false)

    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment)
        setComment("")
    }

    

    return (
        <>
        <Box my={4} marginTop={"auto"}/>
        <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
            <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
                {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
            </Box>
            <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
                <CommentLogo />
            </Box>
        </Flex>

        <Text fontWeight={600} fontSize={"sm"}>
            {likes} likes
        </Text>
        {isProfilePage && (
            <Text fontSize={12} color={"gray"}>
                Posted {timeAgo(post.createdAt)}
            </Text>
        )}
        {!isProfilePage && (
            <>
            <Text fontWeight={700} fontSize={"sm"}>
            {creatorProfile?.username} {" "}
            <Text as={"span"} fontWeight={400}>
                {post.caption}
            </Text>
            </Text>
            {post.comments.length > 0 && (
                <Text fontSize={"sm"} color={"gray"} cursor={"pointer"} onClick={() => setIsCommentOpen(true)}>
                    View all {post.comments.length} comments
                </Text>
            )}
            <CommentsModal
                open={isCommentOpen}
                setOpen={() => setIsCommentOpen(false)}
                post={post}
            />
            </>
        )}

        {authUser && (
            <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
                <Group w={"full"}>
                    <Input variant={"flushed"} placeholder="Add a comment..." fontSize={14} onChange={(e) => setComment(e.target.value)} value={comment} ref={commentRef}/>
                        <Button fontSize={14} color={"blue.500"} fontWeight={600} cursor={"pointer"} _hover={{color: "white"}} bg={"transparent"} onClick={handleSubmitComment} loading = {isCommenting}>
                            Post
                        </Button>
                </Group>
            </Flex>
        )}
        
        </>
    
    )
}

export default PostFooter