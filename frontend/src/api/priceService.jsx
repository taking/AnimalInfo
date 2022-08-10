import axios from "axios";
import authHeader from "./authHeader";
import { BACKEND_API } from "../config";

const API_URL = BACKEND_API + "/api/v1/price";

class PriceService {
  history() {
    return axios
      .get(API_URL, { headers: authHeader() })
      .then(response => {
        console.log("[priceService] Price history is : ", response.data);
        return response.data;
      });
  }

  last() {
    return axios
      .get(API_URL + '/last', { headers: authHeader() })
      .then(response => {
        console.log("[priceService] last Price is : ", response.data);
        return response.data;
      });
  }

  update(price) {
    return axios
      .post(API_URL + "/" + price, "",
        {
        headers: authHeader()
        }
      )
      .then(response => {
          console.log("[userService] update price : ", response);
        return response;
      });
  }
}
export default new PriceService();
