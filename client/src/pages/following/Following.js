import { Flex, Text, Button, Spinner } from "@chakra-ui/react";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Following = () => {
  const [following, setFollowing] = useState([]);
  const { username } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await axios.get(`/${username}/following`);
      setFollowing(res.data.following);
      setLoading(false);
    })();
  }, [dispatch, username]);

  return (
    <>
      {/* Desktop View */}
      {isLoading ? (
        <Flex
          justify="center"
          margin="1rem"
          width="50vw"
          display={["none", "none", "flex", "flex"]}
        >
          {" "}
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex
          justify="center"
          margin="1rem"
          width="50vw"
          display={["none", "none", "flex", "flex"]}
        >
          <Flex direction="column" align="center">
            {following.length > 0 ? (
              following.map((user) => (
                <ProfileCard
                  key={user._id}
                  userId={user._id}
                  name={`${user.firstName} ${user.lastName}`}
                  username={user.username}
                  following={true}
                  image={`https://avatars.dicebear.com/api/identicon/${user?.username}.svg`}
                />
              ))
            ) : (
              <Flex direction="column" align="center">
                <Text fontSize="xl" fontWeight="bold" mt={2}>
                  You aren't following anyone yet. ☹️
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
      {/* Mobile View */}
      {isLoading ? (
        <Flex
          justify="center"
          align="center"
          width="100%"
          m="2rem"
          direction="column"
          display={["flex", "flex", "none", "none"]}
        >
          {" "}
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex
          justify="center"
          align="center"
          width="100%"
          direction="column"
          display={["flex", "flex", "none", "none"]}
        >
          {following.length > 0 ? (
            following.map((user) => (
              <ProfileCard
                key={user._id}
                userId={user._id}
                name={`${user.firstName} ${user.lastName}`}
                username={user.username}
                following={true}
                image={`https://avatars.dicebear.com/api/identicon/${user?.username}.svg`}
              />
            ))
          ) : (
            <Flex direction="column" align="center">
              <Text fontSize="xl" fontWeight="bold" mt={2}>
                You aren't following anyone yet. ☹️
              </Text>
              <Link to={`/explore`}>
                <Button mt={3}>Go to Explore</Button>
              </Link>
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
};
