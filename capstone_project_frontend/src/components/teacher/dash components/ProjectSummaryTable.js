import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
const ProjectSummaryTable = ({ projectData, docRef }) => {
  const manageBgColor = (numOfGroupsLeftToAlloc, maxGroupsAllowed) => {
    if (numOfGroupsLeftToAlloc === maxGroupsAllowed) {
      return "green.200";
    } else if (numOfGroupsLeftToAlloc === 0) {
      return "red.200";
    } else {
      return "yellow.200";
    }
  };
  return (
    <Table variant="simple" boxShadow="xl" ref={docRef}>
      <Thead bgColor="white" pos="sticky" top="0">
        <Tr>
          <Th isNumeric color="green.400">
            Project Id
          </Th>
          <Th color="green.400">Project Title</Th>
          <Th color="green.400">Project Description</Th>
          <Th color="green.400">Project Sponsor</Th>

          {/* <Th color="green.400" isNumeric>
            Max Groups Allowed
          </Th> */}
          <Th color="green.400" isNumeric>
            Num Of Groups Left to Allocate
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {projectData.length && projectData.length > 0 ? (
          projectData.map((project) => (
            <Tr
              key={project.id}
              _hover={{
                boxShadow: "1px 2px 4px rgba(0,0,0,.2)",
                transform: "translateY(-5px)",
                transition: ".2s ease",
              }}
              backgroundColor={manageBgColor(
                project.num_of_groups_left_to_alloc,
                project.number_of_groups_allowed
              )}
            >
              <Td isNumeric>{project.id}</Td>
              <Td fontWeight="bold">{project.project_title}</Td>
              <Td>{project.project_description}</Td>
              <Td>{project.user.username}</Td>

              {/* <Td isNumeric>{project.number_of_groups_allowed}</Td> */}
              <Td isNumeric>{project.num_of_groups_left_to_alloc}</Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td></Td>
            <Td>No Data to show</Td>
            <Td></Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default ProjectSummaryTable;
