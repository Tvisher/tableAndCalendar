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
          <el-input v-model="editedItem[field.value]" style="width: 100%" />
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
            v-model="tableRowTemplate[field.value]"
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

import { createData, deleteData, updateData } from "@/services/api";

const props = defineProps(["tableData", "tableId", "tableHead"]);
const emit = defineEmits(["onDeleteItem", "onAddedItem", "onUpdateItem"]);

import { useAppData } from "@/store/AppData.js";
const store = useAppData();
const isAdmin = store.isAdmin;

const tableHead = props.tableHead.map((row) => {
  return {
    text: row.label,
    value: row.name,
    sortable: true,
  };
});

const createTableRows = () => {
  let rows;
  if (!props.tableData) {
    rows = [];
  } else {
    rows = props.tableData.map((row) => {
      const rowData = {};
      rowData.id = row.id;
      Object.values(row.fieldsList).forEach((item) => {
        rowData[item.name] = item.value;
      });
      return rowData;
    });
  }

  return rows;
};

const headers = ref(tableHead);
const items = ref(createTableRows());

if (isAdmin) {
  headers.value.push({ text: "Управление", value: "operation" });
}

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
  document.body.style.pointerEvents = "none";

  deleteData("delete.php", {
    id: deletedItem.value.id,
  })
    .then(() => {
      emit("onDeleteItem", {
        tableId: props.tableId,
        rowId: deletedItem.value.id,
      });
      showRemoveItemModal.value = false;
    })
    .finally(() => {
      document.body.style.pointerEvents = "inherit";
    });
};

const editItem = (el) => {
  const currentItem = items.value.find((item) => item.id == el.id);
  editedItem.value = { ...currentItem };
  isEditing.value = true;
};

const submitEdit = () => {
  let currentItemIndex = items.value.findIndex(
    (item) => item.id == editedItem.value.id
  );
  if (currentItemIndex !== -1) {
    editedItem.value = trimObjectValues(editedItem.value);
    updateData("update.php", {
      table: props.tableId,
      ...editedItem.value,
    }).then((data) => {
      emit("onUpdateItem", {
        tableId: props.tableId,
        rowId: editedItem.value.id,
        newData: { ...editedItem.value },
      });
      isEditing.value = false;
    });
    // emit("onUpdateItem", {
    //   tableId: props.tableId,
    //   rowId: editedItem.value.id,
    //   newData: { ...editedItem.value },
    // });
    // isEditing.value = false;
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

function trimObjectValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ])
  );
}

const submitAddedRow = () => {
  if (!areAllFieldsFilled(tableRowTemplate.value)) {
    addedRowHasError.value = true;
    return;
  }
  addedRowHasError.value = false;
  tableRowTemplate.value = trimObjectValues(tableRowTemplate.value);
  document.body.style.pointerEvents = "none";

  createData("creat.php", {
    table: props.tableId,
    ...tableRowTemplate.value,
  })
    .then((newRowId) => {
      const newRow = { ...tableRowTemplate.value };
      newRow.id = newRowId;
      emit("onAddedItem", { tableId: props.tableId, row: newRow });
      showAddRowModal.value = false;
      setTimeout(() => {
        tableRowTemplate.value = { ...tableRowTemplateObject };
      }, 200);
    })
    .finally(() => {
      document.body.style.pointerEvents = "inherit";
    });

  // const newRow = { ...tableRowTemplate.value };
  // newRow.id = 123123123124124;
  // emit("onAddedItem", { tableId: props.tableId, row: newRow });
  // showAddRowModal.value = false;
  // setTimeout(() => {
  //   tableRowTemplate.value = { ...tableRowTemplateObject };
  // }, 200);
};

watch(showAddRowModal, () => {
  addedRowHasError.value = false;
});

watch(
  () => props.tableData,
  (newVal, oldVal) => {
    items.value = createTableRows();
  }
);
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
