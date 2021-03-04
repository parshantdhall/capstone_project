import { Box, Text, Heading, VStack, Divider } from "@chakra-ui/react";
import { memo } from "react";
const Card = ({ pTitle, pDescription, pid, studentAllowed, groupAllowed }) => {
  return (
    <Box
      boxShadow="lg"
      backgroundColor="white"
      p={4}
      borderRadius="lg"
      maxW="md"
      cursor="pointer"
      _hover={{
        transform: "translateY(-3px)",
        transition: ".2s cubic-bezier(.17,.67,.83,.67) all",
      }}
    >
      <VStack spacing="10px">
        {/* card header */}
        <Box as="header">
          <Heading as="h2" fontSize="xl">
            Project Title
          </Heading>
        </Box>
        {/* card content */}
        <Box>
          <Text as="p" fontSize="sm">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lor
          </Text>
        </Box>
        {/* card footer */}
        <Divider />
        <Box
          as="footer"
          w="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <VStack>
            <Text as="p" fontSize="sm">
              Id
            </Text>
            <Text as="p" fontSize="sm">
              5
            </Text>
          </VStack>
          <VStack>
            <Text as="p" fontSize="sm">
              Students allowed
            </Text>
            <Text as="p" fontSize="sm">
              3
            </Text>
          </VStack>
          <VStack>
            <Text as="p" fontSize="sm">
              Groups allowed
            </Text>
            <Text as="p" fontSize="sm">
              2
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default memo(Card);
