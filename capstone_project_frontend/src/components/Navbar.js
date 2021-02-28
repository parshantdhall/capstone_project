import { useContext } from "react";
import {
  Flex,
  Box,
  Button,
  Heading,
  Spacer,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "./context provider/Context";

const Navbar = () => {
  const globalUserData = useContext(userContext);
  const history = useHistory();

  const handleLogOut = () => {
    // removing user from global state and local storate
    globalUserData.updateGlobalUserData({});
    window && window.sessionStorage.clear();
    history.push("/login");
  };
  return (
    <Box p={3} width="100%" backgroundColor="gray.50" boxShadow="md" mb={3}>
      <Flex justifyContent="center">
        <Box p={2}>
          <Heading size="md">UC Capstone Project</Heading>
        </Box>
        <Spacer />
        {globalUserData.userData && globalUserData.userData.isLoggedIn ? (
          <HStack>
            <Text as="p" display="block" role="userName">
              Hi! {globalUserData.userData.username}
            </Text>
            <Button colorScheme="red" onClick={handleLogOut}>
              Log out
            </Button>
          </HStack>
        ) : (
          <Box>
            <Link to="/register">
              <Button colorScheme="teal" mr="4">
                Register
              </Button>
            </Link>
            <Link to="/login">
              <Button colorScheme="teal">Log in</Button>
            </Link>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
