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
  HStack,
  Text,
  Spacer,
  Divider,
  Box,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { get_project_form } from "../../../lib/api_routes";

const AddProjectAcc = ({ handleSupervisorProjAlloc, userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //   local state
  const [allProjects, setAllProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          get_project_form.url,
          get_project_form.requestHeader
        );
        setAllProjects(data);
      } catch (e) {
        console.dir(e.response);
      }
    })();
  }, []);
  // --------handling Search inpt change---------
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAllocationBtn = (projId) => {
    handleSupervisorProjAlloc(userId, projId);
    onClose();
  };

  return (
    <>
      <Button colorScheme="purple" m={2} onClick={onOpen}>
        Allocate project
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
          <ModalHeader>Allocate project to supervisor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Accordion allowToggle>
              {/* ---Headings------- */}
              <Box>
                <HStack m={2} fontWeight="bold">
                  <Text as="p">Id</Text>
                  <Text as="p">Title</Text>
                  <Spacer />
                  <Text as="p">Other Info</Text>
                </HStack>
              </Box>
              {/* ---------------------Search box------------------ */}
              <Box w="100%" maxW="380px" my={2} mx="auto">
                <Input
                  placeholder="Search Project By Id or Title or by supervisor"
                  value={searchQuery}
                  onChange={(e) => handleInputChange(e)}
                />
              </Box>
              {allProjects && allProjects.length > 0 ? (
                allProjects
                  .filter(
                    (p) =>
                      String(p.id) === searchQuery ||
                      p.project_title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      (p.project_supervisor &&
                        p.project_supervisor.username
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()))
                  )
                  .map((project) => (
                    <Box key={project.id}>
                      <HStack m={2}>
                        <Text as="p">{project.id}.</Text>
                        <Text as="p">{project.project_title}</Text>
                        <Spacer />
                        {/* Check if the project already hae a supervisor allocated  */}
                        {project.project_supervisor !== undefined &&
                        project.project_supervisor !== null &&
                        project.project_supervisor.id ? (
                          <Text as="p">
                            {project.project_supervisor.username}
                          </Text>
                        ) : (
                          <Button
                            size="xs"
                            colorScheme="red"
                            onClick={() => handleAllocationBtn(project.id)}
                          >
                            Allocate
                          </Button>
                        )}
                      </HStack>
                      <Divider />
                    </Box>
                  ))
              ) : (
                <Center>No Projects To Show</Center>
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

export default AddProjectAcc;
