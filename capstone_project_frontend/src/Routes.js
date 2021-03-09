import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserContextProvider from "./components/context provider/UserContextProvider";
import RenderRoute from "./components/RenderRoute";

const Routes = () => {
  return (
    <UserContextProvider>
      <Navbar />

      {/* All route stuff */}
      <Switch>
        <RenderRoute />
        {/* 404 route */}
        <Route path="*">
          <h1>404 page not found</h1>
        </Route>
      </Switch>
    </UserContextProvider>
  );
};

export default Routes;
