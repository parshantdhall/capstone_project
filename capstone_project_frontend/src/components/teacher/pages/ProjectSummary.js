import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { createRef, useEffect, useState } from "react";
import { get_project_form } from "../../../lib/api_routes";
import ProjectSummaryTable from "../dash components/ProjectSummaryTable";
import TeacherLayout from "../dash components/TeacherLayout";
import Pdf from "react-to-pdf";
import { Button } from "@chakra-ui/button";
import { FaFilePdf } from "react-icons/fa";

const ProjectSummary = () => {
  // ---------Local states----
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [projectData, setProjectData] = useState([]);

  const toast = useToast();
  const ref = createRef();
  // function to fetch data from backend api
  // const getProjects =
  // fetching data
  useEffect(() => {
    // getProjects();
    (async () => {
      setIsPageLoading(true);
      try {
        const { data } = await axios.get(
          get_project_form.url,
          get_project_form.requestHeader
        );
        setProjectData(data);
        setIsPageLoading(false);
      } catch (e) {
        console.dir(e.response);
        toast({
          title: "Server Error",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsPageLoading(false);
      }
    })();
  }, [toast]);

  return (
    <TeacherLayout heading="Project Summary" isPageLoading={isPageLoading}>
      {/* generate pdf btn */}
      <Pdf
        targetRef={ref}
        filename="ProjectsSummary.pdf"
        x={0}
        y={0}
        scale={0.8}
      >
        {({ toPdf }) => (
          <Button
            onClick={toPdf}
            colorScheme="orange"
            rightIcon={<FaFilePdf />}
            m={2}
          >
            Get Pdf
          </Button>
        )}
      </Pdf>
      <ProjectSummaryTable
        projectData={projectData.length > 0 && projectData}
        docRef={ref}
      />
    </TeacherLayout>
  );
};

export default ProjectSummary;
