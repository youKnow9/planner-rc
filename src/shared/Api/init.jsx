import axios from 'axios';


const api = axios.create({
    baseURL: 'https://planner.rdclr.ru/api/',
});
  
export default api;