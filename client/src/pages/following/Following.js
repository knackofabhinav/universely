import { Flex, Text } from "@chakra-ui/react";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { useParams } from "react-router";
import { useEffect } from "react";
import {
  setFollowingUsers,
  profileState,
} from "../../features/profile/profileSlice";
import { API } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";

export const Following = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { following } = useSelector(profileState);

  useEffect(() => {
    (async () => {
      const res = await API.get(`/${username}/following`);
      console.log(res);
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
          <div>Hello</div>
        )}
      </Flex>
    </>
  );
};
