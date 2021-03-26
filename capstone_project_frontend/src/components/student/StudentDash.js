import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Center, Text, useToast, Spinner } from "@chakra-ui/react";
import { get_student_group, user_route } from "../../lib/api_routes";
import { userContext } from "../context provider/Context";
import GroupCard from "./dasboard components/GroupCard";
import ProjectCard from "./dasboard components/ProjectCard";
import AllProjects from "./dasboard components/AllProjects";
import JoinGroup from "./dasboard components/JoinGroup";
import ShowPriority from "./dasboard components/ShowPriority";

const StudentDash = () => {
  // ------GLobal state data-----------
  const { userData, updateGlobalUserData } = useContext(userContext);
  const toast = useToast();
  // -----------Local State------------
  const [studentGroupData, setStudentGroupData] = useState({});
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [projectPrior, setProjectPrior] = useState([]);
  const [isPrioritySubmitBtnLoading, setIsPrioritySubmitBtnLoading] = useState(
    false
  );

  // -----fetching on first page load---------
  useEffect(() => {
    let groupId;
    if (userData.id) {
      if (userData.student_group !== null) {
        groupId =
          typeof userData.student_group === "number"
            ? userData.student_group
            : userData.student_group.id;

        setIsPageLoading(true);
        // fetch data
        axios
          .get(
            `${get_student_group.url}/${groupId}`,
            get_student_group.requestHeader
          )
          .then((res) => {
            setStudentGroupData(res.data);
            setProjectPrior(res.data.project_priorities);
            setIsPageLoading(false);
          })
          .catch((err) => {
            console.dir(err.response);
            setIsPageLoading(false);
          });
      } else {
        setStudentGroupData({});
        setIsPageLoading(false);
      }
    }
  }, [userData.id, userData.student_group]);

  // -----------Handling functions----------------
  // handle create group
  const handleCreateGroup = async () => {
    /**
     * Here it will update have_group to true
     * Then will create a group with student member as itself
     */
    try {
      // setting btn loading to true
      setIsButtonLoading(true);

      // creating the group
      const res = await axios.post(
        get_student_group.url,
        {
          group_members: [{ id: userData.id, username: userData.username }],
        },
        get_student_group.requestHeader
      );

      if (res.status === 200) {
        setStudentGroupData(res.data);
        // update user to have group
        const updateUserRes = await axios.put(
          `${user_route.url}/${userData.id}`,
          {
            have_group: true,
          },
          user_route.requestHeader
        );
        if (updateUserRes.status === 200) {
          updateGlobalUserData({ ...userData, have_group: true });

          // setting btn loading to false
          setIsButtonLoading(false);

          // SHowing the toast after sucessful group creation
          toast({
            title: `Group - ${res.data.id} Created Sucessfully`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          throw new Error(updateUserRes);
        }
      }
    } catch (err) {
      if (err.response) {
        console.dir(err.response);
      } else {
        console.dir(err);
      }
    }
  };

  // handle leave group
  const handleLeave = async () => {
    setIsPageLoading(true);

    try {
      // check if there are no member left in the group it will del the group
      const totalGMembers = studentGroupData.group_members.length;
      if (Number(totalGMembers) <= 1) {
        let groupId;
        if (userData.id) {
          if (userData.student_group !== null) {
            groupId =
              typeof userData.student_group === "number"
                ? userData.student_group
                : userData.student_group.id;
            const delGroup = await axios.delete(
              `${get_student_group.url}/${groupId}`,
              get_student_group.requestHeader
            );
            if (delGroup.status === 200)
              console.dir("Group Deleted due to no member left");
          }
        }
      }
      // ---Updating the user group info---
      const res = await axios.put(
        `${user_route.url}/${userData.id}`,
        {
          have_group: false,
          student_group: null,
        },
        user_route.requestHeader
      );
      if (res.status === 200) {
        // Updating user state locally
        updateGlobalUserData({
          ...userData,
          have_group: false,
          student_group: null,
        });

        // updating local group data
        setStudentGroupData({});
        setProjectPrior([]);
        // SHowing the toast after sucessful group Leave
        toast({
          title: "Group Left Sucessfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.dir(err.response);
    }
    setIsPageLoading(false);
  };

  // handle group join
  const handleJoin = async (groupId) => {
    setIsPageLoading(true);

    try {
      const res = await axios.put(
        `${user_route.url}/${userData.id}`,
        {
          have_group: true,
          student_group: {
            id: groupId,
          },
        },
        user_route.requestHeader
      );
      if (res.status === 200) {
        // Updating user state locally
        updateGlobalUserData({
          ...userData,
          have_group: true,
          student_group: res.data.student_group,
        });

        // updating local group data
        setStudentGroupData({ ...res.data.student_group });
        // SHowing the toast after sucessful group Leave
        toast({
          title: `Group - ${res.data.student_group.id} Joined Sucessfully`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.dir(err.response);
    }
    setIsPageLoading(false);
  };

  // -----------Handle add to priority list-------
  const handleAddToPriorityList = (newProjectPriority) => {
    setProjectPrior((prevState) => [...prevState, newProjectPriority]);
  };

  // -----------Handle Remove from priority list-------

  const handleRemoveFromPriorityList = (pId) => {
    setProjectPrior((prevState) => {
      const pList = [...prevState];
      const indexNum = pList.findIndex((project) => project.id === pId);
      pList.splice(indexNum, 1);
      return pList;
    });
  };

  // -------handle project priority Submission-----------
  const submitProjectPriorities = async () => {
    const grupId = studentGroupData.id && studentGroupData.id;
    // retriving ids from the priority array
    const projectIdList = projectPrior.map((project) => ({ id: project.id }));
    setIsPrioritySubmitBtnLoading(true);
    try {
      // setting submit button loading to true
      const res = await axios.put(
        `${get_student_group.url}/${grupId}`,
        {
          is_project_priorities_submitted: true,
          project_priorities: projectIdList,
        },
        get_student_group.requestHeader
      );

      setStudentGroupData(res.data);
      setIsPrioritySubmitBtnLoading(false);

      // SHowing the toast after sucessful submission
      toast({
        title: `Submission sucessfull`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      setIsPrioritySubmitBtnLoading(false);
      console.dir(err.response);
    }
  };

  // -----rendering componenets----------
  return (
    <Box as="section" p={4}>
      {/* Header */}
      <Box as="header">
        <Text
          as="p"
          fontSize="3xl"
          fontFamily="Roboto,sans-serif"
          fontWeight="bold"
          color="gray.700"
        >
          Hello,
        </Text>
        <Text
          as="p"
          fontSize="3xl"
          fontFamily="Roboto,sans-serif"
          color="blue.900"
        >
          {userData &&
            userData.username.charAt(0).toUpperCase() +
              userData.username.slice(1)}
          !
        </Text>
      </Box>
      {/* -------------------------Content-------------------------- */}
      {isPageLoading ? (
        <Center mt={8}>
          <Spinner />
        </Center>
      ) : (
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="flex-start"
          flexWrap="wrap"
          mt={1}
        >
          {userData.have_group && userData.have_group ? (
            // ------ Group Card ----
            <GroupCard
              groupId={studentGroupData.id && studentGroupData.id}
              groupMembers={
                studentGroupData.group_members && studentGroupData.group_members
              }
              handleLeave={handleLeave}
            />
          ) : (
            <Box
              bgColor="white"
              boxShadow="lg"
              p={2}
              borderRadius="lg"
              m={3}
              minH="100px"
            >
              <Center
                color="gray.500"
                bgColor="gray.100"
                borderRadius="lg"
                p={3}
                fontSize="lg"
              >
                No Group
              </Center>
              <Box m={2}>
                <Button
                  colorScheme="facebook"
                  m={2}
                  onClick={handleCreateGroup}
                  isLoading={isButtonLoading}
                >
                  create Group
                </Button>
                <JoinGroup handleJoin={handleJoin} />
              </Box>
            </Box>
          )}

          {/* -------Project Card--------- */}
          {userData.have_group &&
          userData.have_group &&
          studentGroupData.id &&
          studentGroupData.is_project_allocated ? (
            <ProjectCard
              projectData={
                studentGroupData.project_allocated &&
                studentGroupData.project_allocated
              }
            />
          ) : (
            <Box
              bgColor="white"
              boxShadow="lg"
              p={2}
              borderRadius="lg"
              m={3}
              minH="100px"
            >
              <Center
                color="gray.500"
                bgColor="gray.100"
                borderRadius="lg"
                p={3}
                fontSize="lg"
              >
                No Project allocated yet!
              </Center>
            </Box>
          )}
          {/* ------------All Projects-------------- */}
          <AllProjects
            haveGroup={userData.have_group && userData.have_group}
            isPrioritySubmitted={
              studentGroupData.is_project_priorities_submitted &&
              studentGroupData.is_project_priorities_submitted
            }
            projectPrior={projectPrior}
            handleAddToPriorityList={handleAddToPriorityList}
          />

          {/* ------Showing priorities------- */}
          <ShowPriority
            priorities={projectPrior}
            isPrioritySubmitted={
              studentGroupData.is_project_priorities_submitted &&
              studentGroupData.is_project_priorities_submitted
            }
            handleRemoveFromPriorityList={handleRemoveFromPriorityList}
            submitProjectPriorities={submitProjectPriorities}
            isPrioritySubmitBtnLoading={isPrioritySubmitBtnLoading}
          />
          {/* ----------Content End-------------- */}
        </Box>
      )}
    </Box>
  );
};

export default StudentDash;
