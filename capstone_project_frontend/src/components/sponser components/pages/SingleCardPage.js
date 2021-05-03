import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Tag,
  Text,
  Accordion,
  Button,
} from "@chakra-ui/react";
import { backEndUrl, get_project_form } from "../../../lib/api_routes";
import { useHistory } from "react-router-dom";
import { FaLongArrowAltLeft, FaFileDownload } from "react-icons/fa";
import CustomAccord from "../../reusable components/CustomAccord";

const SingleCardPage = ({ match }) => {
  //   getting project id from the params
  const pid = match.params.pid;

  //   local state
  const [projectData, setProjectData] = useState({});
  const [isLoading, setIsloading] = useState(false);

  // globAL VARS
  const history = useHistory();

  useEffect(() => {
    setIsloading(true);

    axios
      .get(`${get_project_form.url}/${pid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            window && window.sessionStorage.getItem("token")
          }`,
        },
      })
      .then((res) => {
        setProjectData(res.data);
        setIsloading(false);
      })
      .catch((err) => console.dir(err.response));
  }, [pid]);
  return (
    <Box as="section">
      {isLoading ? (
        <Center mt={8}>
          <Spinner />
        </Center>
      ) : (
        <>
          <Container
            boxShadow="xl"
            backgroundColor="white"
            maxW="container.md"
            mt={3}
            p={2}
          >
            <Flex justifyContent="space-between" w="100%" alignItems="center">
              <IconButton
                onClick={history.goBack}
                icon={<FaLongArrowAltLeft />}
              />
              {/* <IconButton
                onClick={() => console.log("clicked")}
                icon={<FaPencilAlt />}
              /> */}
            </Flex>
            {/* -------Header--------- */}
            <Box as="header" m={2}>
              <Heading as="h1">
                {projectData.project_title} - {projectData.id}
              </Heading>
            </Box>
            {/* ------Body------------ */}
            <Box role="body" p={3}>
              <Text as="p">{projectData.project_description}</Text>
            </Box>
            {/* -------Footer--------- */}
            <Box role="footer" p={3}>
              <HStack spacing="10px">
                <Tag variant="subtle" colorScheme="cyan">
                  {projectData.number_of_students_allowed} students Allowed
                </Tag>
                <Tag variant="subtle" colorScheme="cyan">
                  {projectData.number_of_groups_allowed} groups Allowed
                </Tag>
              </HStack>
              {projectData.project_file ? (
                <a
                  href={`${backEndUrl}${
                    projectData.project_file && projectData.project_file.url
                  }`}
                  target="_blank"
                  rel="noreferrer"
                  download
                >
                  <Button
                    mt={2}
                    rightIcon={<FaFileDownload />}
                    colorScheme="pink"
                  >
                    Download Project file
                  </Button>
                </a>
              ) : (
                <Text as="p" color="gray.500" mt={2}>
                  No Project File Uploaded
                </Text>
              )}
            </Box>
            {/* -------Sponser info-------- */}
            <Box
              m={1}
              p={2}
              borderLeft="5px solid"
              borderColor="gray.200 "
              background="gray.100"
            >
              <Heading as="h3" fontSize="md">
                Sponser
              </Heading>
              <Text as="em" display="block">
                {projectData && projectData.user && projectData.user.username}
              </Text>
              <Text as="em">
                {projectData && projectData.user && projectData.user.email}
              </Text>
            </Box>
          </Container>
          {/* --------Allocated Groups accordian---------------- */}
          <Container boxShadow="xl" backgroundColor="white" mt={3} p={22}>
            <Box m={2}>
              <Heading as="h1" fontSize="md">
                Allocated groups
                <Tag variant="subtle" colorScheme="cyan" ml={2}>
                  Total{" "}
                  {projectData.allocated_student_groups &&
                    projectData.allocated_student_groups.length}{" "}
                  group/groups allocated
                </Tag>
              </Heading>
            </Box>
            <Accordion allowToggle>
              {projectData.allocated_student_groups &&
              projectData.allocated_student_groups.length > 0 ? (
                projectData.allocated_student_groups.map((group) => (
                  <CustomAccord key={group.id} allocatedGroupId={group.id} />
                ))
              ) : (
                <Center mt={5}>
                  <Text as="p" color="gray.500">
                    No Student group allocated yet to this project
                  </Text>
                </Center>
              )}
            </Accordion>
          </Container>
        </>
      )}
    </Box>
  );
};

export default SingleCardPage;
