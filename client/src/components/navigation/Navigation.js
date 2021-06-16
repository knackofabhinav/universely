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

export const Navigation = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [display, changeDisplay] = useState("none");

  return (
    <Flex>
      <Box h="5rem"></Box>
      <Flex
        position="fixed"
        zIndex="100"
        bg={isDark ? "blackAlpha.900" : "whiteAlpha.900"}
        w="100vw"
        justify="space-between"
        align="center"
      >
        <Link to="/">
          <Box
            w="10rem"
            h="5rem"
            ml="1rem"
            justify="center"
            align="center"
            display={display === "flex" ? "none" : "flex"}
          >
            <Image src={isDark ? LogoWhite : LogoBlack} />
          </Box>
        </Link>
        {/* Desktop */}
        <Flex display={["none", "none", "flex", "flex"]}>
          <Link to="/">
            <Button
              as="a"
              cursor="pointer"
              variant="ghost"
              aria-label="Home"
              my={5}
              w="100%"
            >
              Home
            </Button>
          </Link>
          <Link to="/friends">
            <Button
              as="a"
              cursor="pointer"
              variant="ghost"
              aria-label="Friends"
              my={5}
              w="100%"
            >
              Friends
            </Button>
          </Link>
          <Link to="/profile">
            <Button
              as="a"
              cursor="pointer"
              variant="ghost"
              aria-label="Profile"
              my={5}
              w="100%"
            >
              Profile
            </Button>
          </Link>
          <Link to="/notifications">
            <Button
              as="a"
              cursor="pointer"
              variant="ghost"
              aria-label="Notifications"
              my={5}
              px={10}
              w="100%"
            >
              Notifications
            </Button>
          </Link>
        </Flex>

        {/* Mobile */}
        <Flex
          align="center"
          mr="2rem"
          display={display === "flex" ? "none" : "flex"}
        >
          <IconButton
            aria-label="Open Menu"
            size="lg"
            mr={2}
            icon={<HamburgerIcon />}
            onClick={() => changeDisplay("flex")}
            display={["flex", "flex", "none", "none"]}
          />
          <Switch m="1rem" isChecked={isDark} onChange={toggleColorMode} />
        </Flex>
      </Flex>
      {/* Mobile Content */}
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
        background="blackAlpha.900"
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
              as="a"
              variant="ghost"
              aria-label="Home"
              my={5}
              w="100%"
            >
              Home
            </Button>
          </Link>
          <Link to="/friends">
            <Button
              cursor="pointer"
              as="a"
              variant="ghost"
              aria-label="Friends"
              my={5}
              w="100%"
            >
              Friends
            </Button>
          </Link>
          <Link to="/profile">
            <Button
              cursor="pointer"
              as="a"
              variant="ghost"
              aria-label="Profile"
              my={5}
              w="100%"
            >
              Profile
            </Button>
          </Link>
          <Link to="/notification">
            <Button
              cursor="pointer"
              as="a"
              variant="ghost"
              aria-label="Notifications"
              my={5}
              w="100%"
            >
              Notifications
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
