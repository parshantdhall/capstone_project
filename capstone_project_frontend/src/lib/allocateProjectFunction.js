const findIndex = (arr, pId) => {
  return arr.findIndex((item) => item.id === pId);
};
const allocateProjectFunction = (projectsList, groupsList) => {
  let availProjects = projectsList.map((project) => ({
    id: project.id,
    numOfGroupsAllowed: Number(project.number_of_groups_allowed),
    numOfStudentsAllowed: Number(project.number_of_students_allowed),
  }));

  const allocatedData = groupsList.map((group) => {
    let allocatedGroup;
    let notAllocatedGroup;
    //  first check if the groups has not project allocatd and 3 >= num of members <= 5.
    if (
      !group.is_project_allocated &&
      group.is_project_priorities_submitted &&
      group.group_members.length >= 3 &&
      group.group_members.length <= 5
    ) {
      const priorityList = group.project_priorities;
      // Loop through the group priorities using for loop coz we need to use break and continue
      for (let i = 0; i < priorityList.length; i++) {
        // Find the project in the avial project arr
        let indexNum = findIndex(availProjects, priorityList[i].id);
        let allowedNumOfGroups;
        let allowedNumOfMembers;
        let projectFound;
        if (indexNum !== -1) {
          //   if we found the project then get stuff
          projectFound = availProjects[indexNum];
          allowedNumOfGroups = projectFound.numOfGroupsAllowed;
          allowedNumOfMembers = projectFound.numOfStudentsAllowed;
        } else {
          //   if project not found then continue
          continue;
        }
        //   check if the project is avail to allocate using num of groups allowed left
        if (allowedNumOfGroups > 0) {
          //   check num of group members allowed
          // check if the members are less than or equals to members allowed
          if (group.group_members.length <= allowedNumOfMembers) {
            // allocate the project to the group
            allocatedGroup = { gId: group.id, pId: priorityList[i].id };
            // updating the availProjects list
            projectFound.numOfGroupsAllowed -= 1;
            availProjects.splice(indexNum, 1, projectFound);
            //   if allocated then ignore rest of priorities for gud performance
            break;
          } else {
            continue;
          }
        } else {
          continue;
        }
      }
    } else {
      notAllocatedGroup = { gId: group.id };
    }
    return { allocatedGroup, notAllocatedGroup };
  });

  return allocatedData;
};

export default allocateProjectFunction;
