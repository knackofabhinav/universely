import { Button, Text, Flex, Image, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { Feed } from "../../components/feed/Feed";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { profileState } from "../../features/profile/profileSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { FollowButton } from "./FollowButton";
import { AddIcon } from "@chakra-ui/icons";

export const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState({
    username: "",
    _id: "",
    bio: "",
    posts: [],
    firstName: "",
    lastName: "",
    followers: [],
    following: [],
  });

  const rootProfile = useSelector(profileState);

  useEffect(() => {
    (async function () {
      const res = await axios.get(`${username}`);
      setProfile((profile) => ({ ...profile, ...res.data.user }));
    })();
  }, [username]);

  const updatePost = async () => {
    const res = await axios.get(`${username}`);
    console.log(res.data);
    setProfile((profile) => ({ ...profile, ...res.data.user }));
  };

  return (
    <>
      {/* For Desktop View */}
      {profile.username === "" ? (
        <Flex
          align="center"
          margin="1rem"
          direction="column"
          justifyContent="center"
          width="50vw"
          display={["none", "none", "flex", "flex"]}
        >
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex
          align="center"
          margin="1rem"
          direction="column"
          justifyContent="center"
          width="50vw"
          display={["none", "none", "flex", "flex"]}
        >
          <Flex
            margin="1rem"
            justifyContent="center"
            direction="column"
            align="center"
            w="100%"
          >
            <Flex
              w="80%"
              align="center"
              direction="column"
              justifyContent="space-between"
            >
              <Flex>
                <Image
                  boxSize="100px"
                  borderRadius="100%"
                  src={`https://avatars.dicebear.com/api/identicon/${profile.username}.svg`}
                />
                <Flex direction="column" justifyContent="center" px="2rem">
                  <Text fontSize="2xl" fontWeight="bold">
                    {`${profile.firstName} ${profile.lastName}`}
                  </Text>
                  <Text fontWeight="bold" color="gray.700" fontSize="xl">
                    @{profile.username}
                  </Text>
                </Flex>
              </Flex>
              <Flex margin="1rem" direction="column" align="center">
                <FollowButton
                  username={username}
                  rootProfile={rootProfile}
                  profile={profile}
                />
              </Flex>
            </Flex>
            <Text
              padding="1rem"
              fontSize="xl"
              fontStyle="italic"
              align="center"
            >
              {profile.bio}
            </Text>
          </Flex>
          <Flex w="80%" mb="2rem" align="center" direction="column">
            <Flex justifyContent="space-between" w="50%">
              <Flex direction="column" alignItems="center">
                <Button variant="ghost">{profile.posts.length}</Button>
                <Text>Posts</Text>
              </Flex>
              <Flex direction="column" alignItems="center">
                <Link to={`/followers/${profile.username}`}>
                  <Button variant="ghost">{profile.followers.length}</Button>
                </Link>
                <Text>Followers</Text>
              </Flex>
              <Flex direction="column" alignItems="center">
                <Link to={`/following/${profile.username}`}>
                  <Button variant="ghost">{profile.following.length}</Button>
                </Link>
                <Text>Following</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex direction="column" w="100%">
            {profile.posts.length !== 0 ? (
              profile.posts.map((post) => (
                <Feed
                  updatePost={updatePost}
                  key={post._id}
                  post={post}
                  setProfile={setProfile}
                  profile={profile}
                />
              ))
            ) : (
              <Flex justify="center" align="center" flexDirection="column">
                <Text
                  color="gray.500"
                  fontWeight="bold"
                  fontSize="lg"
                  p="2rem"
                  textAlign="center"
                >
                  You don't any posts yet. Go home and create a new post.
                </Text>
                <Link to="/">
                  <Button fontWeight="bold" m="2rem">
                    <AddIcon />
                  </Button>
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
      {/* Mobile View */}
      {profile.username === "" ? (
        <Flex
          align="center"
          justify="center"
          direction="column"
          m="2rem"
          width="100vw"
          display={["flex", "flex", "none", "none"]}
        >
          <Spinner size="xl" />
        </Flex>
      ) : (
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
                src={`https://avatars.dicebear.com/api/identicon/${profile.username}.svg`}
              />
              <Flex margin="1rem" direction="column" align="center">
                <Text fontWeight="bold" fontSize="2xl" p="1rem">
                  @{profile.username}
                </Text>
                <FollowButton
                  username={username}
                  rootProfile={rootProfile}
                  profile={profile}
                />
              </Flex>
            </Flex>
          </Flex>
          <Flex w="80%" mb="2rem" align="center" direction="column">
            <Text fontSize="xl" fontWeight="bold">
              {`${profile.firstName} ${profile.lastName}`}
            </Text>
            <Text padding="1rem" align="center">
              {profile.bio}
            </Text>
            <Flex justifyContent="space-between" w="100%">
              <Flex direction="column" alignItems="center">
                <Button variant="ghost">{profile.posts.length}</Button>
                <Text>Posts</Text>
              </Flex>
              <Flex direction="column" alignItems="center">
                <Link to={`/followers/${profile.username}`}>
                  <Button variant="ghost">{profile.followers.length}</Button>
                </Link>
                <Text>Followers</Text>
              </Flex>
              <Flex direction="column" alignItems="center">
                <Link to={`/following/${profile.username}`}>
                  <Button variant="ghost">{profile.following.length}</Button>
                </Link>
                <Text>Following</Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex direction="column" align="center" w="100%">
            {profile.posts.length !== 0 ? (
              profile.posts.map((post) => (
                <Feed
                  updatePost={updatePost}
                  key={post._id}
                  post={post}
                  setProfile={setProfile}
                  profile={profile}
                />
              ))
            ) : (
              <Flex justify="center" align="center" flexDirection="column">
                <Text
                  color="gray.500"
                  fontWeight="bold"
                  fontSize="lg"
                  p="2rem"
                  textAlign="center"
                >
                  You don't any posts yet. Go home and create a new post.
                </Text>
                <Link to="/">
                  <Button fontWeight="bold" m="2rem">
                    <AddIcon />
                  </Button>
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
};
