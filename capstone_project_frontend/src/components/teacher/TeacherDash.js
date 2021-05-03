import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaMagic } from "react-icons/fa";
import allocateProjectFunction from "../../lib/allocateProjectFunction";
import { get_project_form, get_student_group } from "../../lib/api_routes";
import GroupAllocatedTable from "./dash components/GroupAllocatedTable";
import TeacherLayout from "./dash components/TeacherLayout";

const TeacherDash = () => {
  // -----------Local States-----------
  const [groupsList, setGroupsList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [isAllocBtnLoading, setIsAllocBtnLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);

  // ----------Other var----------
  const toast = useToast();

  // ---Function to fetch stuff--
  const fetchStuff = async () => {
    try {
      const allProjects = await (
        await axios.get(get_project_form.url, get_project_form.requestHeader)
      ).data;
      const allGroups = await (
        await axios.get(get_student_group.url, get_student_group.requestHeader)
      ).data;

      setGroupsList(allGroups);
      setProjectsList(allProjects);
      setIsPageLoading(false);
    } catch (err) {
      console.dir(err.response);
    }
  };

  useEffect(() => {
    setIsPageLoading(true);
    fetchStuff();
    setIsPageLoading(false);
  }, []);

  // ---function to handle project allocation using the imported function---
  const handleAllocation = async () => {
    setIsAllocBtnLoading(true);
    // grabbing allocated groups data
    const allocData = allocateProjectFunction(projectsList, groupsList).map(
      (item) => item.allocatedGroup
    );
    // console.dir(allocData);
    const filteredAllocatedData = allocData.filter(
      (item) => item !== undefined
    );
    try {
      if (filteredAllocatedData.length === 0) {
        throw new Error("No Group to allocate project");
      }
      // update the groups in the db
      const promiseList = filteredAllocatedData.map((data) =>
        axios.put(
          `${get_student_group.url}/${data.gId}`,
          { is_project_allocated: true, project_allocated: data.pId },
          get_student_group.requestHeader
        )
      );
      const updatedRes = (await Promise.all(promiseList)).map(
        (res) => res.data
      );
      // Updating project's num of groups to allocate left
      const projectPromiseList =
        updatedRes.length > 0 &&
        updatedRes.map((res) =>
          axios.put(
            `${get_project_form.url}/${res.project_allocated.id}`,
            {
              num_of_groups_left_to_alloc:
                Number(res.project_allocated.num_of_groups_left_to_alloc) - 1,
            },
            get_project_form.requestHeader
          )
        );
      (await Promise.all(projectPromiseList)).map((res) => res.data);

      // Fetching the whole group and project data again
      fetchStuff();

      setIsAllocBtnLoading(false);
      toast({
        title: "Project Allocation Done Sucessfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: err.message || "There's some error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsAllocBtnLoading(false);

      console.dir(err.message || err.response);
    }
  };

  const allocatedGroupData =
    groupsList.length > 0 &&
    groupsList.filter((group) => group.is_project_allocated);

  const unAllocatedGroupData =
    groupsList.length > 0 &&
    groupsList.filter((group) => !group.is_project_allocated);

  return (
    <TeacherLayout isPageLoading={isPageLoading} heading="Allocate Project">
      {/* -----Table-------- */}
      <Button
        colorScheme="orange"
        rightIcon={<FaMagic />}
        m={2}
        isLoading={isAllocBtnLoading}
        onClick={handleAllocation}
      >
        Allocate Projects
      </Button>
      <Heading as="h2" m={2} fontSize="xl">
        Allocated Groups
      </Heading>
      <Box boxShadow="lg" borderRadius="lg">
        <GroupAllocatedTable groupsList={allocatedGroupData} />
      </Box>
      <Heading as="h2" m={2} fontSize="xl">
        Unallocated Groups
      </Heading>
      <Box mt={5} boxShadow="lg" borderRadius="lg">
        <GroupAllocatedTable groupsList={unAllocatedGroupData} />
      </Box>
    </TeacherLayout>
  );
};

export default TeacherDash;
