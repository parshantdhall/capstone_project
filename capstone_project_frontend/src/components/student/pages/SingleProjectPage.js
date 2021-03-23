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
  Button,
} from "@chakra-ui/react";
import { backEndUrl, get_project_form } from "../../../lib/api_routes";
import { useHistory } from "react-router-dom";
import { FaLongArrowAltLeft, FaFileDownload } from "react-icons/fa";

const SingleProjectPage = ({ match }) => {
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
        <Container boxShadow="xl" backgroundColor="white" maxW="container.md">
          <Flex justifyContent="space-between" w="100%" alignItems="center">
            <IconButton
              onClick={history.goBack}
              icon={<FaLongArrowAltLeft />}
            />
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
            {/* -------Sponser info-------- */}
            <Box
              mt={2}
              p={3}
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
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default SingleProjectPage;
