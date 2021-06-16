import { Flex, Button, Stack } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

export const SideBar = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Flex width="25rem" h="95vh" display={["none", "none", "flex", "flex"]}>
      <Flex
        borderRight={isDark ? "1px solid #171923" : "1px solid #E2E8F0"}
        direction="column"
        h="95vh"
        position="fixed"
        align="center"
        justify="space-between"
        w="20rem"
      >
        <Stack w="50%" direction="column" spacing={6} mt="2rem">
          <Button size="lg" colorScheme="blue" variant="ghost">
            Home
          </Button>
          <Button size="lg" colorScheme="blue" variant="ghost">
            Friends
          </Button>
          <Button size="lg" colorScheme="blue" variant="ghost">
            Notifications
          </Button>
          <Button size="lg" colorScheme="blue" variant="ghost">
            Profile
          </Button>
        </Stack>
        <Button size="md" mb="2rem" colorScheme="blue" variant="ghost">
          About us
        </Button>
      </Flex>
    </Flex>
  );
};
