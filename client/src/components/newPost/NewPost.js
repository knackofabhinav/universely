import { Button, Image, Textarea, Box, Flex, Text } from "@chakra-ui/react";
// import {changeTheme} from "../../features/theme/themeSlice"

export const NewPost = () => {
  const isDark = true;
  return (
    <Box
      w="90%"
      justify="center"
      align="center"
      h="11rem"
      borderWidth="1px"
      borderRadius="lg"
      bg={isDark ? "blackAlpha.600" : "whiteAlpha.600"}
      m="1rem"
    >
      <Flex>
        <Image
          src="https://pbs.twimg.com/profile_images/1373575950344974336/i_xo1F1l_400x400.jpg"
          boxSize="50px"
          objectFit="cover"
          borderRadius="full"
          mt="1rem"
          ml="1rem"
        />
        <Textarea
          placeholder="What's Happening?"
          border="none"
          m="1rem"
          fontSize="xl"
          resize="none"
        />
      </Flex>
      <Flex justify="flex-end" pr="1rem" align="center" w="100%" h="3rem">
        <Button>Post</Button>
      </Flex>
    </Box>
  );
};
