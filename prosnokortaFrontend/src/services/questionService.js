import http from "./httpService";
import conf from "../config.json"

const apiEndPoint = conf.apiUrl + "/prosno/questions/";

export function getQuestions() {
    return http.get(apiEndPoint);    
}

export function postQuestion(questionDetails) {
    return http.post(apiEndPoint, questionDetails)
}