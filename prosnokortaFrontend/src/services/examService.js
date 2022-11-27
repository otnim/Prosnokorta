import http from "./httpService";
import conf from "../config.json"

const apiEndPoint = conf.apiUrl + "/prosno/exams/";


export function postExam(examDetails) {
    return http.post(apiEndPoint, examDetails);
}

export function getExamsByAuthor(authorId) {
    return http.get(apiEndPoint + `?author=${authorId}`);
}

export function getExamsByStudent(studentId) {
    return http.get(apiEndPoint + `?student=${studentId}`);

}

export function updateExamsById(examId, examDetails) {
    return http.put(apiEndPoint + `${examId}/`, examDetails)

}

export function getExamById(examId) {
    return http.get(apiEndPoint + examId)
}