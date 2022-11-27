import http from "./httpService";
import conf from "../config.json"

const apiEndPoint = conf.apiUrl + "/prosno/sets/";

export function postQuestionSet(setDetails) {
    return http.post(apiEndPoint, setDetails);
}

export function getQuestionsSets(){
    return http.get(apiEndPoint)
}

export function getQuestionSetByAuthor(authorId){
    return http.get(apiEndPoint + `?author=${authorId}`)
}

export function deleteSet(setId){
    return http.delete(apiEndPoint + setId)
}