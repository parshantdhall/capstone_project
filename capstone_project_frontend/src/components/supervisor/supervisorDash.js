import axios from "axios";

import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Card from "../reusable components/Card";
import { useEffect, useState, useContext } from "react";
import { get_project_form } from "../../lib/api_routes";
import { userContext } from "../context provider/Context";

const SupervisorDash = () => {
  // local state
  const [allProjectData, setAllProjectData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  // ----GLobal var---------
  const globalStateData = useContext(userContext);

  useEffect(() => {
    setIsloading(true);
    axios
      .get(
        `${get_project_form.url}?project_supervisor.id=${
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
        setIsloading(false);
      })
      .catch((err) => console.dir(err));
  }, [globalStateData.userData.id]);

  return (
    <Box as="section" p={3} mt={3}>
      {isLoading ? (
        <Center mt={8}>
          <Spinner />
        </Center>
      ) : (
        <>
          <Center>
            <Heading as="h1"> All Supervising Projects </Heading>
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
                  No projects to supervise yet! Plz ask teacher to add
                </Text>
              </Center>
            )}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
};

export default SupervisorDash;
