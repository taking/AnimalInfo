import axios from "axios";


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
          console.log("[#1] res data is : ", response.data);
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(name, email, password, confirm_password, contact, refer) {
    return axios.post(API_URL, {
      name,
      email,
      password,
      confirm_password,
      contact,
      refer
    })
    .then(response => {
      console.log("[#1] res data is : ", response);
      return response;
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();