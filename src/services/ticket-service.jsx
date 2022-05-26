import { useAxios } from "../hooks/useAxios";

const TicketService = () => {

    const api = useAxios()


    const getOne = async (ticketId, callback) => {
        return await api.get("/ticket/" + ticketId)
            .then((response) => {
                callback(response.data)
            }).catch((er) => {
                console.log(er);
                callback(er.response?.data, er.response)
            })

    }

    const listAllByProject = async (project_id, callback) => {
        return await api.get("/ticket/list", { params: { project: project_id } })
            .then((response) => {
                callback(response.data)
            }).catch((er) => {
                console.error(er);
                callback(er.response?.data, er.response)
            })

    }


    const listAll = async (page, size, callback) => {
        return await api.get("/ticket/list", { params: { page: page, size: size } })
            .then((response) => {
                callback(response.data)
            }).catch((er) => {
                console.error(er);
                callback(er.response.data, er.response.status)
            })

    }
    const listAllSearched = async (project_id, callback) => {
        return await api.get("/ticket/list/" + project_id)
            .then((response) => {

                return response.data
            }).catch((er) => {
                console.log(er);
                return er.response.data
            })

    }

    const saveTicket = async (data, callback) => {
        return await api.post('/ticket/save', data)
            .then((response) => {
                if (response.status === 200) {
                    callback()
                }
            })
            .catch((error) => {
                callback(error.response)
            })
    }

    const deleteTicket = async (id, callback) => {
        return await api.delete('/ticket/delete?id=' + id)
            .then((response) => {
                if (response.status === 200) {
                    callback()
                }
            })
            .catch((error) => {
                callback(error.response)
            })
    }

    const assignUser = async (ticketId, userId, callback) => {
        return await api.post('/ticket/user/assign', { ticketId, userId })
            .then((response) => {
                if (response.status === 200) {
                    callback()
                }
            })
            .catch((error) => {
                callback(error.response)
            })
    }

    return {
        getOne,
        listAllByProject,
        listAll,
        listAllSearched,
        saveTicket,
        deleteTicket,
        assignUser,
    }
}

export default TicketService;