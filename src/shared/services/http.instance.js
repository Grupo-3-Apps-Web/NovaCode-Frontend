import axios from "axios";
import {authenticationInterceptor} from "../../iam/services/authentication.interceptor.js";

const httpInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});


httpInstance.defaults.headers.common['Content-Type'] = 'application/json';
httpInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Add a request interceptor
httpInstance.interceptors.request.use(authenticationInterceptor);

export default httpInstance;