<template>
  <div style="width: 100%; display: flex" v-if="isAdmin">
    <el-button
      style="margin-left: auto; margin-bottom: 10px"
      type="info"
      :icon="Plus"
      @click="showAddRowModal = true"
      >Добавить строку
    </el-button>
  </div>
  <EasyDataTable :headers="headers" :items="items">
    <template #item-operation="item">
      <div class="operation-wrapper">
        <el-button type="primary" @click="editItem(item)" :icon="Edit" circle />
        <el-button
          type="danger"
          @click="setDeleteItem(item)"
          :icon="Delete"
          circle
        />
      </div>
    </template>
  </EasyDataTable>

  <el-dialog v-model="isEditing" title="Изменить строку таблицы" width="500">
    <div class="edit-item">
      <div class="edited-item" v-for="field in headers" :class="field.value">
        <div class="edited-item__name">{{ field.text }} :</div>
        <div class="edited-item__filed">
          <el-input
            v-model.trim="editedItem[field.value]"
            style="width: 100%"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isEditing = false">Отмена</el-button>
        <el-button type="primary" @click="submitEdit"> Сохранить </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog
    v-model="showAddRowModal"
    title="Добавить строку таблицы"
    width="500"
  >
    <div class="edit-item">
      <div class="edited-item" v-for="field in headers" :class="field.value">
        <div class="edited-item__name">{{ field.text }} :</div>
        <div
          class="edited-item__filed"
          :class="{
            error:
              addedRowHasError && !tableRowTemplate[field.value]?.trim().length,
          }"
        >
          <el-input
            v-model.trim="tableRowTemplate[field.value]"
            style="width: 100%"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showAddRowModal = false">Отмена</el-button>
        <el-button type="primary" @click="submitAddedRow">
          Сохранить
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="showRemoveItemModal" title="Удалить строку?" width="500">
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showRemoveItemModal = false">Отмена</el-button>
        <el-button type="danger" @click="deleteItem"> Удалить </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
import { ref, watch } from "vue";

import { useAppData } from "@/store/AppData.js";
const store = useAppData();
const isAdmin = store.isAdmin;
console.log(isAdmin);

const headers = ref([
  { text: "PLAYER", value: "player", sortable: true },
  { text: "TEAM", value: "team", sortable: true },
  { text: "NUMBER", value: "number", sortable: true },
  { text: "POSITION", value: "position", sortable: true },
  { text: "LAST ATTENDED", value: "lastAttended", sortable: true },
  { text: "COUNTRY", value: "country", sortable: true },
]);

if (isAdmin) {
  headers.value.push({ text: "Управление", value: "operation" });
}

const items = ref([
  {
    player: "Stephen Curry",
    team: "GSW",
    number: 30,
    position: "G",
    lastAttended: "Davidson",
    country: "USA",
    id: 0,
  },
  {
    player: "Lebron James",
    team: "LAL",
    number: 6,
    position: "F",
    lastAttended: "St. Vincent-St. Mary HS (OH)",
    country: "USA",
    id: 1,
  },
  {
    player: "Kevin Durant",
    team: "BKN",
    number: 7,
    position: "F",
    lastAttended: "Texas-Austin",
    country: "USA",
    id: 2,
  },
  {
    player: "Giannis Antetokounmpo",
    team: "MIL",
    number: 34,
    position: "F",
    lastAttended: "Filathlitikos",
    country: "Greece",
    id: 3,
  },
]);

const editedItem = ref(null);
const deletedItem = ref(null);
const isEditing = ref(false);
const showRemoveItemModal = ref(false);
const showAddRowModal = ref(false);
const addedRowHasError = ref(false);
const tableRowTemplateObject = headers.value.reduce((acc, item) => {
  if (item.value === "operation") return acc;

  acc[item.value] = "";
  return acc;
}, {});

const tableRowTemplate = ref({ ...tableRowTemplateObject });

const setDeleteItem = (el) => {
  deletedItem.value = items.value.find((item) => item.id == el.id);
  showRemoveItemModal.value = true;
};

const deleteItem = () => {
  items.value = items.value.filter((item) => item.id != deletedItem.value.id);
  showRemoveItemModal.value = false;
};

const editItem = (el) => {
  const currentItem = items.value.find((item) => item.id == el.id);
  console.log(el);

  editedItem.value = { ...currentItem };
  isEditing.value = true;
};

const submitEdit = () => {
  let currentItemIndex = items.value.findIndex(
    (item) => item.id == editedItem.value.id
  );
  if (currentItemIndex !== -1) {
    items.value[currentItemIndex] = { ...editedItem.value };
    isEditing.value = false;
  }
};

function areAllFieldsFilled(obj) {
  for (let key in obj) {
    if (!obj[key]) {
      return false;
    }
  }
  return true;
}

const submitAddedRow = () => {
  if (!areAllFieldsFilled(tableRowTemplate.value)) {
    addedRowHasError.value = true;
    return;
  }
  addedRowHasError.value = false;
  items.value.push(tableRowTemplate.value);
  showAddRowModal.value = false;
  setTimeout(() => {
    tableRowTemplate.value = { ...tableRowTemplateObject };
  }, 200);
};

watch(showAddRowModal, () => {
  addedRowHasError.value = false;
});
</script>

<style lang="scss">
.vue3-easy-data-table {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.vue3-easy-data-table__footer {
  margin-top: auto;
}
.operation-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
  cursor: pointer;
}

.operation-wrapper {
  display: flex;
  button {
    width: 27px !important;
    height: 27px !important;
  }
}

.edited-item.operation {
  display: none;
}

.edited-item__name {
  font-weight: 600;
  margin-top: 15px;
}

.edited-item__filed.error {
  .el-input__wrapper {
    box-shadow: 0 0 0 1px red inset;
  }
}
</style>
