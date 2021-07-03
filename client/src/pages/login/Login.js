import { useState } from "react";
import { Flex, Text, Input, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { login, authState } from "../../features/userAuth/authSlice";
import { Link } from "react-router-dom";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const loginHandler = (loginCredentials) => {
    dispatch(login(loginCredentials));
  };

  return (
    <Flex justify="center" align="center" width="100%" direction="column">
      <Text fontWeight="bold" fontSize="4xl" display="block" m="1rem">
        Login
      </Text>
      <Flex direction="column" padding="1rem" width="90vw" height="80vh">
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
          type="submit"
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
  );
};
