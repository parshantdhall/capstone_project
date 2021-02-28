import { Redirect, Route } from "react-router-dom";
import isAuthenticated from "../lib/isAuthenticated";
import { routes } from "../lib/routes_config";

const RenderRoute = () => {
  return routes.map((route) => (
    <Route
      key={route.id}
      exact
      path={route.path}
      render={(props) => {
        // This will check if the routes are private and the user is authenticate or not
        if (route.access === "private" && !isAuthenticated()) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
        return <route.component {...props} />;
      }}
    />
  ));
};

export default RenderRoute;
