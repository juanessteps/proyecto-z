import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// Attach token from localStorage automatically
api.interceptors.request.use((config) => {
    const stored = localStorage.getItem('sh2_auth');
    if (stored) {
        try {
            const { token } = JSON.parse(stored);
            if (token) config.headers.Authorization = `Bearer ${token}`;
        } catch (_) { }
    }
    return config;
});

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');

// Characters
export const getCharacters = () => api.get('/characters');
export const getCharacter = (id) => api.get(`/characters/${id}`);
export const createCharacter = (data) => api.post('/characters', data);
export const updateCharacter = (id, d) => api.put(`/characters/${id}`, d);
export const deleteCharacter = (id) => api.delete(`/characters/${id}`);

// Lore
export const getLoreEntries = () => api.get('/lore');
export const getLoreEntry = (id) => api.get(`/lore/${id}`);
export const createLore = (data) => api.post('/lore', data);
export const updateLore = (id, d) => api.put(`/lore/${id}`, d);
export const deleteLore = (id) => api.delete(`/lore/${id}`);

// Items
export const getItems = () => api.get('/items');
export const getItem = (id) => api.get(`/items/${id}`);
export const createItem = (data) => api.post('/items', data);
export const updateItem = (id, d) => api.put(`/items/${id}`, d);
export const deleteItem = (id) => api.delete(`/items/${id}`);

// Tips
export const getTips = () => api.get('/tips');
export const getTip = (id) => api.get(`/tips/${id}`);
export const createTip = (data) => api.post('/tips', data);
export const updateTip = (id, d) => api.put(`/tips/${id}`, d);
export const deleteTip = (id) => api.delete(`/tips/${id}`);

// Comments
export const getComments = (entity, entityId) => api.get('/comments', { params: { entity, entityId } });
export const createComment = (data) => api.post('/comments', data);
export const deleteComment = (id) => api.delete(`/comments/${id}`);

export default api;
