import { Alert, AlertIcon, AlertTitle, Center } from "@chakra-ui/react";
import { memo } from "react";
const CustomAlert = ({ type, alertTitle }) => {
  return (
    <Center>
      <Alert status={type}>
        <AlertIcon />
        <AlertTitle mr={2}>{alertTitle} </AlertTitle>
      </Alert>
    </Center>
  );
};

export default memo(CustomAlert);
