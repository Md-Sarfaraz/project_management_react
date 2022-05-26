import { useAxios } from "../hooks/useAxios";


const ProjectService = () => {

    const api = useAxios()

    const listAllProject = async (page, size) => {
        try {
            const res = await api.get("/project/list", { params: { p: page, s: size } });
            return res.data
        } catch (e) {
            return {}
        }

    }

    const listAllSearched = async (saerch) => {
        try {
            const res = await api.get("/project/search", { params: { q: saerch } })
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
    const addUserToProject = async (projectId, UserId, callback) => {
        return await api.post('/project/users/add', { pid: projectId, uid: UserId })
            .then((response) => {
                console.log(response.data);
                callback()
            })
            .catch((error) => {
                callback(error.response)
            })
    }

    const getAllRelatedUsers = async (pid, callback) => {
        return await api.get('/project/users/list?id=' + pid)
            .then((response) => {
                callback(response?.data)
            })
            .catch((error) => {
                console.log(error);
                callback(error.response?.data, error.response?.status)
            })
    }

    const removeRelatedUsers = async (projectId, UserId, callback) => {
        return await api.post('/project/users/remove', { pid: projectId, uid: UserId })
            .then((response) => {
                console.log(response.data);
                callback()
            })
            .catch((error) => {
                callback(error.response)
            })
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
