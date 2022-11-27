import http from "./httpService";
import conf from "../config.json"

const apiEndPoint = conf.apiUrl + "/prosno/class/";

export function getClass() {
    return http.get(apiEndPoint);    
}
