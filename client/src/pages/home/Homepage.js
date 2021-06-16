import { Flex } from "@chakra-ui/react";
import { NewPost } from "../../components/newPost/NewPost";
import { Feed } from "../../components/feed/Feed";

export const Homepage = () => {
  return (
    <Flex justify="center" direction="column">
      <NewPost />
      <Feed />
      <Feed />
      <Feed />
      <Feed />
      <Feed />
      <Feed />
    </Flex>
  );
};
