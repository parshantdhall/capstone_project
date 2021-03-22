import { Box, Button, Text } from "@chakra-ui/react";
import { FaFileDownload } from "react-icons/fa";

const ProjectCard = ({ projectData }) => {
  return (
    <Box
      bgColor="white"
      boxShadow="lg"
      p={2}
      borderRadius="lg"
      m={3}
      minH="100px"
    >
      <Text as="h2" fontSize="lg" fontWeight="bold">
        Allocated Project - {projectData && projectData.id}
      </Text>
      {/* Small Card */}
      <Box bgColor="gray.100" borderRadius="lg" p={2} m={2} maxW="320px">
        <Text as="p" fontSize="md" fontWeight="bold">
          {projectData && projectData.project_title}
        </Text>
        <Text as="p" color="gray.500">
          {projectData && projectData.project_description}
        </Text>
      </Box>
      <Box>
        <Button
          m={2}
          rightIcon={<FaFileDownload />}
          colorScheme="pink"
          size="sm"
        >
          <a
            href={`http://localhost:1337${
              projectData &&
              projectData.project_file &&
              projectData.project_file.url
            }`}
            download="true"
          >
            Download Project file
          </a>
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectCard;
