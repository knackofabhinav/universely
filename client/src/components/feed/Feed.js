import { Flex, Box, Button, Image, Text, useToast } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { profileState } from "../../features/profile/profileSlice";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { postLiked, updateFeed } from "../../features/post/postSlice";
import { CommentModal } from "../comment/CommentModal";
import axios from "axios";
import { Link } from "react-router-dom";

export const Feed = ({ post, setProfile }) => {
  const profile = useSelector(profileState);
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const dispatch = useDispatch();
  const myPost = post?.author?._id === profile._id;
  const toast = useToast();

  const deletePost = async ({ postId }) => {
    try {
      const res = await axios.post("/posts/delete", { postId });
      if (res.data.success) {
        const res = await axios.post("/feed");
        dispatch(updateFeed(res));
        toast({
          title: "Deleted Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setProfile((profilePage) => ({
          ...profilePage,
          posts: res.data.feed.filter(
            (post) => post.author._id === profilePage._id
          ),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const buttonBackgroundColor = () => {
    return post?.likes.find((id) => id === profile._id) && "teal";
  };

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
      <Flex justify="space-between" w="100%">
        <Flex align="center" w="100%">
          <Link to={`/profile/${post?.username}`}>
            <Image
              src={`https://avatars.dicebear.com/api/identicon/${post?.username}.svg`}
              boxSize="50px"
              objectFit="cover"
              borderRadius="full"
              mt="1rem"
              ml="1rem"
            />
          </Link>
          <Flex margin="1rem" textAlign="left">
            <Text
              color={isDark ? "whiteAlpha" : "blackAlpha"}
              fontWeight="bold"
              fontSize="large"
            >
              <Link to={`/profile/${post?.username}`}>
                {post && post.firstName + " " + post.lastName}
              </Link>
            </Text>
            <Text mx="0.3rem" color="GrayText">
              @{post && post.username}
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Text m="1rem" color="GrayText">
            {" "}
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
          backgroundColor={buttonBackgroundColor}
          onClick={async () => {
            const res = await dispatch(
              postLiked({ userId: profile._id, postId: post._id })
            );
            if (
              !!res.payload.likes.filter((item) => item === profile._id).length
            ) {
              toast({
                title: "Post Liked!",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
            } else {
              toast({
                title: "Post disliked!",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
            }
          }}
        >
          Upvote {post?.likes.length}
        </Button>{" "}
        <CommentModal postId={post?._id} userId={profile._id} />
        {myPost && (
          <Button onClick={() => deletePost({ postId: post._id })}>
            Delete
          </Button>
        )}
      </Flex>
    </Box>
  );
};
