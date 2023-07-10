import { Flex, Stack } from "@chakra-ui/react";
import { Notification } from "../../components/notification/Notification";

export const Notifications = () => {
  return (
    <Flex>
      {/* Mobile View*/}
      <Flex
        justify="center"
        width="100vw"
        display={["flex", "flex", "none", "none"]}
      >
        <Stack width="100%" padding="1rem">
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </Stack>
      </Flex>
      {/* Desktop View*/}
      <Flex
        justify="center"
        margin="1rem"
        width="50vw"
        display={["none", "none", "flex", "flex"]}
      >
        <Stack width="100%">
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </Stack>
      </Flex>
    </Flex>
  );
};
