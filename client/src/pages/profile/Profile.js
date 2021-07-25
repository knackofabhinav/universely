import { Button, Text, Flex, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { Feed } from "../../components/feed/Feed";
import { useParams } from "react-router";
import { API } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser, profileState } from "../../features/profile/profileSlice";
import { Link } from "react-router-dom";

export const Profile = () => {
  const { username } = useParams();
  console.log(username);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      const res = await API.get(`${username}`);
      console.log(res);
      dispatch(setUser(res.data.user));
    })();
  }, [username, dispatch]);

  const profile = useSelector(profileState);

  return (
    <>
      {/* For Desktop View */}
      <Flex
        align="center"
        margin="1rem"
        direction="column"
        width="50vw"
        display={["none", "none", "flex", "flex"]}
      >
        <Flex>
          <Flex margin="1rem" direction="column" align="center">
            <Image
              boxSize="100px"
              borderRadius="100%"
              src="https://pbs.twimg.com/profile_images/1373575950344974336/i_xo1F1l_400x400.jpg"
            />
            <Flex margin="1rem" direction="column">
              <Text fontWeight="bold" fontSize="2xl">
                {profile.username}
              </Text>
              <Button>Edit Profile</Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex margin="1rem" align="center" direction="column">
          <Text fontSize="xl" fontWeight="bold">
            {`${profile.firstName} ${profile.lastName}`}
          </Text>
          <Text align="center">{profile.bio}</Text>
        </Flex>
        <Flex direction="column">
          {profile.posts.map((post) => (
            <div key={post._id}>
              <Feed post={post} />
            </div>
          ))}
        </Flex>
      </Flex>
      {/* Mobile View */}
      <Flex
        align="center"
        justify="center"
        direction="column"
        width="100vw"
        display={["flex", "flex", "none", "none"]}
      >
        <Flex>
          <Flex margin="1rem" direction="column" align="center">
            <Image
              boxSize="100px"
              borderRadius="100%"
              src="https://pbs.twimg.com/profile_images/1373575950344974336/i_xo1F1l_400x400.jpg"
            />
            <Flex margin="1rem" direction="column" align="center">
              <Text fontWeight="bold" fontSize="2xl">
                {profile.username}
              </Text>
              <Button>Edit Profile</Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex margin="1rem" align="center" direction="column">
          <Text fontSize="xl" fontWeight="bold">
            {`${profile.firstName} ${profile.lastName}`}
          </Text>
          <Text padding="1rem" align="center">
            {profile.bio}
          </Text>
          <Flex justifyContent="space-between" w="100%">
            <Flex direction="column">
              <Button variant="ghost">{profile.posts.length}</Button>
              <Text>Posts</Text>
            </Flex>
            <Flex direction="column">
              <Button variant="ghost">{profile.followers.length}</Button>
              <Text>Followers</Text>
            </Flex>
            <Flex direction="column">
              <Button variant="ghost">{profile.following.length}</Button>
              <Text>Following</Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex direction="column" align="center">
          {profile.posts.length !== 0 ? (
            profile.posts.map((post) => <Feed post={post} />)
          ) : (
            <Flex flexDirection="column">
              <Text fontWeight="bold" borderTop="1px solid black">
                Your Haven't created any posts yet.
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};
