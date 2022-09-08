import axios from "axios";
import authHeader from "../api/authHeader";
import { BACKEND_API } from "../config";

const API_URL = BACKEND_API + "/api/v1/data";

class DataService {
  list() {
    return axios.get(API_URL, { headers: authHeader() }).then(response => {
      console.log("[dataService] list : ", response.data);
      return response.data;
    });
  }

  listId(userId, date) {
    return axios.get(API_URL + "/id/" + userId + "/" + date, { headers: authHeader() }).then(response => {
      console.log("[dataService] listId : ", response.data);
      return response.data;
    });
  }

  checkPrice(userId, date) {
    return axios
    .get(API_URL + "/price/" + userId + "/" + date, { headers: authHeader() })
    .then(response => {
      console.log("[dataService] checkPrice : ", response.data);
      return response.data;
    });
  }


  create(data) {
    return axios
      .post(API_URL, data, {
        headers: authHeader(),
        mimeType: "multipart/form-data",
      })
      .then(response => {
        console.log("[dataService-create] response : ", response.data);
        return response.data;
      });
  }

  delete(dataId) {
    return axios
      .delete(API_URL + "/id/" + dataId, {
        headers: authHeader(),
      })
      .then(response => {
        console.log("[dataService-delete] response : ", response);
        return response;
      });
  }

  update(dataId, data) {
    return axios
      .patch(API_URL + "/id/" + dataId, data, {
        headers: authHeader(),
      })
      .then(response => {
        console.log("[dataService-update] response : ", response);
        return response;
      });
  }
  
  getDataId(){
    return axios
    .get(API_URL + "/dataId/", {
      headers: authHeader(),
    })
    .then(response => {
      console.log("[dataService-delete] response : ", response.data);
      return response.data;
    });
  }
}
export default new DataService();
