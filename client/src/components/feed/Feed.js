import { Flex, Box, Button, Image, Text } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { profileState } from "../../features/profile/profileSlice";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { postLiked } from "../../features/post/postSlice";

export const Feed = ({ post }) => {
  const profile = useSelector(profileState);
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const dispatch = useDispatch();
  const myPost = post?.userId === profile._id;

  return (
    <Box
      w="90%"
      justify="center"
      align="center"
      borderWidth="1px"
      borderRadius="lg"
      bg={isDark ? "blackAlpha.600" : "whiteAlpha.600"}
      m="1rem"
    >
      <Flex justify="space-between">
        <Flex align="center">
          <Image
            src={`https://avatars.dicebear.com/api/identicon/${post?.username}.svg`}
            boxSize="50px"
            objectFit="cover"
            borderRadius="full"
            mt="1rem"
            ml="1rem"
          />
          <Flex margin="1rem" textAlign="left">
            <Text
              color={isDark ? "whiteAlpha" : "blackAlpha"}
              fontWeight="bold"
              fontSize="large"
            >
              {post && post.firstName + " " + post.lastName}
            </Text>
            <Text mx="0.3rem" color="GrayText">
              @{post && post.username}
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Text m="1rem" color="GrayText">
            {" "}
            {/* <TimeAgo date={post?.createdAt} /> */}
            {post?.createdAt &&
              formatDistanceToNow(new Date(post.createdAt)) + " ago"}
          </Text>
        </Flex>
      </Flex>
      <Flex width="100%">
        <Text
          align="left"
          p="1rem"
          pb="1rem"
          color={isDark ? "whiteAlpha" : "blackAlpha"}
        >
          {post && post?.caption}
        </Text>
      </Flex>
      <Flex
        justify={"space-between"}
        position="relative"
        align="center"
        p="1rem"
      >
        <Button
          onClick={() =>
            dispatch(postLiked({ userId: profile._id, postId: post._id }))
          }
        >
          Upvote {post?.likes.length}
        </Button>{" "}
        <Button>Comment</Button>
        {myPost && <Button>Delete</Button>}
      </Flex>
    </Box>
  );
};
