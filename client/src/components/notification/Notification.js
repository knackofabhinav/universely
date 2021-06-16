import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

export const Notification = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Box
      w="100%"
      justify="center"
      align="center"
      borderWidth="1px"
      borderRadius="lg"
      bg={isDark ? "blackAlpha.600" : "whiteAlpha.600"}
    >
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Image
            src="https://pbs.twimg.com/profile_images/1373575950344974336/i_xo1F1l_400x400.jpg"
            boxSize="50px"
            objectFit="cover"
            borderRadius="full"
            m="1rem"
          />
          <Text>
            <Text as="span" fontWeight="bold" mx="0.1rem">
              Abhinav Patel
            </Text>{" "}
            liked your tweet.
          </Text>
        </Flex>
        <Text m="1rem" color="ButtonShadow">
          June 21 2021
        </Text>
      </Flex>
    </Box>
  );
};
