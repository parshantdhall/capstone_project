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

  const [btnState, setBtnState] = useState({ loading: false, disabled: false });

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
    setBtnState({ loading: true, disabled: true });
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

          setBtnState({ loading: false, disabled: false });
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
      setBtnState({ loading: false, disabled: false });
    }
  };

  const handleIsSponser = () => {
    setIsSponser((prevState) => !prevState);
  };
  return (
    <Box
      background="url(/loginbg.jpg)"
      backgroundPosition="center"
      backgroundSize="cover"
      width="100%"
      height="90vh"
    >
      <Center flexDirection="column">
        {/* Configuring the alert */}
        {error.isShowing ? (
          <CustomAlert type="error" alertTitle={error.title} />
        ) : (
          ""
        )}

        {/* Rest of the components */}
        <Stack spacing={4} p={2} color="white">
          <Box>
            <Heading as="h1" color="white">
              Login to your Capstone Project account
            </Heading>
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
                  <InputLeftAddon children="u" bgColor="transparent" />
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
                  <InputRightAddon
                    children="@uni.canberra.edu.au"
                    bgColor="transparent"
                  />
                </InputGroup>
              )}
              {/* Login as sponser or student */}
              <HStack
                fontSize="sm"
                spacing="5px"
                justifyContent="flex-end"
                w="100%"
              >
                <Text as="p">
                  Login as {!isSponser ? "Sponser" : "Student"}?
                </Text>
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
              <Button
                type="submit"
                colorScheme="facebook"
                isLoading={btnState.loading}
                disabled={btnState.disabled}
              >
                Submit
              </Button>
              <Box>
                <Text as="p" color="white">
                  Don't have an account yet?{" "}
                  <Link to="/register">
                    <Button variant="link" color="white">
                      Register
                    </Button>
                  </Link>
                </Text>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Center>
    </Box>
  );
};

export default Login;
