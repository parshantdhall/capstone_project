// import axios from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { get_current_student } from "../../lib/api_routes";
import isAuthenticated from "../../lib/isAuthenticated";
import { userContext } from "./Context";

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const uContext = userContext;
  const updateGlobalUserData = (valObj) => {
    setUserData(valObj);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      axios
        .get(get_current_student.url, get_current_student.requestHeader)
        .then((res) => {
          const { data } = res;
          if (res.status === 200 && res.data) {
            setUserData(() => ({
              ...data,
              isLoggedIn: true,
            }));
          }
        })
        .catch((err) => console.dir(err.response));
    } else {
      setUserData(() => ({ isLoggedIn: false }));
    }
  }, []);
  return (
    <uContext.Provider value={{ userData, updateGlobalUserData }}>
      {children}
    </uContext.Provider>
  );
};

export default UserContextProvider;
