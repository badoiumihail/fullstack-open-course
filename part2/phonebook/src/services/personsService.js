import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

function getAll() {
    return axios.get(baseUrl);
}

function getOne(id) {
    return axios.get(`${baseUrl}/${id}`);
}

function create(resource) {
    return axios.post(baseUrl, resource);
}

function update(id, updatedResource) {
    return axios.put(`${baseUrl}/${id}`, updatedResource);
}

function deleteOne(id) {
    return axios.delete(`${baseUrl}/${id}`);
}

const moduleExports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
};
export default moduleExports;
