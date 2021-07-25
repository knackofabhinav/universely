import { Flex, Box, Button, Image, Text } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { profileState } from "../../features/profile/profileSlice";
import { useSelector } from "react-redux";

export const Feed = ({ post }) => {
  const profile = useSelector(profileState);
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box
      w="90%"
      justify="center"
      align="center"
      borderWidth="1px"
      borderRadius="lg"
      bg={isDark ? "blackAlpha.600" : "whiteAlpha.600"}
      m="1rem"
    >
      <Flex justify="space-between">
        <Flex align="center">
          <Image
            src="https://pbs.twimg.com/profile_images/1373575950344974336/i_xo1F1l_400x400.jpg"
            boxSize="50px"
            objectFit="cover"
            borderRadius="full"
            mt="1rem"
            ml="1rem"
          />
          <Flex margin="1rem" textAlign="left">
            <Text
              color={isDark ? "whiteAlpha" : "blackAlpha"}
              fontWeight="bold"
              fontSize="large"
            >
              {profile.firstName + " " + profile.lastName}
            </Text>
            <Text mx="0.3rem" color="GrayText">
              @{profile.username}
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Text m="1rem" color="GrayText">
            {" "}
            {formatDate(post?.createdAt)}
          </Text>
        </Flex>
      </Flex>
      <Flex width="100%">
        <Text
          align="left"
          p="1rem"
          pb="1rem"
          color={isDark ? "whiteAlpha" : "blackAlpha"}
        >
          {post && post?.caption}
        </Text>
      </Flex>
      <Flex
        justify={"space-between"}
        position="relative"
        align="center"
        p="1rem"
      >
        <Button>Upvote</Button>
        <Button>Comment</Button>
        {/* {myPost && <Button>Delete</Button>} */}
      </Flex>
    </Box>
  );
};
