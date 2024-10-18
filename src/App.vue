<script setup>
import { ref, onMounted } from "vue";
import { ElLoading } from "element-plus";
import AppTable from "./components/AppTable.vue";
import EventCalendar from "./components/EventCalendar.vue";
import { Calendar, Grid } from "@element-plus/icons-vue";

import { useAppData } from "@/store/AppData.js";
const store = useAppData();
const isAuth = store.isAuth;

const currentTab = ref("calendar");
const appLoaded = ref(false);

const loading = ElLoading.service({
  lock: true,
  text: "Загрузка данных",
  background: "rgba(0, 0, 0, 0.1)",
  customClass: "mainLoader",
});

onMounted(() => {
  setTimeout(() => {
    appLoaded.value = true;
    loading.close();
  }, 1400);
});
</script>

<template>
  <transition name="fade" mode="out-in">
    <div class="cont" v-if="appLoaded">
      <el-button type="warning" class="reg-btn" v-if="!isAuth">
        <a href="https://www.google.ru" style="color: #ffff">Регистрация</a>
      </el-button>
      <div class="app-wrapper">
        <div class="sidebar-menu">
          <el-card style="height: 100%">
            <el-button
              class="sidebar-btn"
              @click="currentTab = 'calendar'"
              :type="currentTab == 'calendar' ? 'success' : 'primary'"
              :icon="Calendar"
              >Календарь</el-button
            >
            <el-button
              class="sidebar-btn"
              @click="currentTab = 'table-1'"
              :type="currentTab == 'table-1' ? 'success' : 'primary'"
              :icon="Grid"
              >Таблица 1</el-button
            >
            <el-button
              class="sidebar-btn"
              @click="currentTab = 'table-2'"
              :type="currentTab == 'table-2' ? 'success' : 'primary'"
              :icon="Grid"
              >Таблица 2</el-button
            >
            <el-button
              class="sidebar-btn"
              @click="currentTab = 'table-3'"
              :type="currentTab == 'table-3' ? 'success' : 'primary'"
              :icon="Grid"
              >Таблица 3</el-button
            >
            <el-button
              class="sidebar-btn"
              @click="currentTab = 'table-4'"
              :type="currentTab == 'table-4' ? 'success' : 'primary'"
              :icon="Grid"
              >Таблица 4</el-button
            >
          </el-card>
        </div>
        <div class="content-zone">
          <AppTable v-if="currentTab == 'table-1'" />
          <EventCalendar v-if="currentTab == 'calendar'" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.mainLoader {
  .el-loading-spinner .path {
    stroke: #fff !important;
  }
  .circular {
    width: 100px !important;
    height: 100px !important;
  }

  .el-loading-text {
    font-size: 22px !important;
    color: #fff !important;
  }
}

.sidebar-btn {
  width: 100%;
  margin: 10px 0px !important;
}
.sidebar-menu {
  width: 20%;
}
.cont {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.reg-btn {
  width: fit-content;
  margin-bottom: 10px;
  margin-left: auto;
}

.content-zone {
  width: 80%;
  display: flex;
  flex-direction: column;
}

.app-wrapper {
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  display: flex;
  gap: 10px;
  background-color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
