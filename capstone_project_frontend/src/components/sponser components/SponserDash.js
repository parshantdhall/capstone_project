import {
  Box,
  Center,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import Card from "../reusable components/Card";
import { FaPlus } from "react-icons/fa";
import AddProjectForm from "../reusable components/AddProjectForm";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { get_project_form } from "../../lib/api_routes";
import { userContext } from "../context provider/Context";

const SponserDash = () => {
  // local state
  const [allProjectData, setAllProjectData] = useState([]);
  // ----GLobal var---------
  const globalStateData = useContext(userContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get(
        `${get_project_form.url}?user.id=${
          globalStateData.userData.id && globalStateData.userData.id
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              window && window.sessionStorage.getItem("token")
            }`,
          },
        }
      )
      .then((res) => {
        setAllProjectData(res.data);
      })
      .catch((err) => console.dir(err));
  }, [globalStateData.userData.id]);

  // -------Functions---------
  const updateProjectData = (pData) => {
    if (pData) {
      setAllProjectData((prevState) => [...prevState, pData]);
    }
  };
  return (
    <Box as="section" p={3}>
      <Center>
        <Heading as="h1"> Sponser Dashboard</Heading>
      </Center>
      <SimpleGrid minChildWidth="250px" spacing="40px" mt={2}>
        {/* card */}
        {allProjectData.length > 0 ? (
          allProjectData.map((project) => (
            <Card
              key={project.id}
              pTitle={project.project_title}
              pDescription={project.project_description}
              pid={project.id}
              studentAllowed={project.number_of_students_allowed}
              groupAllowed={project.number_of_groups_allowed}
            />
          ))
        ) : (
          <Center mt={5}>
            <Text as="p" color="gray.500">
              No projects yet! Plz add with that red add button
            </Text>
          </Center>
        )}
      </SimpleGrid>

      {/* Add button */}
      <Tooltip hasArrow label="Add Project" bg="gray.300" color="black">
        <IconButton
          onClick={onOpen}
          borderRadius="full"
          colorScheme="red"
          aria-label="Add Project"
          size="lg"
          icon={<FaPlus />}
          position="fixed"
          right="3%"
          bottom="8%"
          zIndex="sticky"
        />
      </Tooltip>
      <AddProjectForm
        isOpen={isOpen}
        onClose={onClose}
        updateProjectData={updateProjectData}
      />
    </Box>
  );
};

export default SponserDash;
