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








