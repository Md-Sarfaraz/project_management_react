// import { api } from "./api";

// import LocalStorage, { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../utility/storage";


// const login = async (username, password, callback) => {
//     return await api.post("/login", { username: username, password: password })
//         .then((response) => {
//             if (response.data) {
//                 LocalStorage.saveValue(TOKEN_STORAGE_KEY, response.data.token)
//                 LocalStorage.saveValue(USER_STORAGE_KEY, response.data.user)
//                 callback();
//             }
//         }).catch((err) => {
//             if (err?.response) {
//                 callback(err.response.data)
//             }
//         })
// }

// const logout = () => {
//     LocalStorage.removeValue(TOKEN_STORAGE_KEY);
//     LocalStorage.removeValue(USER_STORAGE_KEY);
    
// }
// const signup = async () => { }







// const Auth = {
//     signup,
//     login,
//     logout,
//    }

// export default Auth;


