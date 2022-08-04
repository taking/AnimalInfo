import axios from "axios";
import authHeader from "../api/authHeader";


const API_URL = "http://192.168.160.230:8888/api/v1/users";


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
    return JSON.parse(localStorage.getItem('user'));;
  }
  getAccessToken() {
    return authHeader();
  }
}
export default new AuthService();