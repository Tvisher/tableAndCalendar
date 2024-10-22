<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, computed, watch } from "vue";
import { ElLoading } from "element-plus";
import AppTable from "./components/AppTable.vue";
import EventCalendar from "./components/EventCalendar.vue";
import { Calendar, Grid } from "@element-plus/icons-vue";

import { useAppData } from "@/store/AppData.js";
const store = useAppData();

const { tables } = storeToRefs(store);
const isAuth = ref(false);
const isAdmin = ref(false);

const appLoaded = ref(false);
const currentTab = ref("calendar");

const currentTable = computed(() => {
  return tables.value.filter((table) => table.id === currentTab.value);
});

const loading = ElLoading.service({
  lock: true,
  text: "Загрузка данных",
  background: "rgba(0, 0, 0, 0.1)",
  customClass: "mainLoader",
});

const removeRowInTable = ({ tableId, rowId }) => {
  const currentTable = tables.value.find((table) => table.id === tableId);
  currentTable.records = currentTable.records.filter((el) => el.id != rowId);
};

const addRowInTable = ({ tableId, row }) => {
  const currentTable = tables.value.find((table) => table.id === tableId);
  const newRow = {
    id: row.id,
    fieldsList: {},
  };
  for (let key in row) {
    const labelEl = currentTable.rowTemplate.find((el) => el.name == key);
    if (key != "id") {
      newRow.fieldsList[key] = {
        value: row[key],
        name: key,
        label: labelEl.label,
      };
    }
  }
  if (currentTable.records) {
    currentTable.records = [...currentTable.records, newRow];
  } else {
    currentTable.records = [newRow];
  }
};

const updateTableRow = ({ tableId, rowId, newData }) => {
  const currentTable = tables.value.find((table) => table.id === tableId);
  let currentRow = currentTable.records.find((el) => el.id == rowId);
  if (currentRow) {
    for (let key in newData) {
      if (currentRow.fieldsList[key]) {
        currentRow.fieldsList[key].value = newData[key];
      }
    }
  }

  currentTable.records = [...currentTable.records];
};

onMounted(() => {
  store.loadData().then(() => {
    isAuth.value = store.isAuth;
    isAdmin.value = store.isAdmin;
    appLoaded.value = true;
    loading.close();
  });
});
</script>

<template>
  <transition name="fade" mode="out-in">
    <div class="cont" v-if="appLoaded">
      <el-button type="warning" class="reg-btn" v-if="!isAuth && !isAdmin">
        <a href="/wp-login.php?action=register" style="color: #ffff"
          >Регистрация</a
        >
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
              @click="currentTab = table.id"
              :type="currentTab == table.id ? 'success' : 'primary'"
              :icon="Grid"
              v-for="table in tables"
              >{{ table.tableName }}</el-button
            >
          </el-card>
        </div>
        <div class="content-zone">
          <EventCalendar v-if="currentTab == 'calendar'" />
          <AppTable
            v-for="table in currentTable"
            :tableData="table.records"
            :tableHead="table.rowTemplate"
            :tableId="table.id"
            :key="table.id"
            @onDeleteItem="removeRowInTable"
            @onAddedItem="addRowInTable"
            @onUpdateItem="updateTableRow"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.table-item {
  height: 100%;
}
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
  height: fit-content !important;
  white-space: initial !important;
  width: 100%;
  margin: 10px 0px !important;
  justify-content: space-between !important;
  text-align: right !important;
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
