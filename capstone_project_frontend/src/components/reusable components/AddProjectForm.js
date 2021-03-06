import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Box,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { file_upload, create_project_form } from "../../lib/api_routes";
import {
  validateProjectForm,
  validateProjectFormFileType,
} from "../../lib/formValidation";
import CustomAlert from "./CustomAlert";

const AddProjectForm = ({ isOpen, onClose, updateProjectData }) => {
  // ----------Local State-----------
  const [formData, setFormData] = useState({
    project_title: "",
    project_description: "",
    number_of_students_allowed: 0,
    number_of_groups_allowed: 0,
    project_file: "",
  });
  const [fileData, setFileData] = useState({
    files: "",
  });

  const [error, setError] = useState({
    isShowing: false,
    title: "",
  });
  // -----------global variables------------
  const firstField = useRef();
  const toast = useToast();
  //-----------   functions --------

  const handleChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));

    setError({
      isShowing: false,
      title: "",
    });
  };

  const handleFileChange = (e) => {
    setFileData({
      files: e.target.files[0],
    });

    setError({
      isShowing: false,
      title: "",
    });
  };

  //   Handle just file submit
  const handleFileUpload = async (e) => {
    e.preventDefault();
    // File validation
    const { isError, message } = validateProjectFormFileType(fileData.files);
    if (isError) {
      setError({
        isShowing: isError,
        title: message,
      });
      return;
    }
    const fmData = new FormData();
    fmData.append("files", fileData.files);
    try {
      const res = await axios.post(file_upload.url, fmData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${
            window && window.sessionStorage.getItem("token")
          }`,
        },
      });
      console.dir(res.data[0]);
      setFormData((prevState) => ({
        ...prevState,
        project_file: res.data[0],
      }));
    } catch (err) {
      console.dir(err.response.data.data.errors[0]);
    }
  };

  //   handle full form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation
    const { isError, message } = validateProjectForm(formData);
    if (isError) {
      setError({
        isShowing: isError,
        title: message,
      });
      return;
    }
    try {
      const res = await axios.post(create_project_form.url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            window && window.sessionStorage.getItem("token")
          }`,
        },
      });
      // If everything gone well
      if (res.status === 200 && res.statusText === "OK") {
        // reset the Local State
        setFormData({
          project_title: "",
          project_description: "",
          number_of_students_allowed: 0,
          number_of_groups_allowed: 0,
          project_file: "",
        });

        setFileData({ files: "" });

        setError({
          isShowing: false,
          title: "",
        });
        // Update the Project data and close the drawer
        updateProjectData(res.data);
        onClose();
        // Show the sucess toast
        toast({
          title: `Project ${res.data.project_title} created successfully`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      initialFocusRef={firstField}
      size="lg"
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Add a new Project{" "}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px" as="form">
              {/* Configuring the alert */}
              {error.isShowing ? (
                <CustomAlert type="error" alertTitle={error.title} />
              ) : (
                ""
              )}
              <Box>
                <FormLabel htmlFor="pTitle">Project Title</FormLabel>
                <Input
                  id="pTitle"
                  placeholder="Title of project"
                  ref={firstField}
                  name="project_title"
                  value={FormData.project_title}
                  onChange={(e) => handleChange(e)}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="pDesc">Project Description</FormLabel>
                <Textarea
                  id="pDesc"
                  rows="6"
                  name="project_description"
                  value={FormData.project_description}
                  onChange={(e) => handleChange(e)}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="studentAllowed">
                  Num of Students Allowed
                </FormLabel>
                <Input
                  id="studentAllowed"
                  type="number"
                  min="1"
                  placeholder="num of students allowed in project"
                  name="number_of_students_allowed"
                  value={FormData.number_of_students_allowed}
                  onChange={(e) => handleChange(e)}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="groupsAllowed">
                  Num of groups Allowed
                </FormLabel>
                <Input
                  id="groupsAllowed"
                  type="number"
                  min="1"
                  placeholder="num of groups allowed for project"
                  name="number_of_groups_allowed"
                  value={FormData.number_of_groups_allowed}
                  onChange={(e) => handleChange(e)}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="groupsAllowed">Project file</FormLabel>
                <Input
                  id="project file"
                  type="file"
                  onChange={(e) => handleFileChange(e)}
                  p={2}
                  mb={2}
                />
                <Button
                  size="sm"
                  colorScheme="teal"
                  onClick={(e) => handleFileUpload(e)}
                >
                  upload
                </Button>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default AddProjectForm;
