import { Button, Text, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../../features/profile/profileSlice";
import { EditProfileModal } from "./EditProfileModal";
import { useState } from "react";

export const FollowButton = ({
  username,
  profileCard,
  rootProfile,
  profile,
  userId,
}) => {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  if (username === rootProfile.username) {
    return profileCard ? (
      <Link to={`/profile/${username}`}>
        <Text fontWeight="bold" p="1rem" color="teal">
          View Profile
        </Text>
      </Link>
    ) : (
      <EditProfileModal />
    );
  } else {
    if (!rootProfile?.following.some((id) => id === profile._id)) {
      return (
        <Button
          m="1rem"
          isLoading={isLoading}
          onClick={async () => {
            setLoading(true);
            profileCard
              ? await dispatch(followUser({ username }))
              : await dispatch(followUser({ username: profile.username }));
            toast({
              title: `Followed ${username} Successfully.`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            setLoading(false);
          }}
        >
          Follow
        </Button>
      );
    } else {
      return (
        <Button
          isLoading={isLoading}
          m="1rem"
          colorScheme="messenger"
          onClick={async () => {
            setLoading(true);
            profileCard
              ? await dispatch(unfollowUser({ username }))
              : await dispatch(unfollowUser({ username: profile.username }));
            toast({
              title: `Unfollowed ${username} Successfully.`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            setLoading(false);
          }}
        >
          Following
        </Button>
      );
    }
  }
};
