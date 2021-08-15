import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { Flex, Text, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import authState from "../../features/userAuth/authSlice";
import { useDispatch } from "react-redux";
import { login } from "../../features/userAuth/authSlice";

export const Login = () => {
  const { isLoggedIn } = authState;
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const loginHandler = async (loginCredentials) => {
    try {
      await dispatch(login(loginCredentials));
      navigate(location.state?.from ? location.state.from : "/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {/* DESKTOP VIEW */}
      <Flex
        justify="center"
        display={["none", "none", "flex", "flex"]}
        align="center"
        w="50vw"
        direction="column"
      >
        <Text fontWeight="bold" fontSize="4xl" display="block" m="1rem">
          Login
        </Text>
        <Flex direction="column" padding="1rem">
          <Text m="0.5rem">Username</Text>
          <Input
            placeholder="Username"
            onChange={(e) =>
              setLoginCredentials((loginCredentials) => ({
                ...loginCredentials,
                username: e.target.value,
              }))
            }
            value={loginCredentials.username}
          />
          <Text m="0.5rem">Password</Text>
          <Flex>
            <Input
              onChange={(e) =>
                setLoginCredentials((loginCredentials) => ({
                  ...loginCredentials,
                  password: e.target.value,
                }))
              }
              value={loginCredentials.password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <Button
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </Flex>
          <Button
            onClick={() => {
              loginHandler(loginCredentials);
            }}
            mt="1rem"
            colorScheme="blue"
            variant="solid"
          >
            Submit
          </Button>
          <Link to="/signup">
            <Button m="1rem" colorScheme="blue" variant="link">
              New User? Click here
            </Button>
          </Link>
        </Flex>
      </Flex>
      {/* MOBILE VIEW */}
      {isLoggedIn ? (
        <Text>"User is Already Logged In" </Text>
      ) : (
        <Flex
          display={["flex", "flex", "none", "none"]}
          w="100vw"
          direction="column"
          align="center"
        >
          <Text
            fontWeight="bold"
            justify="center"
            w="100%"
            align="center"
            fontSize="4xl"
            display="block"
            m="1rem"
          >
            Login
          </Text>
          <Flex direction="column" padding="1rem" width="90%" align="center">
            <Text m="0.5rem" w="100%">
              Username
            </Text>
            <Input
              placeholder="Username"
              onChange={(e) =>
                setLoginCredentials((loginCredentials) => ({
                  ...loginCredentials,
                  username: e.target.value,
                }))
              }
              value={loginCredentials.username}
            />
            <Text m="0.5rem" w="100%">
              Password
            </Text>
            <Flex w="100%">
              <Input
                onChange={(e) =>
                  setLoginCredentials((loginCredentials) => ({
                    ...loginCredentials,
                    password: e.target.value,
                  }))
                }
                value={loginCredentials.password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <Button
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </Flex>
            <Button
              onClick={() => {
                loginHandler(loginCredentials);
              }}
              mt="1rem"
              colorScheme="blue"
              variant="solid"
            >
              Submit
            </Button>
            <Link to="/signup">
              <Button m="1rem" colorScheme="blue" variant="link">
                New User? Click here
              </Button>
            </Link>
          </Flex>
        </Flex>
      )}
    </>
  );
};
