import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import 'normalize.css';

import ElementPlus from 'element-plus'
import ruLang from 'element-plus/es/locale/lang/ru'
import 'element-plus/dist/index.css'
createApp(App)
    .use(ElementPlus, {
        locale: ruLang,
    })
    .use(createPinia())
    .component('EasyDataTable', Vue3EasyDataTable)
    .mount('#app')
