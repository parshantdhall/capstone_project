import {
  Box,
  Text,
  Center,
  Flex,
  Input,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get_project_form } from "../../../lib/api_routes";
import { FaPlus } from "react-icons/fa";

const AllProjects = ({
  haveGroup,
  isPrioritySubmitted,
  projectPrior,
  handleAddToPriorityList,
}) => {
  // -----Local State------
  const [allProjectsData, setAllProjectsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(get_project_form.url, get_project_form.requestHeader)
      .then((res) => {
        setAllProjectsData(res.data);
      })
      .catch((err) => console.dir(err.response));
  }, []);

  // --------handling inpt change---------
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box
      bgColor="white"
      boxShadow="lg"
      p={2}
      borderRadius="lg"
      m={3}
      minH="100px"
    >
      {/* Head */}
      <Box
        display="flex"
        alignItems="baseline"
        justifyContent="space-between"
        minW="250px"
      >
        <Text as="h2" fontSize="lg" fontWeight="bold">
          List Of Projects
        </Text>
        <Text as="p" fontSize="xs" color="gray.500">
          {allProjectsData.length} Projects
        </Text>
      </Box>
      {/* ---------------------Search box------------------ */}
      <Box w="100%" maxW="380px" my={2} mx="auto">
        <Input
          placeholder="Search Project By Id or Title"
          value={searchQuery}
          onChange={(e) => handleInputChange(e)}
        />
      </Box>
      {/* -------COntent------- */}
      <Box overflowY="auto" maxH="350px">
        <Flex
          justifyContent="space-between"
          bgColor="gray.100"
          borderRadius="lg"
          p={3}
          m={2}
          maxW="400px"
          boxShadow="lg"
          position="sticky"
          top="0"
          zIndex="overlay"
        >
          <Text as="p" fontWeight="bold">
            Project Id
          </Text>
          <Text as="p" fontWeight="bold" ml={2}>
            Title of project
          </Text>

          <Text as="p" fontWeight="bold" ml={2}>
            Add to priority list
          </Text>
        </Flex>

        {allProjectsData.length > 0 ? (
          allProjectsData
            .filter(
              (p) =>
                String(p.id) === searchQuery ||
                p.project_title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
            )
            .map((project) => (
              <Link to={`/project/${project.id}`} key={project.id}>
                <Flex
                  justifyContent="space-between"
                  // item will be green if is select as the priority
                  bgColor={
                    projectPrior.findIndex((item) => item.id === project.id) ===
                    -1
                      ? "gray.100"
                      : "green.200"
                  }
                  borderRadius="lg"
                  p={3}
                  m={3}
                  maxW="400px"
                  boxShadow="md"
                >
                  <Text as="p">{project.id}</Text>
                  <Text as="p" color="gray.500" ml={2}>
                    {project.project_title}
                  </Text>
                  {/* -----Add to priority list btn----- */}
                  {haveGroup ? (
                    !isPrioritySubmitted &&
                    projectPrior.length < 3 &&
                    projectPrior.findIndex((item) => item.id === project.id) ===
                      -1 ? (
                      <Tooltip
                        hasArrow
                        label="Add to priorities list"
                        bg="gray.300"
                        color="black"
                      >
                        <IconButton
                          ml={2}
                          variant="outline"
                          aria-label="select as project priority button"
                          icon={<FaPlus />}
                          colorScheme="pink"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const newPriority = {
                              id: project.id,
                              project_title: project.project_title,
                            };
                            handleAddToPriorityList(newPriority);
                          }}
                        />
                      </Tooltip>
                    ) : (
                      ""
                    )
                  ) : (
                    <Box fontSize="sm">Join or create group</Box>
                  )}
                </Flex>
              </Link>
            ))
        ) : (
          <Center
            color="gray.500"
            bgColor="gray.100"
            borderRadius="lg"
            p={3}
            m={3}
            fontSize="lg"
          >
            No Project Submitted yet!
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default AllProjects;
