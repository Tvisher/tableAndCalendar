import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAppData = defineStore("AppData", () => {
    const isAuth = ref(false);
    const isAdmin = ref(true);
    const tables = ref([]);
    const caledarEvents = ref([{
        date: "2024-10-05",
        name: "Первое событие ",
        id: 1,
        description: "Какой то текст1",
    },
    {
        date: "2024-10-05",
        name: "Второе событие",
        id: 2,
        description: "Какой то текст2",
    },
    {
        date: "2024-10-21",
        name: "Ещё одно событие",
        id: 3,
        description: "Какой то текст3",
    },
    {
        date: "2024-10-23",
        name: "Ещё одно событие2",
        id: 4,
        description: "Какой то текст4",
    }])

    return {
        caledarEvents,
        tables,
        isAdmin,
        isAuth
    }
})








