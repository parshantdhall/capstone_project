import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ListItem,
  Text,
  List,
  IconButton,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import AddProjectAcc from "./AddProjectAcc";

const AllocateSupervisorTable = ({
  supervisorData,
  handleSupervisorProjAlloc,
  handleRemoveAlocatedProject,
}) => {
  return (
    <Table variant="simple" mt={2}>
      <Thead>
        <Tr>
          <Th isNumeric>User Id</Th>
          <Th>Username</Th>
          <Th>Allocated projects</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {supervisorData && supervisorData.length > 0 ? (
          supervisorData.map((supervisor) => (
            <Tr
              _hover={{
                boxShadow: "1px 2px 4px rgba(0,0,0,.2)",
                transform: "translateY(-5px)",
                transition: ".2s ease",
              }}
              key={supervisor.id}
            >
              <Td isNumeric>{supervisor.id && supervisor.id}</Td>
              <Td>
                <Text as="p">{supervisor.username && supervisor.username}</Text>
              </Td>
              {/* projects allocated */}
              <Td>
                <List>
                  {supervisor.supervising_projects &&
                  supervisor.supervising_projects.length > 0 ? (
                    supervisor.supervising_projects.map((pro) => (
                      <ListItem key={pro.id} m={2}>
                        {pro.project_title} - {pro.id}
                        <IconButton
                          icon={<FaTrash />}
                          size="xs"
                          colorScheme="red"
                          ml={2}
                          onClick={() =>
                            handleRemoveAlocatedProject(supervisor.id, pro.id)
                          }
                        />
                      </ListItem>
                    ))
                  ) : (
                    <p>No Project Allocated!</p>
                  )}
                </List>
              </Td>
              <Td>
                <AddProjectAcc
                  handleSupervisorProjAlloc={handleSupervisorProjAlloc}
                  userId={supervisor.id}
                />
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            {" "}
            <Td></Td>
            <Td></Td>
            <Td>No Data Found</Td>
            <Td></Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};
export default AllocateSupervisorTable;
