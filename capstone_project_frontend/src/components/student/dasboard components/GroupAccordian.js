import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Text,
  Tag,
  TagLabel,
  TagRightIcon,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
const GroupAccordian = ({ groupData, handleJoin, closeAccord }) => {
  const totalMembers =
    groupData.group_members && groupData.group_members.length;
  return (
    <AccordionItem bgColor={totalMembers < 5 ? "white" : "gray.100"} m={2}>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Group - {groupData.id}
          </Box>
          <Tag size="sm" colorScheme={totalMembers >= 5 ? "red" : "green"}>
            <TagLabel>{totalMembers}</TagLabel>
            <TagRightIcon as={FaUser} />
          </Tag>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text as="h3" fontWeight="bold" color="orange.300">
            Student Name
          </Text>
        </Flex>
        {totalMembers > 0 &&
          groupData.group_members.map((member) => (
            <Flex
              key={member.id}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box as="p" m={1}>
                {member.username}
              </Box>
            </Flex>
          ))}
        {/* ----Join Button------- */}
        {totalMembers < 5 ? (
          <Flex justifyContent="space-between">
            <Spacer />
            <Button
              colorScheme="whatsapp"
              size="sm"
              onClick={() => {
                groupData.id && handleJoin(groupData.id);
                closeAccord();
              }}
            >
              Join
            </Button>
          </Flex>
        ) : (
          ""
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default GroupAccordian;
