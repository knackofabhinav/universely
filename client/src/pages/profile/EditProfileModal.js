import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Textarea,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { profileState, setUpdateUser } from "../../features/profile/profileSlice";
import { useToast } from "@chakra-ui/react";

export function EditProfileModal() {
  const toast = useToast();
  const profile = useSelector(profileState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    bio: profile.bio,
  });
  const [loading, setLoading] = useState(false);

  const updateProfile = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post("/update-profile", {
        userDetails: formData,
        userId: profile._id,
      });
      if (res.data.success) {
        setUpdateUser(res.data.user)
        toast({
          title: "Profile updated.",
          description: "We've updated your profile successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Edit Profile</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="first-name" isRequired mt={2}>
              <FormLabel>First Name</FormLabel>
              <Input
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((data) => ({
                    ...data,
                    firstName: e.target.value,
                  }))
                }
                placeholder="First Name"
              />
            </FormControl>
            <FormControl id="last-name" mt={2}>
              <FormLabel>Last Name</FormLabel>
              <Input
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((data) => ({ ...data, lastName: e.target.value }))
                }
                placeholder="Last Name"
              />
            </FormControl>
            <FormControl id="email" mt={2}>
              <FormLabel>Email</FormLabel>
              <Input
                value={formData.email}
                onChange={(e) =>
                  setFormData((data) => ({ ...data, email: e.target.value }))
                }
                placeholder="Email"
                type="email"
              />
            </FormControl>
            <FormControl id="bio" mt={2}>
              <FormLabel>Bio</FormLabel>
              <Textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData((data) => ({ ...data, bio: e.target.value }))
                }
                placeholder="Tell us about yourself."
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose} mr={2}>
              Close
            </Button>
            <Button
              isLoading={loading}
              onClick={() => {
                updateProfile(formData);
              }}
              colorScheme="blue"
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
