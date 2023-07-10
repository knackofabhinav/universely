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
            src="https://imgr.search.brave.com/qM72OrPzyG_X5bm1WplYJrgAgshLELxXi2o9OqbcfxQ/fit/980/980/no/1/aHR0cDovL2dldGRy/YXdpbmdzLmNvbS92/ZWN0b3JzL3Byb2Zp/bGUtdmVjdG9yLTIu/cG5n"
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
