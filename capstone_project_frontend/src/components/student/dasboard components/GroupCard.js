import { Box, HStack, Text } from "@chakra-ui/react";
import LeaveGroup from "./LeaveGroup";

const GroupCard = ({ groupId, groupMembers, handleLeave }) => {
  return (
    <>
      {/* Group Card */}
      <Box
        bgColor="white"
        boxShadow="lg"
        p={2}
        borderRadius="lg"
        m={3}
        minH="100px"
        maxH="420px"
        overflowY="auto"
      >
        {/* -------header---------- */}
        <Box
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Text as="h2" fontSize="lg" fontWeight="bold">
            Group - {groupId}
          </Text>

          <HStack spacing="5px">
            <Text as="p" fontSize="xs" color="gray.500">
              {groupMembers && groupMembers.length} members
            </Text>
            {/* -----Leave Button----- */}
            <LeaveGroup handleLeave={handleLeave} />
          </HStack>
        </Box>
        {/* -----------Content-------- */}
        {/* Small Card */}
        <Box>
          {groupMembers &&
            groupMembers.map((member) => (
              <Box
                key={member.id}
                bgColor="gray.100"
                borderRadius="lg"
                p={2}
                m={2}
                maxW="280px"
              >
                <Text as="p">{member.username}</Text>
                <Text as="p" color="gray.500">
                  {member.email}
                </Text>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default GroupCard;
