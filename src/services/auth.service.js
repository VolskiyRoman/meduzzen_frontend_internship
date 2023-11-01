import axios from 'axios';
import axiosInstance from "../api/api";

const REGISTER_URL = '/auth/users/'
const LOGIN_URL = '/auth/jwt/create/'
const CURRENT_USER_URL = '/auth/users/me/'

class AuthService {
    login({email, password}) {
        return axiosInstance
            .post(LOGIN_URL, {
                email, password
            })
            .then(loginResponse => {
                if (loginResponse.data.access) {
                    localStorage.setItem('tokens', JSON.stringify(loginResponse.data));

                    return axiosInstance
                        .get(CURRENT_USER_URL)
                        .then(userInfoResponse => {
                            localStorage.setItem('user', JSON.stringify(userInfoResponse.data));
                            return userInfoResponse.data;
                        })
                        .catch(error => {
                            console.error('Unable to retrieve user information.:', error);
                        });
                }
            });
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('tokens');
    }

    register({ email, password }) {
        return axios.post(REGISTER_URL, email, password);
    }
}

export default new AuthService();