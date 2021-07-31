import { Flex } from "@chakra-ui/react";
import { NewPost } from "../../components/newPost/NewPost";
import { Feed } from "../../components/feed/Feed";
import { useSelector } from "react-redux";

export const Homepage = () => {
  const feed = useSelector((state) => state.posts.feed);
  return (
    <>
      {/* Desktop View */}
      <Flex
        display={["none", "none", "flex", "flex"]}
        justify="center"
        direction="column"
        margin="1rem"
        width="50vw"
      >
        <NewPost />
        <Feed />
      </Flex>

      {/* Mobile View */}
      <Flex
        display={["flex", "flex", "none", "none"]}
        align="center"
        direction="column"
        width="100%"
      >
        <NewPost />
        {feed.map((post) => (
          <Feed post={post} />
        ))}
      </Flex>
    </>
  );
};
