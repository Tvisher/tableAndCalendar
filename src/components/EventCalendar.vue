<template>
  <el-calendar style="color: #000">
    <template #date-cell="{ data }">
      <div class="event-content">
        <div class="event-content__date">
          {{ new Date(data.day).getDate() }}
        </div>
        <!-- Проверяем, есть ли события на текущую дату и выводим их все -->
        <div
          v-if="getEventsByDate(new Date(data.day)).length"
          class="event-content__info"
        >
          <div v-if="getEventsByDate(new Date(data.day)).length > 1">
            <el-dropdown :hide-on-click="false">
              <span class="event-item _more-events"
                >Несколько событий
                <el-icon class="el-icon--right"><arrow-down /></el-icon
              ></span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    @click="showEvent(event)"
                    v-for="(event, index) in getEventsByDate(
                      new Date(data.day)
                    )"
                    :key="index"
                  >
                    {{ event.title }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div
            v-else
            class="event-item"
            @click="showEvent(getEventsByDate(new Date(data.day))[0])"
          >
            {{ getEventsByDate(new Date(data.day))[0].title }}
          </div>
        </div>
      </div>
    </template>
  </el-calendar>
  <el-dialog
    v-model="showEventInModal"
    title="Информация по событию"
    width="500"
  >
    <template #footer>
      <div class="event-info">
        <div class="event-info__name">Название:</div>
        <div class="event-info__value">{{ selectedEvent.title }}</div>
      </div>

      <div class="event-info">
        <div class="event-info__name">Дата Тренировки:</div>
        <div class="event-info__value">{{ selectedEvent.date }}</div>
      </div>
      <div class="event-info">
        <div class="event-info__name">ФИО участника:</div>
        <div class="event-info__value">{{ selectedEvent.fio_parc }}</div>
      </div>
      <div class="event-info">
        <div class="event-info__name">ФИО тренера:</div>
        <div class="event-info__value">{{ selectedEvent.fio_train }}</div>
      </div>
      <div class="event-info">
        <div class="event-info__name">Тип :</div>
        <div class="event-info__value">{{ selectedEvent.type }}</div>
      </div>
      <div class="event-info">
        <div class="event-info__name">Описание:</div>
        <div class="event-info__value">{{ selectedEvent.desc }}</div>
      </div>
      <div class="dialog-footer">
        <el-button @click="showEventInModal = false">ОК</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { useAppData } from "@/store/AppData.js";
const store = useAppData();

const events = ref(store.caledarEvents);
const selectedEvent = ref(null);
const showEventInModal = ref(false);

const showEvent = (eventItem) => {
  selectedEvent.value = eventItem;
  showEventInModal.value = true;
};

// Функция для поиска всех событий по дате
const getEventsByDate = (date) => {
  const formattedDate = date.toISOString().split("T")[0]; // Преобразуем дату в строку формата 'YYYY-MM-DD'
  return events.value
    ? events.value.filter((event) => event.date === formattedDate)
    : []; // Ищем все события с совпадающей датой
};
</script>

<style lang="scss">
.event-info__name {
  font-size: 12px;
  font-weight: 600;
  color: #000;
}
.event-info {
  color: rgb(32.4, 32.7, 33.3);
  text-align: left;
  line-height: 120%;
  margin-bottom: 10px;
}
.event-content {
  color: #000;
  text-align: left;
  font-weight: 400;
  width: 100%;
  height: 100%;
}

.event-content__date {
  font-size: 12px !important;
}

.el-calendar-table .el-calendar-day {
  display: flex;
  flex-direction: column;
}

.event-content__info {
  font-size: 12px;
  line-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .el-dropdown {
    width: 100%;
  }
}

.event-item {
  margin-top: 5px;
  background-color: purple;
  border-radius: 5px;
  padding: 5px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &._more-events {
    font-size: 10px;
  }
}

.is-today {
  background-color: rgba(0, 128, 0, 0.4) !important;
}
</style>
