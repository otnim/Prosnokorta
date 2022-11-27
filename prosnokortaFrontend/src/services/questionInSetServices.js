
// http://127.0.0.1:8000/prosno/questioninexam/?set=5

import http from "./httpService";
import conf from "../config.json"

const apiEndPoint = conf.apiUrl + "/prosno/questioninexamreadonly/?set=";

export function getQuestionsFromSet(setId) {
    return http.get(apiEndPoint + setId);    
}

