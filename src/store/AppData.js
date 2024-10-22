import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { fetchData } from "@/services/api";


export const useAppData = defineStore("AppData", () => {
    const isAuth = document.querySelector('#app').getAttribute('data-auth');
    const isAdmin = ref(true);
    const tables = ref([]);
    const caledarEvents = ref([]);

    const loadData = async () => {
        return new Promise((resolve, reject) => {
            fetchData('start.php')
                .then(data => {
                    // const data = {
                    //     "calendar_cat": [
                    //         {
                    //             "id": 70,
                    //             "title": "уркекрукер",
                    //             "date": "2024-10-18",
                    //             "desc": "уркеукеркер",
                    //             "fio_parc": "пукцпруцрке",
                    //             "fio_train": "рукеркеурке",
                    //             "type": "уркеукерке"
                    //         },
                    //         {
                    //             "id": 65,
                    //             "title": "Событие!!!",
                    //             "date": "2024-10-01",
                    //             "desc": "Есть над чем задуматься: непосредственные участники технического прогресса неоднозначны и будут обнародованы. Лишь акционеры крупнейших компаний, инициированные исключительно синтетически, преданы социально-демократической анафеме.",
                    //             "fio_parc": "Смирнов Иван Петрович",
                    //             "fio_train": "Петров Сидор Иванович",
                    //             "type": "Тренировка"
                    //         }
                    //     ],
                    //     "tables": [
                    //         {
                    //             "tableName": "Поделиться идеей",
                    //             "id": "ideas",
                    //             "rowTemplate": [
                    //                 {
                    //                     "label": "Идея развития хоккейной команды",
                    //                     "name": "idea"
                    //                 },
                    //                 {
                    //                     "label": "ФИО",
                    //                     "name": "fio"
                    //                 }
                    //             ],
                    //             "records": null
                    //         },
                    //         {
                    //             "tableName": "Рекомендации тренера",
                    //             "id": "recomends",
                    //             "rowTemplate": [
                    //                 {
                    //                     "label": "ФИО игрока",
                    //                     "name": "fio_player"
                    //                 },
                    //                 {
                    //                     "label": "ФИО тренера",
                    //                     "name": "fio_train"
                    //                 },
                    //                 {
                    //                     "label": "Рекомендации тренера",
                    //                     "name": "recomends"
                    //                 }
                    //             ],
                    //             "records": [
                    //                 {
                    //                     "id": 77,
                    //                     "fieldsList": {
                    //                         "fio_player": {
                    //                             "value": "123123",
                    //                             "label": "ФИО игрока",
                    //                             "name": "fio_player"
                    //                         },
                    //                         "fio_train": {
                    //                             "value": " 123 12 3",
                    //                             "label": "ФИО тренера",
                    //                             "name": "fio_train"
                    //                         },
                    //                         "recomends": {
                    //                             "value": "12 312 3",
                    //                             "label": "Рекомендации тренера",
                    //                             "name": "recomends"
                    //                         }
                    //                     }
                    //                 },
                    //                 {
                    //                     "id": 58,
                    //                     "fieldsList": {
                    //                         "fio_player": {
                    //                             "value": "Смирнов Иван Петрович",
                    //                             "label": "ФИО игрока",
                    //                             "name": "fio_player"
                    //                         },
                    //                         "fio_train": {
                    //                             "value": "Петров Сидор Иванович",
                    //                             "label": "ФИО тренера",
                    //                             "name": "fio_train"
                    //                         },
                    //                         "recomends": {
                    //                             "value": "переставить на плечи руки",
                    //                             "label": "Рекомендации тренера",
                    //                             "name": "recomends"
                    //                         }
                    //                     }
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             "tableName": "Статистика очков игроков",
                    //             "id": "statist",
                    //             "records": [
                    //                 {
                    //                     "id": 64,
                    //                     "rowTemplate": [
                    //                         {
                    //                             "label": "ФИО",
                    //                             "name": "fio"
                    //                         },
                    //                         {
                    //                             "label": "Количество тренировок",
                    //                             "name": "count_train"
                    //                         },
                    //                         {
                    //                             "label": "Количество матчей",
                    //                             "name": "count_match"
                    //                         },
                    //                         {
                    //                             "label": "Очки",
                    //                             "name": "points"
                    //                         }
                    //                     ],
                    //                     "fieldsList": {
                    //                         "fio": {
                    //                             "value": "Смирнов Иван Петрович",
                    //                             "label": "ФИО",
                    //                             "name": "fio"
                    //                         },
                    //                         "count_train": {
                    //                             "value": "12",
                    //                             "label": "Количество тренировок",
                    //                             "name": "count_train"
                    //                         },
                    //                         "count_match": {
                    //                             "value": "4",
                    //                             "label": "Количество матчей",
                    //                             "name": "count_match"
                    //                         },
                    //                         "points": {
                    //                             "value": "20",
                    //                             "label": "Очки",
                    //                             "name": "points"
                    //                         }
                    //                     }
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             "tableName": " Таблица с участниками",
                    //             "id": "participants",
                    //             "rowTemplate": [
                    //                 {
                    //                     "label": "ФИО",
                    //                     "name": "fio"
                    //                 },
                    //                 {
                    //                     "label": "Возраст",
                    //                     "name": "age"
                    //                 },
                    //                 {
                    //                     "label": "Медицинские показатели игрока",
                    //                     "name": "medical"
                    //                 },
                    //                 {
                    //                     "label": "ФИО тренера",
                    //                     "name": "fio_trains"
                    //                 },
                    //                 {
                    //                     "label": "Телефон",
                    //                     "name": "phone"
                    //                 }
                    //             ],
                    //             "records": [
                    //                 {
                    //                     "id": 63,
                    //                     "fieldsList": {
                    //                         "fio": {
                    //                             "value": "Смирнов Иван Петрович",
                    //                             "label": "ФИО",
                    //                             "name": "fio"
                    //                         },
                    //                         "age": {
                    //                             "value": "27",
                    //                             "label": "Возраст",
                    //                             "name": "age"
                    //                         },
                    //                         "medical": {
                    //                             "value": "Нарушено анатомическое строение",
                    //                             "label": "Медицинские показатели игрока",
                    //                             "name": "medical"
                    //                         },
                    //                         "fio_trains": {
                    //                             "value": "Петров Сидор Иванович",
                    //                             "label": "ФИО тренера",
                    //                             "name": "fio_trains"
                    //                         },
                    //                         "phone": {
                    //                             "value": "89999999999",
                    //                             "label": "Телефон",
                    //                             "name": "phone"
                    //                         }
                    //                     }
                    //                 }
                    //             ]
                    //         }
                    //     ],
                    //     "admin": true
                    // }
                    console.log(data);
                    caledarEvents.value = data.calendar_cat;
                    tables.value = data.tables;
                    isAdmin.value = data.admin;
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }



    return {
        caledarEvents,
        tables,
        isAdmin,
        isAuth,
        loadData
    }
})








