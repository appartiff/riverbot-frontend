import Client from './Clients/AxiosClient';
const resource = '/api/user';

export default {
    getToken() {
        return Client.get(`${resource}/jwt`);
    },
    updateOverlordId(payload, username) {
        return Client.put(`${resource}/updateOverlordId/${username}`, payload);
    },
    deleteByOverlord(payload, username) {
        return Client.delete(`${resource}/deleteByOverlord/${username}`, payload);
    },
    deleteUser() {
        return Client.delete(`${resource}`)
    },
};