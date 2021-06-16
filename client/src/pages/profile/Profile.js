import { Button, Text, Flex, Image } from "@chakra-ui/react";
import { Feed } from "../../components/feed/Feed";

export const Profile = () => {
  return (
    <Flex>
      {/* For Desktop View */}
      <Flex
        align="center"
        margin="1rem"
        direction="column"
        width="50vw"
        display={["none", "none", "flex", "flex"]}
      >
        <Flex>
          <Flex margin="1rem" direction="column" align="center">
            <Image
              boxSize="100px"
              borderRadius="100%"
              src="https://pbs.twimg.com/profile_images/1373575950344974336/i_xo1F1l_400x400.jpg"
            />
            <Flex margin="1rem" direction="column">
              <Text fontWeight="bold" fontSize="2xl">
                @KnackOfAbhinav
              </Text>
              <Button>Edit Profile</Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex margin="1rem" align="center" direction="column">
          <Text fontSize="xl" fontWeight="bold">
            Abhinav Patel
          </Text>
          <Text align="center">{`💻 <FullStackDeveloper/>
💕 Your joy is your sorrow unmasked :(:`}</Text>
        </Flex>
        <Flex direction="column">
          <Feed myPost />
          <Feed myPost />
          <Feed myPost />
        </Flex>
      </Flex>
      {/* Mobile View */}
      <Flex
        align="center"
        justify="center"
        direction="column"
        width="100%"
        display={["flex", "flex", "none", "none"]}
      >
        <Flex>
          <Flex margin="1rem" direction="column" align="center">
            <Image
              boxSize="100px"
              borderRadius="100%"
              src="https://pbs.twimg.com/profile_images/1373575950344974336/i_xo1F1l_400x400.jpg"
            />
            <Flex margin="1rem" direction="column">
              <Text fontWeight="bold" fontSize="2xl">
                @KnackOfAbhinav
              </Text>
              <Button>Edit Profile</Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex margin="1rem" align="center" direction="column">
          <Text fontSize="xl" fontWeight="bold">
            Abhinav Patel
          </Text>
          <Text padding="1rem" align="center">{`💻 <FullStackDeveloper/>
💕 Your joy is your sorrow unmasked :(:`}</Text>
        </Flex>
        <Flex direction="column" align="center">
          <Feed myPost />
          <Feed myPost />
          <Feed myPost />
        </Flex>
      </Flex>
    </Flex>
  );
};
