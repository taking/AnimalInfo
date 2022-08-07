import axios from "axios";
import authHeader from "../api/authHeader";
import { BACKEND_API } from "../config";


const API_URL = BACKEND_API + "/api/v1/users";


class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log("[AuthService] response.data : ", response.data);
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  getAccessToken() {
    return authHeader();
  }
}
export default new AuthService();