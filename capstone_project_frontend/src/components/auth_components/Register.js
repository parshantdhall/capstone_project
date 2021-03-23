import { useContext } from "react";
import {
  Center,
  InputGroup,
  InputLeftElement,
  Stack,
  Input,
  Heading,
  Button,
  Box,
  Spacer,
  InputLeftAddon,
  InputRightAddon,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FaUserCircle, FaKey } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { api_register } from "../../lib/api_routes";
import { userContext } from "../context provider/Context";
import CustomAlert from "../reusable components/CustomAlert";
import { validateRegister } from "../../lib/formValidation";

const Register = () => {
  // -----------Local State------------------
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    isShowing: false,
    title: "",
  });

  // ------------Glocal var-----------------
  // HIstory var from react router
  const history = useHistory();
  const globalUserState = useContext(userContext);
  const toast = useToast();

  // -------------Local Function------------
  const handleChange = (e) => {
    setUserData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
    // setting error back to normal
    setError({
      isShowing: false,
      title: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation
    const { isError, message } = validateRegister(userData);
    if (isError) {
      setError({
        isShowing: isError,
        title: message,
      });
      return;
    }

    try {
      // fetcing
      const res = await axios.post(api_register.url, {
        ...userData,
        email: "u" + userData.email + "@uni.canberra.edu.au",
        username: userData.first_name + " " + userData.last_name,
      });
      const { data } = res;
      // If everything gone well
      if (res.status === 200) {
        // setting the jwt token in local storage for sign in
        window && window.sessionStorage.clear();
        window && window.sessionStorage.setItem("token", data && data.jwt);

        // setting global userState
        globalUserState.updateGlobalUserData({
          ...data.user,
          isLoggedIn: true,
        });

        // reseting local state
        setUserData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });
        // redirecting
        history.replace("/");

        // SHowing the toas after sucessful login
        toast({
          title: "Account created.",
          description: `Welcome ${data.user.username}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      const errorTitle =
        err.response && err.response.data
          ? err.response.data.data[0].messages[0].message
          : err.message;
      setError({
        isShowing: true,
        title: errorTitle,
      });
    }
  };
  return (
    <Center flexDirection="column">
      {/* Configuring the alert */}
      {error.isShowing ? (
        <CustomAlert type="error" alertTitle={error.title} />
      ) : (
        ""
      )}

      {/* Rest of the components */}

      <Stack spacing={4} p={2}>
        <Box>
          <Heading as="h1">Register Capstone Project User</Heading>
        </Box>
        <Spacer />
        <Box as="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaUserCircle />}
              />

              <Input
                type="text"
                required
                value={userData.first_name}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="First Name"
                name="first_name"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaUserCircle />}
              />
              <Input
                type="text"
                required
                value={userData.last_name}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="Second Name"
                name="last_name"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="u" />
              <Input
                type="number"
                required
                value={userData.email}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="UC Student ID"
                name="email"
              />
              <InputRightAddon children="@uni.canberra.edu.au" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaKey />} />
              <Input
                type="password"
                required
                value={userData.password}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="password of your chioce"
                name="password"
              />
            </InputGroup>
            <Button type="submit">Submit</Button>
            <Box>
              <Text as="p">
                Already have an account.{" "}
                <Link to="/login">
                  <Button variant="link">Login</Button>
                </Link>
              </Text>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Center>
  );
};

export default Register;
