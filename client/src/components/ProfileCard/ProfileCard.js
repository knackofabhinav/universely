import { Button, Image, Box, Flex, Text } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

export const ProfileCard = ({ username, name, following, image }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      w="24rem"
      bg={isDark ? "blackAlpha.600" : "whiteAlpha.600"}
      margin="1rem"
      h="6.5rem"
    >
      <Flex align="center" justify="space-between">
        <Flex direction="row" padding="1rem" align="center">
          <Image borderRadius="full" boxSize="70px" src={image} />
          <Flex direction="column" p="0.5rem">
            <Text>{name}</Text>
            <Text color="GrayText">@{username}</Text>
          </Flex>
        </Flex>
        {following ? (
          <Button m="1rem" colorScheme="messenger">
            Following
          </Button>
        ) : (
          <Button m="1rem">Follow</Button>
        )}
      </Flex>
    </Box>
  );
};
