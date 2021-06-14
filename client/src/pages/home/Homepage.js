import { Button, Image, Box, Stack, Flex, Text } from "@chakra-ui/react";
import { NewPost } from "../../components/newPost/NewPost";
import { Feed } from "../../components/feed/Feed";

export const Homepage = () => {
  return (
    <div>
      <Flex
        w="100vw"
        minH="90vh"
        justify="center"
        display={["none", "none", "flex", "flex"]}
      >
        <Flex flexGrow="2" borderRight="1px solid black"></Flex>
        <Flex
          direction="column"
          h="95vh"
          position="fixed"
          align="center"
          justify="space-between"
          w="20rem"
          left="5%"
        >
          <Stack w="50%" direction="column" spacing={6} mt="2rem">
            <Button size="lg" colorScheme="blue" variant="ghost">
              Home
            </Button>
            <Button size="lg" colorScheme="blue" variant="ghost">
              Friends
            </Button>
            <Button size="lg" colorScheme="blue" variant="ghost">
              Notifications
            </Button>
            <Button size="lg" colorScheme="blue" variant="ghost">
              Profile
            </Button>
          </Stack>
          <Button size="md" mb="2rem" colorScheme="blue" variant="ghost">
            About us
          </Button>
        </Flex>
        <Flex flexGrow="3" borderRight="1px solid black" justify="center">
          <NewPost />
          <Feed />
        </Flex>
        <Flex flexGrow="1" width="20%" direction="column" align="center">
          <Text fontSize="xl" m="2rem">
            People You May Know
          </Text>
          <Stack>
            <Box borderRadius="0.2rem" w="24rem" bg="blackAlpha.600">
              <Flex align="center" justify="space-between">
                <Flex direction="row" padding="1rem" align="center">
                  <Image
                    borderRadius="full"
                    boxSize="70px"
                    src="https://pbs.twimg.com/profile_images/1238749114348662784/p9hc5fuP_400x400.jpg"
                  />
                  <Flex direction="column" p="0.5rem">
                    <Text>Tanay Pratap</Text>
                    <Text color="GrayText">@tanaypratap</Text>
                  </Flex>
                </Flex>
                <Button m="1rem" colorScheme="messenger">
                  Following
                </Button>
              </Flex>
            </Box>
            <Box borderRadius="0.2rem" w="24rem" bg="blackAlpha.600">
              <Flex align="center" justify="space-between">
                <Flex direction="row" padding="1rem" align="center">
                  <Image
                    borderRadius="full"
                    boxSize="70px"
                    src="https://pbs.twimg.com/profile_images/1238749114348662784/p9hc5fuP_400x400.jpg"
                  />
                  <Flex direction="column" p="0.5rem">
                    <Text>Tanay Pratap</Text>
                    <Text color="GrayText">@tanaypratap</Text>
                  </Flex>
                </Flex>
                <Button m="1rem">Follow</Button>
              </Flex>
            </Box>
            <Box borderRadius="0.2rem" w="24rem" bg="blackAlpha.600">
              <Flex align="center" justify="space-between">
                <Flex direction="row" padding="1rem" align="center">
                  <Image
                    borderRadius="full"
                    boxSize="70px"
                    src="https://pbs.twimg.com/profile_images/1261650280451579904/NW1jeDTt_400x400.jpg"
                  />
                  <Flex direction="column" p="0.5rem">
                    <Text>Hetav Desai</Text>
                    <Text color="GrayText">@desaihetav</Text>
                  </Flex>
                </Flex>
                <Button m="1rem">Follow</Button>
              </Flex>
            </Box>
          </Stack>
        </Flex>
      </Flex>

      {/* For Mobile */}
      <Flex justify="center" display={["flex", "flex", "none", "none"]}>
        <NewPost />
        <Feed />
      </Flex>
    </div>
  );
};
