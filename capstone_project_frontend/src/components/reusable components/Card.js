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
            {pTitle}
          </Heading>
        </Box>
        {/* card content */}
        <Box>
          <Text as="p" fontSize="sm">
            {pDescription}
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
          <VStack fontSize="xs">
            <Text as="p">Id</Text>
            <Text as="p">{pid}</Text>
          </VStack>
          <VStack fontSize="xs">
            <Text as="p">Students allowed</Text>
            <Text as="p">{studentAllowed}</Text>
          </VStack>
          <VStack fontSize="xs">
            <Text as="p">Groups allowed</Text>
            <Text as="p">{groupAllowed}</Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default memo(Card);
