import { useAxios } from "../hooks/useAxios";


const ProjectService = () => {

    const api = useAxios()

    const listAllProject = async (page, size) => {
        try {
            const res = await api.get("/project/list", { params: { page: page, size: size } });
            return res.data
        } catch (e) {
            return {}
        }

    }

    const listAllSearched = async (saerch) => {
        try {
            const res = await api.get("/project/search", { params: { name: saerch } })
            return res.data
        } catch (error) {
            console.log(error);
            return {}
        }

    }

    // using for add new and update existing projects
    const saveProject = async (data, callback) => {
        return await api.post('/project/save', data)
            .then((response) => {
                console.log(response.data);
                callback()
            })
            .catch((error) => {
                callback(error.response)
            })
    }


    const getOneProjectWithInfo = async (id) => {
        const res = await api.get(`/project/view/${id}`);
        return res.data

    }

    const deleteProject = async (id) => {
        const res = await api.delete('/project/delete?id=' + id)
        return res.data
    }
    const addUserToProject = async (projectId, UserId) => {
        let data = { pid: projectId, uid: UserId }
        const res = await api.post('/project/users/add', data);
        return res.data
    }

    const getAllRelatedUsers = async (pid) => {
        const res = await api.get('/project/users?pid=' + pid);
        return res.data
    }

    const removeRelatedUsers = async (projectId, UserId) => {
        let data = { pid: projectId, uid: UserId }
        const res = await api.post('/project/users/delete', data);
        return res.data
    }

    return {
        listAllProject,
        listAllSearched,
        saveProject,
        getOneProjectWithInfo,
        deleteProject,
        addUserToProject,
        getAllRelatedUsers,
        removeRelatedUsers
    }
}

export default ProjectService;