import axios from "axios";
import jwtDecode from "jwt-decode";
import LocalStorage, { TOKEN_STORAGE_KEY } from "../utility/storage";


export const BASE_URL = 'http://192.168.100.7:8090/api'

const useAxios = () => {

    const isExpired = () => {
        const token = LocalStorage.getValue(TOKEN_STORAGE_KEY, {})
        if (!token.accessToken) {
            console.log("No Access Token Present");
            return
        }
        let decoded = jwtDecode(token.accessToken)
        var seconds = (new Date(decoded.exp).getTime() - new Date().getTime()) / 1000;
        return new Date() > new Date(decoded.exp)
    }


    const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
            'content-type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        },
        timeout: 5000,
    })

    instance.interceptors.request.use(
        async (config) => {
            // console.log(" isExpired in Config :: ", isExpired());

            if (!LocalStorage.getValue(TOKEN_STORAGE_KEY, {})?.refreshToken) return config
            if (!isExpired())  {
                const token = LocalStorage.getValue(TOKEN_STORAGE_KEY, {})
                config.headers['Authorization'] = "Bearer " + token.accessToken
                // console.log("return expire config>> ", isExpired());
                return config
            } else {
                // console.log("Fetching New Acces Token");
                const token = LocalStorage.getValue(TOKEN_STORAGE_KEY, {})

                const response = await axios.get(BASE_URL + "/token/refresh", {
                    headers: { "Authorization": "Bearer " + token.refreshToken }
                });
                const { accessToken } = response.data
                const tokens = LocalStorage.getValue(TOKEN_STORAGE_KEY, {})
                tokens.accessToken = accessToken
                LocalStorage.saveValue(TOKEN_STORAGE_KEY, token)

                config.headers['Authorization'] = "Bearer " + accessToken

                return config;
            }
        }, (error) => {
            return Promise.reject(error);
        });
    /*
    instance.interceptors.request.use(async req => {

        const user = jwt_decode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return req

        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
            refresh: authTokens.refresh
        });

        localStorage.setItem('authTokens', JSON.stringify(response.data))

        setAuthTokens(response.data)
        setUser(jwt_decode(response.data.access))

        req.headers.Authorization = `Bearer ${response.data.access}`
        return req
    })
        */
    return instance
}

export { useAxios }
