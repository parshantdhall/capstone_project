import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";

const GroupAllocatedTable = ({ groupsList }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th
            isNumeric
            color={
              groupsList.length > 0 &&
              groupsList[0].is_project_allocated !== undefined &&
              groupsList[0].is_project_allocated
                ? "green.400"
                : "red.400"
            }
          >
            Group Id
          </Th>
          <Th
            color={
              groupsList.length > 0 &&
              groupsList[0].is_project_allocated !== undefined &&
              groupsList[0].is_project_allocated
                ? "green.400"
                : "red.400"
            }
          >
            Group Members
          </Th>
          <Th
            isNumeric
            color={
              groupsList.length > 0 &&
              groupsList[0].is_project_allocated !== undefined &&
              groupsList[0].is_project_allocated
                ? "green.400"
                : "red.400"
            }
          >
            Allocated project Id
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {groupsList.length > 0 ? (
          groupsList.map((group) => (
            <Tr
              key={group.id}
              _hover={{
                boxShadow: "1px 2px 4px rgba(0,0,0,.2)",
                transform: "translateY(-5px)",
                transition: ".2s ease",
              }}
            >
              <Td isNumeric>{group.id}</Td>
              <Td>
                <OrderedList>
                  {group.group_members && group.group_members.length > 0 ? (
                    group.group_members.map((member) => (
                      <ListItem key={member.id}>{member.username}</ListItem>
                    ))
                  ) : (
                    <p>No group Member</p>
                  )}
                </OrderedList>
              </Td>
              <Td isNumeric>
                {group.project_allocated && group.project_allocated.id
                  ? group.project_allocated.id
                  : "No Project Allocated"}
              </Td>
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

export default GroupAllocatedTable;
