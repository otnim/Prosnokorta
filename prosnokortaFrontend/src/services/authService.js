import http from './httpService';
import { apiUrl, secretKey } from '../config.json';
import jwt from "jsonwebtoken";

const apiEndpoint = apiUrl + "/auth/";
// login and get auth token--// http://127.0.0.1:8000/auth/jwt/create/
// get my info using header http://127.0.0.1:8000/auth/users/me/
// post new user http://127.0.0.1:8000/auth/users/

const tokenKey = "JWT"

export async function getNewToken(username, password) {

    try {
        const { data } = await http.post(apiEndpoint + 'jwt/create/', { username, password });
        const newToken = data.access
        localStorage.setItem(tokenKey, data.access)

        if (newToken) {
            try {
                const { data } = await http.get(apiEndpoint + 'users/me/', {
                    headers: {
                        'Authorization': `JWT ${newToken}`
                    }
                });

                const user = {
                    id: data.id,
                    userType: data.user_type,
                    name: data.username
                }
                const userKey = jwt.sign(user, secretKey);
                localStorage.setItem('user', userKey)
            } catch (ex) {
                console.log(ex)

            }
        }
        else {
            alert("Your Session Expired, Please Login")
        }

    } catch (ex) {
        console.log(ex)
        alert('Please Give valid username and password')
        return
    }

}

export function registerUser(user) {
    
    return http.post(apiEndpoint + 'users/', user)
}

export function getCurrentUser() {
    const userToken = localStorage.getItem('user');
    try {
        if (userToken) {
            return jwt.verify(userToken, secretKey);
        }

    }
    catch (ex) {
        alert('Session Expired. Please Logout and Login Again')
        return null;
    }
}

export function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('JWT');
}

const auth = {
    getNewToken,
    getCurrentUser,
    logout,

}

export default auth;