import axios from 'axios';
import axiosInstance from "../../api/api";

const REGISTER_URL = 'http://localhost:8000/auth/users/';
const LOGIN_URL = 'http://localhost:8000/auth/jwt/create/'
const CURRENT_USER_URL = 'http://localhost:8000/auth/users/me'

class AuthService {
    login({email, password}) {
        return axiosInstance
            .post(LOGIN_URL, {
                email: email,
                password: password
            })
            .then(loginResponse => {
                if (loginResponse.data.access) {
                    localStorage.setItem('user', JSON.stringify(loginResponse.data));
                    const userTokens = {
                        access: loginResponse.data.access,
                        refresh: loginResponse.data.refresh
                    };

                    return axiosInstance
                        .get(CURRENT_USER_URL)
                        .then(userInfoResponse => {
                            const userData = {...userTokens, ...userInfoResponse.data}
                            localStorage.setItem('user', JSON.stringify(userData));
                            return userData;
                        })
                        .catch(error => {
                            console.error('Unable to retrieve user information.:', error);
                        });
                }
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(REGISTER_URL, {
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();