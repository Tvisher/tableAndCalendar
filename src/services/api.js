import axios from 'axios';
import qs from 'qs';
// Базовый URL для запросов к серверу
const API_URL = '/ajax/';

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
    return axios.post(`${API_URL}/${endpoint}`, qs.stringify(payload))
        .then(response => response.data)
        .catch(error => {
            console.error('Ошибка при создании данных:', error);
            throw error;
        });
}

// Функция для обновления существующей записи (PUT-запрос)
// Отправляем ID записи и json с данными обновлённой записи
// В ответе ждём ОК
export const updateData = (endpoint, payload) => {
    return axios.post(`${API_URL}/${endpoint}`, qs.stringify(payload))
        .then(response => response.data)
        .catch(error => {
            console.error('Ошибка при создании данных:', error);
            throw error;
        });
}

// Функция для удаления записи (DELETE-запрос)
// Отправляем ID записи
// В ответе ждём ОК
export const deleteData = (endpoint, payload) => {
    return axios.post(`${API_URL}/${endpoint}`, qs.stringify(payload))
        .then(response => response.data)
        .catch(error => {
            console.error('Ошибка при создании данных:', error);
            throw error;
        });
}