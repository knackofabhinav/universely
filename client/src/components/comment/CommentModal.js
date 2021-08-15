import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Image,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Input,
  Flex,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";
import axios from "axios";
import { profileState } from "../../features/profile/profileSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function CommentModal({ postId }) {
  const [comments, setComments] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState("");
  const toast = useToast();
  const userId = useSelector(profileState)._id;

  // useEffect(() => {
  //   (async () => {
  //     if (postId) {
  //     }
  //   })();
  // }, [postId]);

  const getComments = async (postId) => {
    const res = await axios.get(`/posts/${postId}/comments`);
    setComments((comments) =>
      res.data.comments.sort((a, b) => a.createdAt - b.createdAt)
    );
  };

  const postComment = async ({ postId, comment }) => {
    try {
      const res = await axios.post("/posts/comment", { postId, comment });
      setComments((comments) =>
        res.data.comments.sort((a, b) => a.createdAt - b.createdAt)
      );
      setComment("");
      toast({
        title: "Commented Successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async ({ postId, commentId }) => {
    try {
      const res = await axios.delete(`/posts/${postId}/${commentId}`);
      setComments((comments) =>
        res.data.comments.sort((a, b) => a.createdAt - b.createdAt)
      );
      toast({
        title: "Comment deleted.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          getComments(postId);
        }}
      >
        Comment
      </Button>

      <Modal blockScrollOnMount isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments on Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {comments.length === 0 ? (
              <Text fontWeight="bold" mb="1rem">
                No Comments Yet!
              </Text>
            ) : (
              comments.map((comment) => {
                return (
                  <Flex key={comment._id} direction="column">
                    <Flex align="center" w="100%">
                      <Link to={`/profile/${comment.userId?.username}`}>
                        <Image
                          src={`https://avatars.dicebear.com/api/identicon/${comment.userId?.username}.svg`}
                          boxSize="50px"
                          objectFit="cover"
                          borderRadius="full"
                          mt="1rem"
                          ml="1rem"
                        />
                      </Link>
                      <Flex w="100%" margin="1rem" justify="space-between">
                        <Flex px="1rem" direction="column">
                          <Text fontSize="1rem" fontWeight="bold">
                            @{comment.userId && comment.userId.username}
                          </Text>
                          <Text w="100%">{comment.commentText}</Text>
                        </Flex>
                      </Flex>
                      <Flex direction="column">
                        <Text w="7rem" color="GrayText">
                          {" "}
                          {comment?.createdAt &&
                            formatDistanceToNow(new Date(comment.createdAt)) +
                              " ago"}
                        </Text>
                      </Flex>
                      {userId === comment.userId._id && (
                        <Button
                          onClick={() =>
                            deleteComment({
                              postId,
                              commentId: comment._id,
                            })
                          }
                        >
                          <DeleteIcon />
                        </Button>
                      )}
                    </Flex>
                  </Flex>
                );
              })
            )}
          </ModalBody>
          <ModalFooter>
            <Input
              placeholder="Add your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              mr={2}
            />
            <Button
              colorScheme="blue"
              onClick={() => postComment({ postId, comment })}
            >
              Comment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
