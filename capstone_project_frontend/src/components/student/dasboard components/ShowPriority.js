import { Box, Button, Center, Flex, IconButton, Text } from "@chakra-ui/react";
import { memo } from "react";
import { FaTrashAlt } from "react-icons/fa";
const ShowPriority = ({
  priorities,
  isPrioritySubmitted,
  handleRemoveFromPriorityList,
  submitProjectPriorities,
  isPrioritySubmitBtnLoading,
}) => {
  const pLen = priorities && priorities.length;
  return (
    <Box
      bgColor="white"
      boxShadow="lg"
      p={2}
      borderRadius="lg"
      m={3}
      minH="100px"
    >
      <Text as="h2" fontSize="lg" fontWeight="bold" mb={2}>
        Project priorities
      </Text>
      {pLen > 0 ? (
        <Box>
          {priorities &&
            priorities.map((priority) => (
              <Box
                key={priority.id}
                bgColor="gray.100"
                borderRadius="lg"
                p={2}
                m={2}
                maxW="300px"
              >
                <Flex justifyContent="space-between" alignItems="center" my={2}>
                  <Text as="p">{priority.id}</Text>
                  {!isPrioritySubmitted ? (
                    <IconButton
                      icon={<FaTrashAlt />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleRemoveFromPriorityList(priority.id)}
                    />
                  ) : (
                    ""
                  )}
                </Flex>
                <Text as="p" color="gray.500">
                  {priority.project_title}
                </Text>
              </Box>
            ))}
          {/* --------------Submit Btn---------------- */}
          {/* Check if the priorities are submitted then show submmitted text rather then button */}
          {isPrioritySubmitted ? (
            <Box
              bgColor="gray.200"
              color="green.600"
              m={2}
              p={2}
              borderRadius="lg"
            >
              Submitted!
            </Box>
          ) : (
            // this button will remain disabled until group select 3 priorities
            <Button
              role="submit project priorities"
              aria-label="submit project priorities"
              colorScheme="linkedin"
              isDisabled={pLen < 3}
              m={2}
              onClick={submitProjectPriorities}
              isLoading={isPrioritySubmitBtnLoading}
            >
              Submit
            </Button>
          )}
        </Box>
      ) : (
        // If no project selected
        <Center
          color="gray.500"
          bgColor="gray.100"
          borderRadius="lg"
          p={3}
          fontSize="md"
          maxW="200px"
        >
          No Projects Priorities selected please select any 3 from list of
          projects
        </Center>
      )}
    </Box>
  );
};

export default memo(ShowPriority);
