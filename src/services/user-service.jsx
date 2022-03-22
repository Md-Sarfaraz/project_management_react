import { api } from "./database";



const listAllUser = async (page, size) => {
    try {
        const res = await api.get("/user/list", { params: { page: page, size: size } });
       // const res = await api.get("/user/search", { params: { name: 'sh' } }).catch((e)=>{
              //  console.log(" ",e.message);
        console.log(res.data)
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

    const res = await api.post('/user/save', data);

    return res.data

}

const deleteUser = () => {

}

export { listAllUser, listAllSearched, getOneUserWithInfo, updateUser, deleteUser }