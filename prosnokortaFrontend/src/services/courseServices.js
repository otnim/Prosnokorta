import http from "./httpService";
import conf from "../config.json"

const apiEndPoint = conf.apiUrl + "/prosno/course/?class_id=";

export function getCourses(classId) {
    return http.get(apiEndPoint + classId);   
}
