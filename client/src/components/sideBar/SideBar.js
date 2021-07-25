import { Flex, Button, Stack } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const SideBar = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const { isLoggedIn } = useSelector((state) => state.auth);

  const { username } = isLoggedIn && JSON.parse(localStorage.getItem("user"));

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
        <Stack
          w="50%"
          direction="column"
          display="flex"
          align="center"
          spacing={6}
          mt="2rem"
        >
          <Link to="/">
            <Button size="lg" colorScheme="blue" variant="ghost">
              Home
            </Button>
          </Link>
          <Link to="/following">
            <Button size="lg" colorScheme="blue" variant="ghost">
              Following
            </Button>
          </Link>
          <Link to="/notifications">
            <Button size="lg" colorScheme="blue" variant="ghost">
              Notifications
            </Button>
          </Link>
          <Link to={`/profile/${username}`}>
            <Button size="lg" colorScheme="blue" variant="ghost">
              Profile
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Flex>
  );
};
