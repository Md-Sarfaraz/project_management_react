import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../hooks/useAxios";
import LocalStorage, { TOKEN_STORAGE_KEY, USER_INFO_KEY, USER_STORAGE_KEY } from "../utility/storage";

const AuthContext = createContext();

const AuthProvider = (props) => {

    const [currentUser, setCurrentUser] = useState({})
    const [info, setInfo] = useState({})
    const [token, setToken] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const test = {
        "relatedProjects": [],
        "TotalRelatedProject": 0,
        "totalProject": 185,
        "totalRelatedTicket": 1,
        "totalUsers": 185,
        "relatedTicket": [
            {
                "created": "2022-04-08",
                "project": {
                    "name": "Domainer",
                    "id": 27
                },
                "submitter": {
                    "name": "Ramesh Kumar",
                    "id": 7
                },
                "assignedUser": {
                    "name": "Davon Longrigg",
                    "id": 482
                },
                "status": "ACTIVE",
                "name": "performance issue",
                "priority": "HIGH",
                "id": 13,
                "type": null,
                "updated": "2022-04-08",
                "detail": "server not worlong lag",
                "lastDate": "2022-06-25"
            }
        ],
        "topLevelRole": "ROLE_ADMIN",
        "totalTicket": 5,
        "user": {
            "id": 7,
            "name": "Ramesh Kumar",
            "email": "ramesh@gmail.com",
            "username": "ramesh",
            "dob": "2022-01-12",
            "mobile": "7946857495",
            "address": "asansol railpar",
            "active": false,
            "roles": [
                "ROLE_MANAGER",
                "ROLE_ADMIN",
                "ROLE_PUBLIC"
            ]
        },
        "token": {
            "refreshToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYW1lc2giLCJpc3MiOiIvYXBpL2xvZ2luIiwiZXhwIjoxNjYwODUwNTY0fQ.TIn3eLNkocUwemKL83csGH5yiP2qDlpY7XZNsuLn6f8",
            "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYW1lc2giLCJyb2xlcyI6WyJST0xFX01BTkFHRVIiLCJST0xFX0FETUlOIiwiUk9MRV9QVUJMSUMiXSwiaXNzIjoiL2FwaS9sb2dpbiIsIm5hbWUiOiJSYW1lc2ggS3VtYXIiLCJpZCI6NywiZXhwIjoxNjUzMDg1MzY0LCJlbWFpbCI6InJhbWVzaEBnbWFpbC5jb20ifQ.Y-o_SSXIujYPs4YZTkgFmlQZtE7HulABS5e8HbFsnoY"
        }
    }

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
                    console.log(response.data);
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

    const logoutUser = () => {
        //Auth.logout()
        LocalStorage.removeValue(TOKEN_STORAGE_KEY);
        LocalStorage.removeValue(USER_STORAGE_KEY);
        LocalStorage.removeValue(USER_INFO_KEY);
        setCurrentUser({})
        setInfo({})
        setToken({})
        setIsLoggedIn(false);

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
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext };
export default AuthProvider;
