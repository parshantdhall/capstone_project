import { useContext } from "react";
import { userContext } from "./components/context provider/Context";
import SponserDash from "./components/sponser components/SponserDash";
import StudentDash from "./components/student/StudentDash";

function Home() {
  const globalStateData = useContext(userContext);

  const currentUserRoleSponser =
    globalStateData.userData.role &&
    globalStateData.userData.role.name === "Sponser";
  return (
    <main>{currentUserRoleSponser ? <SponserDash /> : <StudentDash />}</main>
  );
}

export default Home;
