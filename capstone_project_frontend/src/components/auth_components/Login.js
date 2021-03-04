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
} from "@chakra-ui/react";
import axios from "axios";
import { FaKey } from "react-icons/fa";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(api_login.url, {
        ...userData,
        identifier: "u" + userData.identifier + "@uni.canberra.edu.au",
      });
      const { data } = res;

      // If everything gone well
      if (res.statusText === "OK") {
        // check if user is confirmed or not
        if (res.data.user && res.data.user.confirmed === true) {
          // setting the jwt token in local storage for sign in
          window && window.sessionStorage.clear();
          window && window.sessionStorage.setItem("token", data && data.jwt);
          // setting user info in session storage
          window &&
            window.sessionStorage.setItem(
              "uInfo",
              data &&
                JSON.stringify({
                  confirmed: data.user.confirmed,
                  username: data.user.username,
                  role: { name: data.user.role.name },
                })
            );

          // setting global userState
          globalUserState.updateGlobalUserData({
            ...data.user,
            isLoggedIn: true,
          });

          // resetting the local state
          setUserData({
            email: "",
            password: "",
          });
          // redirecting
          history.push("/");

          // SHowing the toas after sucessful login
          toast({
            title: "Login Sucessful",
            description: `Welcome ${data.user.username}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          throw new Error("User Not Confirmed");
        }
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
          <Heading as="h1">Login to your Capstone Project account</Heading>
        </Box>
        <Spacer />
        <Box
          as="form"
          onSubmit={handleSubmit}
          maxW="460px"
          style={{ margin: "0 auto" }}
        >
          <Stack spacing={3}>
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
