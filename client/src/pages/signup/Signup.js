import { useState } from "react";
import { Flex, Button, Text, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { signup } from "../../features/userAuth/authSlice";
import { useDispatch } from "react-redux";

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState("");
  const [signupCredentials, setSignupCredentials] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const signupHandler = async (signupCredentials) => {
    if (
      signupCredentials.username === "" ||
      signupCredentials.password === "" ||
      signupCredentials.email === "" ||
      signupCredentials.firstName === ""
    ) {
      setValidationError("*Please enter All the required fields");
    } else {
      try {
        await dispatch(signup(signupCredentials));
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {/* DESKTOP  VIEW */}
      <Flex
        justify="center"
        display={["none", "none", "flex", "flex"]}
        align="center"
        w="50vw"
        direction="column"
      >
        <Text fontWeight="bold" fontSize="4xl" display="block" m="1rem">
          Signup
        </Text>
        <Flex direction="column" padding="1rem">
          <Text m="0.5rem">Username</Text>
          <Input
            placeholder="Type your username"
            value={signupCredentials.username}
            onChange={(e) =>
              setSignupCredentials((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
          />
          <Text m="0.5rem">Password</Text>
          <Input
            placeholder="Type your password"
            type="password"
            value={signupCredentials.password}
            onChange={(e) =>
              setSignupCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
          <Text m="0.5rem">First Name</Text>
          <Input
            placeholder="John"
            value={signupCredentials.firstName}
            onChange={(e) =>
              setSignupCredentials((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
          />

          <Text m="0.5rem">Last Name</Text>
          <Input
            placeholder="Wick"
            value={signupCredentials.lastName}
            onChange={(e) =>
              setSignupCredentials((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
          />
          <Text m="0.5rem">Email</Text>
          <Input
            type="email"
            placeholder="johnwick@gmail.com"
            value={signupCredentials.email}
            onChange={(e) =>
              setSignupCredentials((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
          <Button
            type="submit"
            onClick={() => signupHandler(signupCredentials)}
            mt="1rem"
            colorScheme="blue"
            variant="solid"
          >
            Submit
          </Button>
          <Link to="/login">
            <Button m="1rem" colorScheme="blue" variant="link">
              Already have an account? Click Here
            </Button>
          </Link>
        </Flex>
      </Flex>

      {/* MOBILE VIEW */}
      <Flex
        display={["flex", "flex", "none", "none"]}
        w="100vw"
        direction="column"
        align="center"
      >
        <Text fontWeight="bold" fontSize="4xl" display="block" m="1rem">
          Signup
        </Text>
        <Flex direction="column" padding="1rem" width="90%">
          <Text m="0.5rem">Username*</Text>
          <Input
            required={true}
            placeholder="Type your username"
            value={signupCredentials.username}
            onChange={(e) =>
              setSignupCredentials((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
          />
          <Text m="0.5rem">Password*</Text>
          <Input
            placeholder="Type your password"
            type="password"
            value={signupCredentials.password}
            onChange={(e) =>
              setSignupCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
          <Text m="0.5rem">First Name*</Text>
          <Input
            placeholder="John"
            value={signupCredentials.firstName}
            onChange={(e) =>
              setSignupCredentials((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
          />

          <Text m="0.5rem">Last Name</Text>
          <Input
            placeholder="Wick"
            value={signupCredentials.lastName}
            onChange={(e) =>
              setSignupCredentials((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
          />
          <Text m="0.5rem">Email*</Text>
          <Input
            type="email"
            placeholder="johnwick@gmail.com"
            value={signupCredentials.email}
            onChange={(e) =>
              setSignupCredentials((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
          <Text color="#E53E3E">{validationError}</Text>
          <Button
            type="submit"
            onClick={() => signupHandler(signupCredentials)}
            mt="1rem"
            colorScheme="blue"
            variant="solid"
          >
            Submit
          </Button>
          <Link to="/login">
            <Button m="1rem" colorScheme="blue" variant="link">
              Already have an account? Click Here
            </Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );
};
