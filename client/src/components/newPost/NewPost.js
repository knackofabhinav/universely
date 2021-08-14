import { Button, Image, useToast, Textarea, Box, Flex } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { createNewPost } from "../../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { profileState } from "../../features/profile/profileSlice";
import { Link } from "react-router-dom";

export const NewPost = () => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [post, setPost] = useState({ caption: "" });
  const isDark = colorMode === "dark";
  const dispatch = useDispatch();
  const profile = useSelector(profileState);
  return (
    <Box
      w="90%"
      justify="center"
      align="center"
      h="11rem"
      borderWidth="1px"
      borderRadius="lg"
      bg={isDark ? "blackAlpha.600" : "whiteAlpha.600"}
      m="1rem"
    >
      <Flex>
        <Link to={`/profile/${profile.username}`}>
          <Image
            src={`https://avatars.dicebear.com/api/identicon/${profile.username}.svg`}
            boxSize="50px"
            objectFit="cover"
            borderRadius="full"
            mt="1rem"
            ml="1rem"
          />
        </Link>
        <Textarea
          placeholder="What's Happening?"
          border="none"
          value={post.caption}
          m="1rem"
          fontSize="xl"
          resize="none"
          onChange={(e) => setPost({ caption: e.target.value })}
        />
      </Flex>
      <Flex justify="flex-end" pr="1rem" align="center" w="100%" h="3rem">
        <Button
          onClick={async () => {
            setPost({ caption: "" });
            await dispatch(createNewPost(post));
            toast({
              title: "Post created!",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }}
        >
          Post
        </Button>
      </Flex>
    </Box>
  );
};
