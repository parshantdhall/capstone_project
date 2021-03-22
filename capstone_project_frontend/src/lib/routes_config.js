import Home from "../Home";
import Login from "../components/auth_components/Login";
import Register from "../components/auth_components/Register";
import SingleCardPage from "../components/sponser components/pages/SingleCardPage";
import SingleProjectPage from "../components/student/pages/SingleProjectPage";

export const routes = [
  {
    path: "/",
    name: "Home",
    desc: "Home route showing various dashboards",
    component: Home,
    role: "",
    access: "private",
    id: 1,
  },
  {
    path: "/register",
    name: "Register",
    desc: "Register user",
    component: Register,
    role: "",
    access: "public",
    id: 2,
  },
  {
    path: "/login",
    name: "login",
    desc: "login user",
    component: Login,
    role: "",
    access: "public",
    id: 3,
  },
  {
    path: "/card/:pid",
    name: "Particular Card Page",
    desc: "Showing all information about a particular project card",
    component: SingleCardPage,
    role: "sponser",
    access: "private",
    id: 4,
  },
  {
    path: "/project/:pid",
    name: "Particular project Page smae as card page",
    desc:
      "Showing all information about a particular project in student dashboard",
    component: SingleProjectPage,
    role: "student",
    access: "private",
    id: 5,
  },
];
