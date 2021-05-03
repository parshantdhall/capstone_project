import {
  Box,
  Center,
  Container,
  Heading,
  Spinner,
  Grid,
} from "@chakra-ui/react";
import SideNav from "../../reusable components/SideNav";
const TeacherLayout = ({ isPageLoading, heading, children }) => {
  return (
    <Grid templateColumns="15% 85%" w="100%" h="100%">
      {/* ---------side navbar-------- */}
      <SideNav />

      {/* ------------Rest of the page-------- */}
      <Box as="section" mt={3}>
        {/* -------Header--------- */}
        <Center>
          <Heading as="h1" fontFamily="Roboto">
            {heading}
          </Heading>
        </Center>
        {isPageLoading ? (
          <Center mt={8}>
            <Spinner />
          </Center>
        ) : (
          // ----------Content ------------

          <Container role="Section content" maxW="container.lg">
            {/* -----Table-------- */}
            {children}
          </Container>
        )}
      </Box>
    </Grid>
  );
};

export default TeacherLayout;
