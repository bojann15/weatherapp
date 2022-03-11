import axios from 'axios';

const API = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org',
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "Content-type": "application/json",
    },
    params: {
        appid: '2efb1899d11616ed3482ba4baac629df',
    }
});

export default API;