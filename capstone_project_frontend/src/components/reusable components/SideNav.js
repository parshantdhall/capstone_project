import { Box, Button, VStack } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";

const SideNav = () => {
  const history = useHistory();
  const path = history.location.pathname;

  return (
    <Box
      as="aside"
      boxShadow="2xl"
      position="sticky"
      top="0"
      height="100vh"
      d="flex"
      justifyContent="center"
      p={3}
    >
      <VStack as="nav" mt={10} spacing="10">
        <Link to="/">
          <Button
            variant="solid"
            colorScheme={path === "/" ? "facebook" : "gray"}
          >
            Allocate Project
          </Button>
        </Link>
        <Link to="/teacher/project-summary">
          <Button
            variant="solid"
            colorScheme={
              path === "/teacher/project-summary" ? "facebook" : "gray"
            }
          >
            Project Summary{" "}
          </Button>
        </Link>
        <Link to="/teacher/allocate-supervisor">
          <Button
            variant="solid"
            colorScheme={
              path === "/teacher/allocate-supervisor" ? "facebook" : "gray"
            }
          >
            Allocate Supervisor
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default SideNav;
