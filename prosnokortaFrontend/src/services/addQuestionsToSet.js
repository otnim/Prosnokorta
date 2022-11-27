import http from "./httpService";
import conf from "../config.json"

const apiEndPoint = conf.apiUrl + "/prosno/questioninexam/";
// http://127.0.0.1:8000/prosno/questioninexam/

// export function getQuestions() {
//     console.log(apiEndPoint)
//     return http.get(apiEndPoint);    
// }

export function addQuestionToSet(details) {
    return http.post(apiEndPoint, details)

}

export function deleteQuestionFromSet(questionSetCombinationId) {
    return http.delete(apiEndPoint + questionSetCombinationId);
}