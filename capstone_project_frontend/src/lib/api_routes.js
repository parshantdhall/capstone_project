export const backEndUrl = "https://main-capston-bshqj0xrqwxnrxjn-gtw.qovery.io";
// export const backEndUrl = "http://localhost:1337";

const requestHeader = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      window &&
      window.sessionStorage.getItem("token") !== undefined &&
      window.sessionStorage.getItem("token") !== null &&
      window.sessionStorage.getItem("token")
    }`,
  },
};
export const api_register = {
  url: `${backEndUrl}/auth/local/register`,
  method: "POST",
  requestHeader,
};

export const api_login = {
  url: `${backEndUrl}/auth/local`,
  method: "POST",
  requestHeader,
};

export const file_upload = {
  url: `${backEndUrl}/upload`,
  method: "POST",
  requestHeader,
};

export const create_project_form = {
  url: `${backEndUrl}/project-forms`,
  method: "POST",
  requestHeader,
};

export const get_project_form = {
  url: `${backEndUrl}/project-forms`,
  method: "GET",
  requestHeader,
};

export const get_student_group = {
  url: `${backEndUrl}/student-groups`,
  method: "GET",
  requestHeader,
};

export const get_current_student = {
  url: `${backEndUrl}/users/me`,
  method: "GET",
  requestHeader,
};

export const user_route = {
  url: `${backEndUrl}/users`,
  requestHeader,
};
