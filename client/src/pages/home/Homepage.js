import { Flex, Text } from "@chakra-ui/react";
import { NewPost } from "../../components/newPost/NewPost";
import { Feed } from "../../components/feed/Feed";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialFeed } from "../../features/post/postSlice";
import axios from "axios";

export const Homepage = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.posts.feed);

  useEffect(() => {
    (async () => {
      const feed = await axios.post("/feed");
      dispatch(initialFeed(feed));
    })();
  }, []);

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
        {feed.length === 0 ? (
          <Text
            fontWeight="bold"
            textAlign="center"
            color="rgb(59, 59, 59)"
            fontSize="3xl"
          >
            Your feed is empty
          </Text>
        ) : (
          feed.map((post) => <Feed post={post} key={post?._id} />)
        )}
      </Flex>

      {/* Mobile View */}
      <Flex
        display={["flex", "flex", "none", "none"]}
        align="center"
        direction="column"
        width="100%"
      >
        <NewPost />
        {feed.length === 0 ? (
          <Text fontWeight="bold" color="rgb(59, 59, 59)" fontSize="3xl">
            Your feed is empty
          </Text>
        ) : (
          feed.map((post) => <Feed post={post} key={post?._id} />)
        )}
      </Flex>
    </>
  );
};
