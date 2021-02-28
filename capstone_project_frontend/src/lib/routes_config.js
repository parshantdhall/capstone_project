import Home from "../Home";
import Login from "../components/auth_components/Login";
import Register from "../components/auth_components/Register";

export const routes = [
  {
    path: "/",
    name: "Home",
    desc: "Home route",
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
];
