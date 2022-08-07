import axios from "axios";
import authHeader from "../api/authHeader";


const API_URL = "http://210.207.104.188:8888/api/v1/users";

class UserService {
  userList() {
    return axios
      .get(API_URL, { headers: authHeader() })
      .then(response => {
        console.log("[#1] user lists is : ", response.data);
        return response.data;
      });
  }

  register(name, email, password, confirm_password, contact, refer) {
    return axios
      .post(API_URL, 
        {
        name,
        email,
        password,
        confirm_password,
        contact,
        refer
        },
        {
        headers: authHeader()
        }
      )
      .then(response => {
          console.log("[userService] response : ", response);
        return response;
      });
  }

  enabled(userId) {
    return axios
      .patch(API_URL + '/id/status/' + userId, "", {
        headers: authHeader()
      })
      .then(response => {
        console.log("[userService-enabled] response : ", response);
        return response;
      });
  }

  delete(userId) {
    return axios
      .delete(API_URL + '/id/' + userId, {
        Headers: authHeader()
      })
      .then(response => {
        console.log("[userService-delete] response : ", response);
        return response;
      });
  }

}
export default new UserService();