import { useState } from "react";
import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
  Image,
  Box,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import LogoBlack from "../../assets/logo-black.png";
import LogoWhite from "../../assets/logo-white.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/userAuth/authSlice";

export const Navigation = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [display, changeDisplay] = useState("none");
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { username } = isLoggedIn && JSON.parse(localStorage.getItem("user"));

  return (
    <Flex h="5rem">
      {/* DESKTOP  VIEW*/}
      <Flex
        position="fixed"
        zIndex="100"
        bg={isDark ? "blackAlpha.900" : "whiteAlpha.900"}
        w="100vw"
        justify="space-between"
        align="center"
        display={["none", "none", "flex", "flex"]}
      >
        <Link to="/">
          <Box
            w="10rem"
            h="5rem"
            ml="1rem"
            justify="center"
            align="center"
            display="flex"
          >
            <Image src={isDark ? LogoWhite : LogoBlack} />
          </Box>
        </Link>
        {isLoggedIn && (
          <Flex>
            <Link to="/">
              <Button
                cursor="pointer"
                variant="ghost"
                aria-label="Home"
                my={5}
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
                my={5}
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
                my={5}
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
                my={5}
                w="100%"
              >
                Followers
              </Button>
            </Link>

            {/* <Link to="/notifications">
              <Button
                cursor="pointer"
                variant="ghost"
                aria-label="Notifications"
                my={5}
                px={5}
                w="100%"
              >
                Notifications
              </Button>
            </Link> */}
          </Flex>
        )}
        <Flex>
          {isLoggedIn ? (
            <Button
              cursor="pointer"
              variant="ghost"
              aria-label="Logout"
              my={5}
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </Button>
          ) : (
            <Flex>
              <Link to="/login">
                <Button
                  cursor="pointer"
                  variant="ghost"
                  aria-label="Login"
                  my={5}
                  w="100%"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  cursor="pointer"
                  variant="ghost"
                  aria-label="Signup"
                  my={5}
                  w="100%"
                >
                  Signup
                </Button>
              </Link>{" "}
            </Flex>
          )}
          <Switch m="2rem" isChecked={isDark} onChange={toggleColorMode} />
        </Flex>
      </Flex>

      {/* MOBILE VIEW*/}
      <Flex
        position="fixed"
        zIndex="10"
        bg={isDark ? "blackAlpha.900" : "whiteAlpha.900"}
        w="100vw"
        justify="space-between"
        align="center"
        display={["flex", "flex", "none", "none"]}
      >
        <Link to="/">
          <Box
            w="10rem"
            h="5rem"
            ml="1rem"
            justify="center"
            align="center"
            display="flex"
          >
            <Image src={isDark ? LogoWhite : LogoBlack} />
          </Box>
        </Link>
        {isLoggedIn ? (
          <Flex>
            <IconButton
              aria-label="Open Menu"
              size="lg"
              mr={2}
              icon={<HamburgerIcon />}
              onClick={() => changeDisplay("flex")}
              display={["flex", "flex", "none", "none"]}
            />
            <Switch
              m="1rem"
              isChecked={isDark}
              onChange={toggleColorMode}
              pr={2}
            />
          </Flex>
        ) : (
          <Flex justifyContent="flex-end" alignItems="center">
            <Link to="/login">
              <Button
                cursor="pointer"
                variant="ghost"
                aria-label="Login"
                my={5}
                w="100%"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                cursor="pointer"
                variant="ghost"
                aria-label="Signup"
                my={5}
                w="100%"
              >
                Signup
              </Button>
            </Link>
            <Switch m="1rem" isChecked={isDark} onChange={toggleColorMode} />
          </Flex>
        )}
      </Flex>
      <Flex
        w="100vw"
        display={display}
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
        background={isDark ? "blackAlpha.900" : "whiteAlpha.900"}
      >
        <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Open Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => changeDisplay("none")}
          />
        </Flex>

        <Flex flexDir="column" align="center">
          <Link to="/">
            <Button
              cursor="pointer"
              variant="ghost"
              aria-label="Home"
              my={5}
              w="100%"
              onClick={() => changeDisplay("none")}
            >
              Home
            </Button>
          </Link>
          <Link to="/explore">
            <Button
              cursor="pointer"
              variant="ghost"
              aria-label="Home"
              my={5}
              w="100%"
              onClick={() => changeDisplay("none")}
            >
              Explore
            </Button>
          </Link>
          <Link to={`/profile/${username}`}>
            <Button
              cursor="pointer"
              variant="ghost"
              aria-label="Profile"
              my={5}
              w="100%"
              onClick={() => changeDisplay("none")}
            >
              Profile
            </Button>
          </Link>
          <Link to={`/following/${username}`}>
            <Button
              cursor="pointer"
              variant="ghost"
              aria-label="Following"
              my={5}
              w="100%"
              onClick={() => changeDisplay("none")}
            >
              Following
            </Button>
          </Link>
          <Link to={`/followers/${username}`}>
            <Button
              cursor="pointer"
              variant="ghost"
              aria-label="Following"
              my={5}
              w="100%"
              onClick={() => changeDisplay("none")}
            >
              Followers
            </Button>
          </Link>
          {!isLoggedIn && (
            <Link to="/login">
              <Button
                cursor="pointer"
                variant="ghost"
                aria-label="Login"
                my={5}
                w="100%"
                onClick={() => changeDisplay("none")}
              >
                Login
              </Button>
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/signup">
              <Button
                cursor="pointer"
                variant="ghost"
                aria-label="Signup"
                my={5}
                w="100%"
                onClick={() => changeDisplay("none")}
              >
                Signup
              </Button>
            </Link>
          )}

          {/* <Link to="/notifications">
            <Button
              cursor="pointer"
              variant="ghost"
              aria-label="Notifications"
              my={5}
              w="100%"
              onClick={() => changeDisplay("none")}
            >
              Notifications
            </Button>
          </Link> */}
          {isLoggedIn && (
            <Button
              cursor="pointer"
              variant="ghost"
              aria-label="Logout"
              my={5}
              onClick={() => {
                dispatch(logout());
                changeDisplay("none");
              }}
            >
              Logout
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
