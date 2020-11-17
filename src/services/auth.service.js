import axios from "axios";

import url from "../commons";

const API_URL = url + "/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem(
            "userToken",
            JSON.stringify(response.data.token)
          );
        }

        return { token: response.data.token, message: response.data.message };
      });
  }

  logout() {
    localStorage.removeItem("userToken");
  }

  register(name, email, password, mobile, office, birthdate, roleId) {
    return axios
      .post(API_URL + "signup", {
        name,
        email,
        password,
        mobile,
        office,
        birthdate,
        roleId,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem(
            "userToken",
            JSON.stringify(response.data.token)
          );
        }

        return { token: response.data.token, message: response.data.message };
      });
  }

  getCurrentUserToken() {
    return JSON.parse(localStorage.getItem("userToken"));
  }

  validateCurrentUserToken() {
    return JSON.parse(localStorage.getItem("userToken")) ? true : false;
  }
}

export default new AuthService();
