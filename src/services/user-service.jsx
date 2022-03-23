import { api } from "./database";



const listAllUser = async (page, size) => {
    try {
        const res = await api.get("/user/list", { params: { page: page, size: size } });
        return res.data
    } catch (e) {
        return {}
    }
}

const listAllSearched = async (saerch) => {
    try {
        const res = await api.get("/user/search", { params: { name: saerch } })
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

const updateUser = async (data) => {

    const res = await api.post('/user/update', data);

    return res.data

}

const deleteUser = async (id) => {
    const res = await api.delete('/user/delete?uid='+id)
    return res.data

}

export { listAllUser, listAllSearched, getOneUserWithInfo, updateUser, deleteUser }