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
            <Button
              cursor="pointer"
              variant="ghost"
              aria-label="Home"
              my={2}
              w="100%"
            >
              Home
            </Button>
          </Link>
          <Link to={`/profile/${username}`}>
            <Button
              cursor="pointer"
              variant="ghost"
              aria-label="Profile"
              my={2}
              w="100%"
            >
              Profile
            </Button>
          </Link>
          <Link to={`/following/${username}`}>
            <Button
              cursor="pointer"
              variant="ghost"
              aria-label="Following"
              my={2}
              w="100%"
            >
              Following
            </Button>
          </Link>
          <Link to={`/followers/${username}`}>
            <Button
              cursor="pointer"
              variant="ghost"
              aria-label="Following"
              my={2}
              w="100%"
            >
              Followers
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Flex>
  );
};
