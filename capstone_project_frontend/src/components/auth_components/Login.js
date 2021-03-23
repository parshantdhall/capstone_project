import { useContext, useState } from "react";
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
  Switch,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { api_login } from "../../lib/api_routes";
import { userContext } from "../context provider/Context";
import CustomAlert from "../reusable components/CustomAlert";

const Login = () => {
  // ----------------All the local state--------
  const [userData, setUserData] = useState({
    identifier: "",
    password: "",
  });

  const [error, setError] = useState({
    isShowing: false,
    title: "",
  });

  const [isSponser, setIsSponser] = useState(false);

  // ------------------- All the global vars -------
  const history = useHistory();

  const globalUserState = useContext(userContext);
  const toast = useToast();
  // ---------All the local functions------------
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

  // Handling form submition
  const handleSubmit = async (e) => {
    e.preventDefault();
    const identifier = !isSponser
      ? "u" + userData.identifier + "@uni.canberra.edu.au"
      : userData.identifier;
    try {
      const res = await axios.post(api_login.url, {
        ...userData,
        identifier,
      });
      const { data } = res;
      // If everything gone well
      if (res.status === 200) {
        // check if user is confirmed or not
        if (res.data.user && res.data.user.confirmed === true) {
          // setting the jwt token in local storage for sign in
          window && window.sessionStorage.clear();
          window && window.sessionStorage.setItem("token", data && data.jwt);

          // setting global userState
          globalUserState.updateGlobalUserData({
            ...data.user,
            isLoggedIn: true,
          });

          // resetting the local state
          setUserData({
            identifier: "",
            password: "",
          });
          // redirecting
          history.replace("/");

          // SHowing the toas after sucessful login
          toast({
            title: "Login Sucessful",
            description: `Welcome ${data.user.username}`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          throw new Error("User Not Confirmed");
        }
      }
    } catch (err) {
      const errorTitle =
        err.response && err.response.data && err.response.data.data[0]
          ? err.response.data.data[0].messages[0].message
          : err.message;
      setError({
        isShowing: true,
        title: errorTitle,
      });
    }
  };

  const handleIsSponser = () => {
    setIsSponser((prevState) => !prevState);
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
          <Heading as="h1">Login to your Capstone Project account</Heading>
        </Box>
        <Spacer />
        <Box
          as="form"
          onSubmit={handleSubmit}
          maxW="460px"
          style={{ margin: "0 auto" }}
        >
          <Stack spacing={3} pos="relative">
            {isSponser ? (
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaEnvelope />}
                />
                <Input
                  type="email"
                  required
                  value={userData.identifier}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="Sponser Email"
                  name="identifier"
                />
              </InputGroup>
            ) : (
              <InputGroup>
                <InputLeftAddon children="u" />
                <Input
                  type="text"
                  required
                  value={userData.identifier}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder="UC Student ID"
                  name="identifier"
                />
                <InputRightAddon children="@uni.canberra.edu.au" />
              </InputGroup>
            )}
            {/* Login as sponser or student */}
            <HStack
              fontSize="sm"
              spacing="5px"
              justifyContent="flex-end"
              w="100%"
            >
              <Text as="p">Login as {!isSponser ? "Sponser" : "Student"}?</Text>
              <Switch onChange={handleIsSponser} />
            </HStack>
            {/* ------------Password---------- */}
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaKey />} />
              <Input
                type="password"
                required
                value={userData.password}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="password "
                name="password"
              />
            </InputGroup>
            <Button type="submit">Submit</Button>
            <Box>
              <Text as="p">
                Don't have an account yet?.{" "}
                <Link to="/register">
                  <Button variant="link">Register</Button>
                </Link>
              </Text>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Center>
  );
};

export default Login;
