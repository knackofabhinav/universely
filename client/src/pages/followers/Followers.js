import { Flex, Text, Button, Spinner } from "@chakra-ui/react";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Followers = () => {
  const [followers, setFollowers] = useState([]);
  const { username } = useParams();
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await axios.get(`/${username}/followers`);
      setFollowers(res.data.followers);
      setLoading(false);
    })();
  }, [username]);

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
            {followers.length > 0 ? (
              followers.map((user) => (
                <ProfileCard
                  key={user._id}
                  name={`${user.firstName} ${user.lastName}`}
                  username={user.username}
                  userId={user.id}
                  following={true}
                  image={`https://avatars.dicebear.com/api/identicon/${user?.username}.svg`}
                />
              ))
            ) : (
              <Flex direction="column" align="center">
                <Text fontSize="xl" fontWeight="bold" mt={2}>
                  No one follows you yet. ☹️
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      )}

      {/*  Mobile View */}
      {isLoading ? (
        <Flex
          justify="center"
          align="center"
          m="2rem"
          width="100%"
          direction="column"
          display={["flex", "flex", "none", "none"]}
        >
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
          {followers.length > 0 ? (
            followers.map((user) => (
              <ProfileCard
                key={user._id}
                name={`${user.firstName} ${user.lastName}`}
                username={user.username}
                userId={user._id}
                following={true}
                image={`https://avatars.dicebear.com/api/identicon/${user?.username}.svg`}
              />
            ))
          ) : (
            <Flex direction="column" align="center">
              <Text fontSize="xl" fontWeight="bold" mt={2}>
                No one follows you yet. ☹️
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
