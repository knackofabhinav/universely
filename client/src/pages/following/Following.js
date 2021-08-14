import { Flex, Text, Button } from "@chakra-ui/react";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { useParams } from "react-router";
import { useEffect } from "react";
import {
  setFollowingUsers,
  profileState,
} from "../../features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

export const Following = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { following } = useSelector(profileState);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/${username}/following`);
      dispatch(setFollowingUsers(res.data.following));
    })();
  }, [dispatch, username]);

  return (
    <>
      {/* Desktop View */}
      <Flex
        justify="center"
        margin="1rem"
        width="50vw"
        display={["none", "none", "flex", "flex"]}
      >
        <Flex direction="column" align="center">
          {following.length > 0 &&
            following.map((user) => (
              <ProfileCard
                key={user._id}
                name={`${user.firstName} ${user.lastName}`}
                username={user.username}
                following={true}
                image={
                  "https://imgr.search.brave.com/qM72OrPzyG_X5bm1WplYJrgAgshLELxXi2o9OqbcfxQ/fit/980/980/no/1/aHR0cDovL2dldGRy/YXdpbmdzLmNvbS92/ZWN0b3JzL3Byb2Zp/bGUtdmVjdG9yLTIu/cG5n"
                }
              />
            ))}
        </Flex>
      </Flex>

      {/* Mobile View */}

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
    </>
  );
};
