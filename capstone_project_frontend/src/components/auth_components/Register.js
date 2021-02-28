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
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FaUserCircle, FaKey } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { api_register } from "../../lib/api_routes";
import { userContext } from "../context provider/Context";

const Register = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  // HIstory var from react router
  const history = useHistory();
  const globalUserState = useContext(userContext);

  const handleChange = (e) => {
    setUserData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(api_register.url, {
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
          first_name: "",
          last_name: "",
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
                type="text"
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
