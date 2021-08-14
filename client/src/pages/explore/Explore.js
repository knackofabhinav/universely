import { Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { useSelector } from "react-redux";
import { profileState } from "../../features/profile/profileSlice";

export const Explore = () => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const filteredUsers = users.filter((user) =>
    user.username.includes(searchInput)
  );
  const profile = useSelector(profileState);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/explore");
        const users = res.data.users.filter((user) => user._id !== profile._id);
        setUsers(users);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [profile._id]);

  return (
    //   MOBILE VIEW
    <Flex width="100%" align="center" direction="column">
      <Text m={2} fontSize="4xl" fontWeight="bold">
        Explore People
      </Text>
      <Flex width="90%">
        <Input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          placeholder="let's find awesome people"
        />
      </Flex>
      {filteredUsers.map((user) => {
        return (
          <Flex key={user._id} width="100%" align="center" direction="column">
            <ProfileCard
              username={user.username}
              name={`${user.firstName} ${user.lastName}`}
              image={`https://avatars.dicebear.com/api/identicon/${user?.username}.svg`}
            />
          </Flex>
        );
      })}
    </Flex>
  );
};
