import { Button, Image, Box, Flex, Text } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FollowButton } from "../../pages/profile/FollowButton";
import { profileState } from "../../features/profile/profileSlice";
import { useSelector } from "react-redux";

export const ProfileCard = ({ username, name, userId, image }) => {
  const rootProfile = useSelector(profileState);
  const profile = {
    usename: username,
    _id: userId,
  };
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Box
      width="90%"
      borderWidth="1px"
      borderRadius="lg"
      bg={isDark ? "blackAlpha.600" : "whiteAlpha.600"}
      margin="1rem"
    >
      <Link to={`/profile/${username}`} w="100%">
        <Flex align="center" justify="space-between">
          <Flex direction="row" padding="1rem" align="center">
            <Image borderRadius="full" boxSize="70px" src={image} />
            <Flex direction="column" p="0.5rem">
              <Text>{name}</Text>
              <Text color="GrayText">@{username}</Text>
            </Flex>
          </Flex>
          <Flex onClick={(e) => e.preventDefault()} p="0.5rem">
            <FollowButton
              username={username}
              rootProfile={rootProfile}
              profile={profile}
              userId={userId}
              profileCard
            />
          </Flex>
        </Flex>
      </Link>
    </Box>
  );
};
