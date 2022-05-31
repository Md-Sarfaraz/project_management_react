import { useAxios } from "../hooks/useAxios";


const UserService = () => {

    const api = useAxios()


    async function listAllUser(page, size) {
        return await api.get("/user/list", { params: { page: page, size: size } })
            .then((response) => {
                return response.data
            }).catch((er) => {
                console.log(er);
                return er.response.data
            })
    }

    const listAllSearched = async (saerch) => {
        try {
            console.log("Called");
            const res = await api.get("/user/search", { params: { name: saerch } })
            console.log(res);

            return res.data
        } catch (error) {
            console.log(error);
            return {}
        }

    }


    const getOneUserWithInfo = async (id) => {
        const res = await api.get(`/user/view/info/${id}`);
        return res.data
    }

    const saveUser = async (data, callback) => {
        console.log("Data : ", data);
        return await api.post('/user/save', data)
            .then((res) => {
                console.log(res);
                
                callback()
            }).catch((er) => {
                console.log(er);
                callback(er.response)
            })
    }
    const updateUser = async (data, callback) => {
        return await api.post('/user/update', data)
            .then(() => {
                callback()
            }).catch((er) => {
                console.log(er);
                callback(er.response)
            })
    }


    const updatePassword = async (data) => {
        const res = await api.post('/user/password', data);
        return res.data
    }

    const deleteUser = async (id) => {
        const res = await api.delete('/user/delete?uid=' + id)
        return res.data

    }
    const updateRoles = async (userId, roles) => {
        return await api.post('/user/roles/update', {
            id: userId, roles: roles
        })
            .then((response) => {
                return response.data
            }).catch((er) => {
                console.log(er);
                return er.response.data
            })

    }

    return {
        listAllUser,
        listAllSearched,
        getOneUserWithInfo,
        updateUser,
        deleteUser,
        updatePassword,
        updateRoles,
        saveUser,
    }
}


export default UserService;
