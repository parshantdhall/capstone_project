import { memo, useEffect, useState } from "react";
import axios from "axios";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { get_student_group } from "../../lib/api_routes";

const CustomAccord = ({ allocatedGroupId }) => {
  // ----Local State--------
  const [groupData, setGroupData] = useState({});

  useEffect(() => {
    axios
      .get(`${get_student_group.url}/${allocatedGroupId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            window && window.sessionStorage.getItem("token")
          }`,
        },
      })
      .then((res) => setGroupData(res.data))
      .catch((err) => console.dir(err.response));
  }, [allocatedGroupId]);

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Group - {groupData.id}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text as="h3" fontWeight="bold" color="orange.300">
            Student Name
          </Text>
          <Text as="h3" fontWeight="bold" color="orange.300">
            Student Email
          </Text>
        </Flex>
        {groupData.group_members &&
          groupData.group_members.map((member) => (
            <Flex
              key={member.id}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box as="p" m={1}>
                {member.username}
              </Box>
              <Box as="p" m={1}>
                {member.email}
              </Box>
            </Flex>
          ))}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default memo(CustomAccord);
