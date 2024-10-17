<script setup>
import { ref } from "vue";
import AppTable from "./components/AppTable.vue";
import EventCalendar from "./components/EventCalendar.vue";
import { Calendar, Grid } from "@element-plus/icons-vue";
const currentTab = ref("calendar");
</script>

<template>
  <div class="cont">
    <el-button type="warning" class="reg-btn">
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
</template>

<style lang="scss">
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

// .sidebar-menu__item {
//   font-size: 22px;
//   color: #000;
//   text-align: left;
//   padding: 10px;
//   border: 1px solid #000;
//   font-weight: 600;
//   margin-bottom: 5px;
//   &.active {
//     color: #fff;
//     background-color: red;
//   }
// }
</style>
