import axios from 'axios';

// Базовый URL для запросов к серверу
const API_URL = 'ajaxUrl';

// Функция для получения данных (GET-запрос)
export const fetchData = (endpoint) => {
    return axios.get(`${API_URL}/${endpoint}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
            throw error;
        });
}

// Функция для создания новой записи (POST-запрос)
export const createData = (endpoint, payload) => {
    return axios.post(`${API_URL}/${endpoint}`, payload)
        .then(response => response.data)
        .catch(error => {
            console.error('Ошибка при создании данных:', error);
            throw error;
        });
}

// Функция для обновления существующей записи (PUT-запрос)
export const updateData = (endpoint, id, payload) => {
    return axios.put(`${API_URL}/${endpoint}/${id}`, payload)
        .then(response => response.data)
        .catch(error => {
            console.error('Ошибка при обновлении данных:', error);
            throw error;
        });
}

// Функция для удаления записи (DELETE-запрос)
export const deleteData = (endpoint, id) => {
    return axios.delete(`${API_URL}/${endpoint}/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Ошибка при удалении данных:', error);
            throw error;
        });
}