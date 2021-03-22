import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Accordion,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { get_student_group } from "../../../lib/api_routes";
import GroupAccordian from "./GroupAccordian";

const JoinGroup = ({ handleJoin }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //   local state
  const [allGroups, setallGroups] = useState([]);

  useEffect(() => {
    axios
      .get(get_student_group.url, get_student_group.requestHeader)
      .then((res) => setallGroups(res.data))
      .catch((err) => console.dir(err.response));
  }, []);

  return (
    <>
      <Button colorScheme="orange" m={2} onClick={onOpen}>
        Join Group
      </Button>
      {/* -------Modal------ */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select A Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Accordion allowToggle>
              {allGroups && allGroups.length > 0 ? (
                allGroups.map((group) => (
                  <GroupAccordian
                    groupData={group}
                    key={group.id}
                    handleJoin={handleJoin}
                    closeAccord={onClose}
                  />
                ))
              ) : (
                <Center>No Group To Show</Center>
              )}
            </Accordion>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JoinGroup;
