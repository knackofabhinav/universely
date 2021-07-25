import { Flex } from "@chakra-ui/react";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";

export const Following = () => {
  return (
    <>
      {/* Desktop View */}
      <Flex
        justify="center"
        margin="1rem"
        width="50vw"
        display={["none", "none", "flex", "flex"]}
      >
        <Flex direction="column" align="center">
          <ProfileCard
            name={"Tanay Pratap"}
            username={"tanaypratap"}
            following={true}
            image={
              "https://pbs.twimg.com/profile_images/1407601239727112198/V4bunpAi_400x400.jpg"
            }
          />
        </Flex>
      </Flex>
      {/* Mobile View */}
      <Flex
        justify="center"
        align="center"
        width="100%"
        direction="column"
        display={["flex", "flex", "none", "none"]}
      >
        <ProfileCard
          name={"Tanay Pratap"}
          username={"tanaypratap"}
          following={true}
          image={
            "https://pbs.twimg.com/profile_images/1407601239727112198/V4bunpAi_400x400.jpg"
          }
        />
      </Flex>
    </>
  );
};
