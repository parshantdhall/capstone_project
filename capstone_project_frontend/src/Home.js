import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { userContext } from "./components/context provider/Context";
import SponserDash from "./components/sponser components/SponserDash";
import StudentDash from "./components/student/StudentDash";
import TeacherDash from "./components/teacher/TeacherDash";

function Home() {
  const globalStateData = useContext(userContext);

  const currentUserRole =
    globalStateData.userData.role && globalStateData.userData.role.name;

  switch (currentUserRole) {
    case "Sponser":
      return <SponserDash />;
    case "Student":
      return <StudentDash />;
    case "Teacher":
      return <TeacherDash />;
    default:
      return <Redirect to="/" />;
  }
}

export default Home;
