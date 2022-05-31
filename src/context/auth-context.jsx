import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../hooks/useAxios";
import UserService from "../services/user-service";
import LocalStorage, { TOKEN_STORAGE_KEY, USER_INFO_KEY, USER_STORAGE_KEY } from "../utility/storage";

const AuthContext = createContext();

const AuthProvider = (props) => {
    const userService = UserService();
    const [currentUser, setCurrentUser] = useState({})
    const [info, setInfo] = useState({})
    const [token, setToken] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const saveInfo = (data) => {
        const related = {
            relatedProjects: data.relatedProjects,
            relatedTickets: data.relatedTicket,
            TotalRelatedProjects: data.TotalRelatedProject,
            totalRelatedTickets: data.totalRelatedTicket,
            totalProjects: data.totalProject,
            totalTickets: data.totalTicket,
            totalUsers: data.totalUsers,
            topLevelRole: data.topLevelRole,
        }
        LocalStorage.saveValue(USER_INFO_KEY, related)
        // setInfo({ ...info, [related.key]: related.value });
        setInfo(related)
    }



    const loginUser = async (username, password, callback) => {
        return await axios.post(BASE_URL + "/login", { username: username, password: password })
            .then((response) => {
                if (response?.data) {
                    LocalStorage.saveValue(TOKEN_STORAGE_KEY, response.data.token)
                    LocalStorage.saveValue(USER_STORAGE_KEY, response.data.user)
                    saveInfo(response.data)
                    setCurrentUser(response.data.user)
                    setToken(response.data.token)
                    setIsLoggedIn(response.data.token ? true : false)
                    callback();
                }
            }).catch((err) => {
                if (err?.response) {
                    setCurrentUser({})
                    setToken({})
                    callback(err.response)
                }
            })
    }

    const logoutUser = (callback) => {
        LocalStorage.removeValue(TOKEN_STORAGE_KEY);
        LocalStorage.removeValue(USER_STORAGE_KEY);
        LocalStorage.removeValue(USER_INFO_KEY);
        setCurrentUser({})
        setInfo({})
        setToken({})
        setIsLoggedIn(false);
        if (callback instanceof Function) callback();

    }

    const signUpUser = (data, callback) => {
        console.log("singup user");
        
        userService.saveUser(data, callback)
    }

    const initialSetup = async () => {
        const details = await LocalStorage.getValue(USER_INFO_KEY, {});
        setInfo(details);

        const user = await LocalStorage.getValue(USER_STORAGE_KEY, {});
        setCurrentUser(user)
        const token = await LocalStorage.getValue(TOKEN_STORAGE_KEY, {})
        setToken(token);
        setIsLoggedIn(token?.accessToken ? true : false)

    }


    useEffect(() => {
        initialSetup()
    }, [])


    return (
        <AuthContext.Provider value={{
            currentUser,
            info,
            setCurrentUser,
            token, setToken,
            isLoggedIn,
            loginUser,
            logoutUser,
            signUpUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext };
export default AuthProvider;
