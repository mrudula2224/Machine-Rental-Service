import API from './api';


export const getMachines = (search = "") =>
  API.get(`/machines?search=${search}`);


export const getOwnerMachines = () => API.get('/machines/owner/my');
export const addMachine = (data) => API.post('/machines', data);
export const updateMachine = (id, data) => API.put(`/machines/${id}`, data);
export const deleteMachine = (id) => API.delete(`/machines/${id}`);

