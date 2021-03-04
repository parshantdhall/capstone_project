import { Box, SimpleGrid } from "@chakra-ui/react";
import Card from "../reusable components/Card";

const SponserDash = () => {
  return (
    <Box as="section" p={3}>
      <SimpleGrid minChildWidth="250px" spacing="40px">
        {/* card */}
        <Card />
      </SimpleGrid>
    </Box>
  );
};

export default SponserDash;
