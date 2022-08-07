import axios from "axios";
import authHeader from "../api/authHeader";


const API_URL = "http://210.207.104.188:8888/api/v1/data";

class DataService {
  list() {
    return axios
      .get(API_URL, { headers: authHeader() })
      .then(response => {
        console.log("[dataService] list : ", response.data);
        return response.data;
      });
  }

  create(data) {
    console.log("data list : ", data);
    return axios
      .post(API_URL, data, {
        headers: authHeader(),
        'Content-Type': 'multipart/form-data'
      })
      .then(response => {
          console.log("[dataService-create] response : ", response);
        return response;
      });
  }

  delete(dataId) {
    return axios
      .delete(API_URL + '/id/' + dataId, {
        headers: authHeader()
      })
      .then(response => {
        console.log("[dataService-delete] response : ", response);
        return response;
      });
  }


}
export default new DataService();