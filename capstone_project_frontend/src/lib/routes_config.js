import Home from "../Home";
import Login from "../components/auth_components/Login";
import Register from "../components/auth_components/Register";
import SingleCardPage from "../components/sponser components/pages/SingleCardPage";

export const routes = [
  {
    path: "/",
    name: "Home",
    desc: "Home route showing various dashboards",
    component: Home,
    access: "private",
    id: 1,
  },
  {
    path: "/register",
    name: "Register",
    desc: "Register user",
    component: Register,
    access: "public",
    id: 2,
  },
  {
    path: "/login",
    name: "login",
    desc: "login user",
    component: Login,
    access: "public",
    id: 3,
  },
  {
    path: "/card/:pid",
    name: "Particular Card Page",
    desc: "Showing all information about a particular project card",
    component: SingleCardPage,
    access: "private",
    id: 4,
  },
];
