import axios from "axios";
console.log(import.meta.env.VITE_DATA);

const request = axios.create({
  baseURL: import.meta.env.VITE_DATA,
});

export default request;
