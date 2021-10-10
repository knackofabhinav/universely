import { Flex, Spinner } from "@chakra-ui/react";
import { NewPost } from "../../components/newPost/NewPost";
import { Feed } from "../../components/feed/Feed";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialFeed } from "../../features/post/postSlice";
import axios from "axios";
import { useState } from "react";

export const Homepage = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.posts.feed);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const feed = await axios.post("/feed");
      dispatch(initialFeed(feed));
      setLoading(false);
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
          <Flex justify="center">{loading && <Spinner />}</Flex>
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
          <Spinner size="xl" />
        ) : (
          feed.map((post) => <Feed post={post} key={post?._id} />)
        )}
      </Flex>
    </>
  );
};
