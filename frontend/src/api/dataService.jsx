import axios from "axios";
import authHeader from "./authHeader";


const API_URL = "http://192.168.160.230:8888/api/v1/";

class DataService {
  userList() {
    return axios
      .get(API_URL + 'users', { headers: authHeader() })
      .then(response => {
        console.log("[#1] user lists is : ", response.data);
        return response.data;
      });
  }

  register(name, email, password, confirm_password, contact, refer) {
    return axios
      .post(API_URL + 'users', {
        name,
        email,
        password,
        confirm_password,
        contact,
        refer
      })
      .then(response => {
          console.log("[userService] response : ", response);
          console.log("[userService] response.data : ", response.data);
        return response;
      });
  }

}
export default new UserService();