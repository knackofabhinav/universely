import { Flex, Input, Text, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { useSelector } from "react-redux";
import { profileState } from "../../features/profile/profileSlice";

export const Explore = ({ desktop }) => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setLoading] = useState(true);
  const filteredUsers = users.filter((user) =>
    user.username.includes(searchInput)
  );
  const profile = useSelector(profileState);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get("/explore");
        const users = res.data.users.filter((user) => user._id !== profile._id);
        setUsers(users);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [profile._id]);

  return isLoading ? (
    <Flex width="100%" m="2rem" justify="center" align="center">
      <Spinner size="xl" />
    </Flex>
  ) : (
    <Flex width="100%" align="center" direction="column">
      {!desktop && (
        <Text m="2rem" fontSize="2xl" fontWeight="bold">
          Explore People
        </Text>
      )}
      <Flex width="90%">
        <Input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          placeholder="Enter username"
        />
      </Flex>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => {
          return (
            <Flex key={user._id} width="100%" align="center" direction="column">
              <ProfileCard
                username={user.username}
                userId={user._id}
                name={`${user.firstName} ${user.lastName}`}
                image={`https://avatars.dicebear.com/api/identicon/${user?.username}.svg`}
              />
            </Flex>
          );
        })
      ) : (
        <Text m="0.5rem" fontWeight="bold">
          No user found.
        </Text>
      )}
    </Flex>
  );
};
