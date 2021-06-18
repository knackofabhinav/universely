import { Flex } from "@chakra-ui/react";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";

export const Following = () => {
  return (
    <Flex>
      {/* Desktop View */}
      <Flex justify="center" margin="1rem" width="50vw">
        <Flex
          direction="column"
          align="center"
          display={["none", "none", "flex", "flex"]}
        >
          <ProfileCard
            name={"Tanay Pratap"}
            username={"tanaypratap"}
            following={true}
            image={
              "https://pbs.twimg.com/profile_images/1238749114348662784/p9hc5fuP_400x400.jpg"
            }
          />
          <ProfileCard
            name={"Sarthak Kapoor"}
            username={"SarthakSam"}
            following={true}
            image={
              "https://pbs.twimg.com/profile_images/1346370602139938818/aQrZe5M8_400x400.jpg"
            }
          />
          <ProfileCard
            name={"Tanay Pratap"}
            username={"tanaypratap"}
            following={true}
            image={
              "https://pbs.twimg.com/profile_images/1238749114348662784/p9hc5fuP_400x400.jpg"
            }
          />
          <ProfileCard
            name={"Sarthak Kapoor"}
            username={"SarthakSam"}
            following={true}
            image={
              "https://pbs.twimg.com/profile_images/1346370602139938818/aQrZe5M8_400x400.jpg"
            }
          />
        </Flex>
      </Flex>
      {/* Mobile View */}
      <Flex justify="center" align="center" width="0vw">
        <Flex
          direction="column"
          align="center"
          display={["flex", "flex", "none", "none"]}
        >
          <ProfileCard
            name={"Tanay Pratap"}
            username={"tanaypratap"}
            following={true}
            image={
              "https://pbs.twimg.com/profile_images/1238749114348662784/p9hc5fuP_400x400.jpg"
            }
          />
          <ProfileCard
            name={"Sarthak Kapoor"}
            username={"SarthakSam"}
            following={true}
            image={
              "https://pbs.twimg.com/profile_images/1346370602139938818/aQrZe5M8_400x400.jpg"
            }
          />
          <ProfileCard
            name={"Tanay Pratap"}
            username={"tanaypratap"}
            following={true}
            image={
              "https://pbs.twimg.com/profile_images/1238749114348662784/p9hc5fuP_400x400.jpg"
            }
          />
          <ProfileCard
            name={"Sarthak Kapoor"}
            username={"SarthakSam"}
            following={true}
            image={
              "https://pbs.twimg.com/profile_images/1346370602139938818/aQrZe5M8_400x400.jpg"
            }
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
