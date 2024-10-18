import axios from 'axios';

// Базовый URL для запросов к серверу
const API_URL = 'someUrl';

// Функция для получения данных (GET-запрос)
// В ответе ждём json с данными приложения
export const fetchData = (endpoint) => {
    return axios.get(`${API_URL}/${endpoint}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
            throw error;
        });
}

// Функция для создания новой записи (POST-запрос)
// Отправляем ID таблицы и json с данными для новой записи
// В ответе ждём ID новой записи
export const createData = (endpoint, payload) => {
    return axios.post(`${API_URL}/${endpoint}`, payload)
        .then(response => response.data)
        .catch(error => {
            console.error('Ошибка при создании данных:', error);
            throw error;
        });
}

// Функция для обновления существующей записи (PUT-запрос)
// Отправляем ID записи и json с данными обновлённой записи
// В ответе ждём ОК
export const updateData = (endpoint, id, payload) => {
    return axios.put(`${API_URL}/${endpoint}/${id}`, payload)
        .then(response => response.data)
        .catch(error => {
            console.error('Ошибка при обновлении данных:', error);
            throw error;
        });
}

// Функция для удаления записи (DELETE-запрос)
// Отправляем ID записи
// В ответе ждём ОК
export const deleteData = (endpoint, id) => {
    return axios.delete(`${API_URL}/${endpoint}/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Ошибка при удалении данных:', error);
            throw error;
        });
}