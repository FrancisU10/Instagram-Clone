import { Flex, AvatarRoot,  AvatarImage, Text, Skeleton, SkeletonCircle } from "@chakra-ui/react"
import useGetUserProfileById from "../../hooks/useGetUserProfileById"
import { Link } from "react-router-dom"
import { timeAgo } from "../../utils/timeAgo"

const Comment = ({ comment }) => {
    const {userProfile, isLoading} = useGetUserProfileById(comment.createdBy)
    if(isLoading) return <CommentSkeleton/>
  return (
    <Flex gap={4}>
        <Link to = {`/${userProfile.username}`}>
            <AvatarRoot size={"sm"} alignSelf={"flex-start"}>
                <AvatarImage src={userProfile.profilePicURL}/>
            </AvatarRoot>
         </Link>

        <Flex direction={"column"} >
            <Flex gap={1} alignItems={"center"}>
                <Link to = {`/${userProfile.username}`}>
                    <Text fontWeight={"bold"} fontSize={12}>
                        {userProfile.username}
                    </Text>
                </Link>
                <Text fontSize={12}>
                    {comment.comment}
                </Text>
            </Flex>
            <Text fontSize={12} color={"gray.500"}>
                {timeAgo(comment.createdAt)}
            </Text>
        </Flex>
    </Flex>
  )
}

export default Comment

const CommentSkeleton = () => {
	return (
		<Flex gap={4} w={"full"} alignItems={"center"}>
			<SkeletonCircle h={10} w='10' />
			<Flex gap={1} flexDir={"column"}>
				<Skeleton height={2} width={100} />
				<Skeleton height={2} width={50} />
			</Flex>
		</Flex>
	);
};