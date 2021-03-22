import { Box, Button, Center, Heading, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaMagic } from "react-icons/fa";
import allocateProjectFunction from "../../lib/allocateProjectFunction";
import { get_project_form, get_student_group } from "../../lib/api_routes";

const TeacherDash = () => {
  // -----------Local States-----------
  const [groupsList, setGroupsList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [isAllocBtnLoading, setIsAllocBtnLoading] = useState(false);
  const [allocatedData, setAllocatedData] = useState([]);

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
    } catch (err) {
      console.dir(err.response);
    }
  };

  useEffect(() => {
    fetchStuff();
  }, []);

  // ---function to handle project allocation using the imported function---
  const handleAllocation = async () => {
    setIsAllocBtnLoading(true);
    const allocData = allocateProjectFunction(projectsList, groupsList).map(
      (item) => item.allocatedGroup
    );
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
      setAllocatedData(updatedRes);
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
  return (
    <Box as="section">
      {/* -------Header--------- */}
      <Center>
        <Heading as="h1" fontFamily="Roboto">
          Teacher Dashboard
        </Heading>
      </Center>
      {/* -------Content body----------- */}
      <Box>
        <Button
          colorScheme="orange"
          rightIcon={<FaMagic />}
          m={2}
          isLoading={isAllocBtnLoading}
          onClick={handleAllocation}
        >
          Allocate Projects
        </Button>
      </Box>
    </Box>
  );
};

export default TeacherDash;
