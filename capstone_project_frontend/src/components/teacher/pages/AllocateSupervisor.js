import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { user_route } from "../../../lib/api_routes";
import AllocateSupervisorTable from "../dash components/AllocateSupervisorTable";

import TeacherLayout from "../dash components/TeacherLayout";

const AllocateSupervisor = () => {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [supervisorData, setSupervisorData] = useState([]);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      setIsPageLoading(true);
      try {
        const { data } = await axios.get(
          user_route.url,
          user_route.requestHeader
        );
        const filteredData = data.filter(
          (user) => user.role.type === "supervisor"
        );
        console.dir(data);
        setSupervisorData(filteredData);
        setIsPageLoading(false);
      } catch (e) {
        console.dir(e.response);
        setIsPageLoading(false);
      }
    })();
  }, []);

  // ------------- Allocating project to supervisor------------------

  const handleSupervisorProjAlloc = async (userId, projectId) => {
    const getSupervisor = supervisorData.find(
      (supervisor) => supervisor.id === userId
    );
    if (getSupervisor !== undefined) {
      const supervisingProjects = getSupervisor.supervising_projects;
      supervisingProjects.push(projectId);
      try {
        const { data } = await axios.put(
          `${user_route.url}/${userId}`,
          { supervising_projects: supervisingProjects },
          user_route.requestHeader
        );
        //updating the local state data
        setSupervisorData((prevState) => {
          const getIndex = prevState.findIndex((user) => user.id === userId);
          if (getIndex !== -1) {
            const updatedData = [...prevState];
            updatedData.splice(getIndex, 1, data);
            console.dir(updatedData);
            return updatedData;
          }
        });

        toast({
          title: `Project Allocated Sucessfully`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (e) {
        console.dir(e.response);
        toast({
          title: `Server Error`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  // -------------Deleting allocated project------------------

  const handleRemoveAlocatedProject = async (userId, projectId) => {
    const getSupervisor = supervisorData.find(
      (supervisor) => supervisor.id === userId
    );

    if (getSupervisor !== undefined) {
      const supervisingProjects = getSupervisor.supervising_projects;
      const projectIndex = supervisingProjects.findIndex(
        (project) => project.id === projectId
      );
      // if project doesnot found to get deleted
      if (projectIndex === -1) throw new Error("Project Not found");
      //deleting the project
      supervisingProjects.splice(projectIndex, 1);
      try {
        const { data } = await axios.put(
          `${user_route.url}/${userId}`,
          { supervising_projects: supervisingProjects },
          user_route.requestHeader
        );
        //updating the local state data
        setSupervisorData((prevState) => {
          const getIndex = prevState.findIndex((user) => user.id === userId);
          if (getIndex !== -1) {
            const updatedData = [...prevState];
            updatedData.splice(getIndex, 1, data);
            return updatedData;
          }
        });

        toast({
          title: `Project Removed Sucessfully`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (e) {
        console.dir(e.response || e);
        toast({
          title: e.response ? "Server Error" : e,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <TeacherLayout
      heading="Allocate Project Supervisor"
      isPageLoading={isPageLoading}
    >
      <AllocateSupervisorTable
        supervisorData={supervisorData}
        handleSupervisorProjAlloc={handleSupervisorProjAlloc}
        handleRemoveAlocatedProject={handleRemoveAlocatedProject}
      />
    </TeacherLayout>
  );
};

export default AllocateSupervisor;
