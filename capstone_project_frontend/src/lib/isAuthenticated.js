const isAuthenticated = () => {
  const token = window && window.sessionStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};

export default isAuthenticated;
