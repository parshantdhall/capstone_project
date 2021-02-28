import axios from "axios";
import { useEffect, useState } from "react";
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
      setUserData((prevState) => ({ ...prevState, isLoggedIn: true }));
      // axios.get()
    } else {
      setUserData((prevState) => ({ ...prevState, isLoggedIn: false }));
    }
  }, []);

  return (
    <uContext.Provider value={{ userData, updateGlobalUserData }}>
      {children}
    </uContext.Provider>
  );
};

export default UserContextProvider;
