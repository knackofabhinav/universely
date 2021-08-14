import { Button, Text, Flex, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { Feed } from "../../components/feed/Feed";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  unfollowUser,
  profileState,
} from "../../features/profile/profileSlice";
import { Link } from "react-router-dom";
import { EditProfileModal } from "./EditProfileModal";
import axios from "axios";
import { useState } from "react";

export const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
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
  console.log(profile.following);
  useEffect(() => {
    (async function () {
      const res = await axios.get(`${username}`);
      setProfile(res.data.user);
    })();
  }, [username, setProfile, dispatch]);

  const rootProfile = useSelector(profileState);
  return (
    <>
      {/* For Desktop View */}
      {profile && (
        <Flex
          align="center"
          margin="1rem"
          direction="column"
          justifyContent="center"
          width="50vw"
          display={["none", "none", "flex", "flex"]}
        >
          <Flex w="100%">
            <Flex margin="1rem" direction="column" w="100%" align="center">
              <Image
                boxSize="100px"
                borderRadius="100%"
                src={`https://avatars.dicebear.com/api/identicon/${profile.username}.svg`}
              />
              <Flex margin="1rem" direction="column" w="20%">
                <Text fontWeight="bold" fontSize="2xl" align="center">
                  {profile.username}
                </Text>
                {username === rootProfile.username && <EditProfileModal />}
              </Flex>
            </Flex>
          </Flex>
          <Flex margin="1rem" align="center" direction="column">
            <Text fontSize="xl" fontWeight="bold">
              {`${profile.firstName} ${profile.lastName}`}
            </Text>
            <Text align="center">{profile.bio}</Text>
          </Flex>
          <Flex direction="column" w="100%">
            {profile.posts.map((post) => (
              <div key={post._id}>
                <Feed post={post} />
              </div>
            ))}
          </Flex>
        </Flex>
      )}
      {/* Mobile View */}
      {profile && (
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
                <Text fontWeight="bold" fontSize="2xl">
                  {profile.username}
                </Text>
                {username === rootProfile.username ? (
                  <EditProfileModal />
                ) : (
                  username !== rootProfile.username &&
                  (profile.following.some((id) => id === rootProfile._id) ? (
                    <Button
                      onClick={() => {
                        dispatch(followUser({ username: profile.username }));
                      }}
                    >
                      Follow
                    </Button>
                  ) : (
                    <Button
                      m="1rem"
                      colorScheme="messenger"
                      onClick={() => {
                        dispatch(unfollowUser({ username: profile.username }));
                      }}
                    >
                      Following
                    </Button>
                  ))
                )}
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
                  key={post._id}
                  post={post}
                  setProfile={setProfile}
                  profile={profile}
                />
              ))
            ) : (
              <Flex flexDirection="column">
                <Text fontWeight="bold" borderTop="1px solid black">
                  Your Haven't created any posts yet.
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
};
