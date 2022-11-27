import http from "./httpService";
import conf from "../config.json"

const apiEndPoint = conf.apiUrl + "/prosno/chapters/";

export function getChapters(courseId) {
    return http.get(apiEndPoint + `?course=${courseId}`);   
}
