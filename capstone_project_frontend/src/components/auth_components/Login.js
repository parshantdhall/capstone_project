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
} from "@chakra-ui/react";
import axios from "axios";
import { FaKey } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { api_login } from "../../lib/api_routes";
import { userContext } from "../context provider/Context";

const Login = () => {
  // ----------------All the local state--------
  const [userData, setUserData] = useState({
    identifier: "",
    password: "",
  });

  // ------------------- All the global vars -------
  const history = useHistory();

  const globalUserState = useContext(userContext);
  // ---------All the local functions------------
  const handleChange = (e) => {
    setUserData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(api_login.url, {
        ...userData,
        identifier: "u" + userData.identifier + "@uni.canberra.edu.au",
      });
      console.log(res);
      const { data } = res;

      // If everything gone well
      if (res.statusText === "OK") {
        // setting the jwt token in local storage for sign in
        window && window.sessionStorage.clear();
        window && window.sessionStorage.setItem("token", data && data.jwt);
        // setting user id in session storage
        window && window.sessionStorage.setItem("uid", data && data.user.id);

        // setting global userState
        globalUserState.updateGlobalUserData({
          ...data.user,
          isLoggedIn: true,
        });
        setUserData({
          email: "",
          password: "",
        });
        history.push("/");
      }
    } catch (err) {
      console.dir(err.response.data.data[0].messages[0].message);
    }
  };

  return (
    <Center flexDirection="column">
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
