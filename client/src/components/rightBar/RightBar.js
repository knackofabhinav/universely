import { Flex, Text, Stack } from "@chakra-ui/react";
import { ProfileCard } from "../ProfileCard/ProfileCard";

export const RightBar = () => {
  return (
    <Flex
      display={["none", "none", "flex", "flex"]}
      direction="column"
      align="center"
      p="1rem"
      flexShrink="1"
    >
      <Text fontSize="xl" m="2rem">
        People You May Know
      </Text>
      <Stack>
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
          following={false}
          image={
            "https://pbs.twimg.com/profile_images/1346370602139938818/aQrZe5M8_400x400.jpg"
          }
        />
      </Stack>
    </Flex>
  );
};
