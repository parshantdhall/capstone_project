import { useContext } from "react";
import {
  Flex,
  Box,
  Button,
  Heading,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "./context provider/Context";
import { FaAngleDown } from "react-icons/fa";

const Navbar = () => {
  const globalUserData = useContext(userContext);
  const history = useHistory();

  // log out function
  const handleLogOut = () => {
    // removing user from global state and local storate
    globalUserData.updateGlobalUserData({});
    window && window.sessionStorage.clear();
    history.replace("/login");
  };

  const [isSmallScreen] = useMediaQuery("(max-width: 500px)");
  return (
    <Box p={3} width="100%" backgroundColor="gray.50" boxShadow="md" mb={3}>
      <Flex justifyContent="center" alignContent="center">
        <Box p={2}>
          <Heading size="md">UC Capstone Project</Heading>
        </Box>
        <Spacer />
        {globalUserData.userData && globalUserData.userData.isLoggedIn ? (
          <Menu>
            <MenuButton as={Button} rightIcon={<FaAngleDown />}>
              {" "}
              Yo {globalUserData.userData.username}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Box display="flex" justifyContent="space-around" alignItems="center">
            <Link to="/register">
              <Button
                colorScheme="teal"
                m={1}
                size={isSmallScreen ? "sm" : "md"}
              >
                Register
              </Button>
            </Link>
            <Link to="/login">
              <Button
                colorScheme="teal"
                m={1}
                size={isSmallScreen ? "sm" : "md"}
              >
                Log in
              </Button>
            </Link>
            <a
              href="https://main-capston-bshqj0xrqwxnrxjn-gtw.qovery.io/admin"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                colorScheme="teal"
                m={1}
                size={isSmallScreen ? "sm" : "md"}
              >
                Admin Login
              </Button>
            </a>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
