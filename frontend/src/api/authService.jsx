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
          localStorage.setItem("userId", JSON.stringify(response.data.id));
          localStorage.setItem("token", JSON.stringify(response.data.token));
          // console.log("[AuthService] response.data : ", response.data);

          this.updateToken(response.data.id, response.data.token);
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  getAccessToken() {
    return authHeader();
  }

  getToken(id) {
    return axios
      .get(API_URL + "/id/token/" + id, { headers: authHeader() })
      .then(response => {
        // console.log("[authService-tokenCheck] data is : ", response.data);
        // console.log("[authService-tokenCheck] token is : ", response.data.token);
        return response.data.token;
      });
  }

  updateToken(id, token) {
    // console.log("## id ; ", id);
    // console.log("## token ; ", token);
    var jsonToken = {
      "token": token
    }
    
    return axios
      .patch(API_URL + "/id/token/" + id, jsonToken, {
        headers: authHeader(),
      })
      .then(response => {
        console.log("token DB updated");
        return response.data;
      });
  }

}
export default new AuthService();