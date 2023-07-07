import axios from 'axios';
// require('dotenv').config();
import {encodedAuthorization} from './Constant.js'

const { REACT_APP_API_URL } = process.env;

const getToken = () => {
    return localStorage.getItem("token");
}

// For POST requests
axios.interceptors.response.use(
    (res) => {
        if (res.status === 200 || res.status=== 201) {
            return res;
        }
        return Promise.reject("unkown error");
    },
    (err) => {
        if (err.response.status === 401) {
            // TODO: add code to get new token and re run request 
        }
        return Promise.reject(err);
    }
);

const MakeRequest = {
    postAuth(url, data) {
        
        return new Promise((resolve, reject) => {

            // resolve({})
            axios({
                method: 'post',
                url: `${REACT_APP_API_URL}${url}`,
                data: data,
                
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Basic ${encodedAuthorization}`,
                    
                }
            })
                .then((response) => {
                    
                    resolve(response);
                })
                .catch((error) => {
                    reject({ data: { description: error.toString() } });
                });
        });
    },
    get(url) {
        return new Promise((resolve, reject) => {
           
            
            axios({
                method: 'get',
                url: `${REACT_APP_API_URL}${url}`,
                withCredentials: false,
                
                headers: {
                    'content-type': 'application/json',
                    
                    'Authorization':`Basic ${encodedAuthorization}`
                    
                }
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getExternal(url) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: `${url}`,
                withCredentials: false,
                headers: {
                    'content-type': 'application/json',
                    'accept-language': 'en-US,en;q=0.9,*/*'
                }
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getAuth(url) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: `${REACT_APP_API_URL}${url}`,
                withCredentials: false,
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                    'accept-language': 'en-US,en;q=0.9'
                }
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
};

export default MakeRequest