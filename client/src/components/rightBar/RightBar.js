import { Flex, Text, Stack } from "@chakra-ui/react";
import { Explore } from "../../pages/explore/Explore";

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
      <Stack align="center">
        {/* <ProfileCard
          name={"Tanay Pratap"}
          username={"tanaypratap"}
          following={true}
          image={
            "https://pbs.twimg.com/profile_images/1407601239727112198/V4bunpAi_400x400.jpg"
          }
        />
        <ProfileCard
          name={"Sarthak Kapoor"}
          username={"SarthakSam"}
          following={false}
          image={
            "https://pbs.twimg.com/profile_images/1346370602139938818/aQrZe5M8_400x400.jpg"
          }
        /> */}
        <Explore desktop />
      </Stack>
    </Flex>
  );
};
