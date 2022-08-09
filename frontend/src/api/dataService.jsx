import axios from "axios";
import authHeader from "../api/authHeader";
import { BACKEND_API } from "../config";

const API_URL = BACKEND_API + "/api/v1/data";

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
      mimeType: 'multipart/form-data'
      })
      .then(response => {
          console.log("[dataService-create] response : ", response.data);
        return response.data;
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