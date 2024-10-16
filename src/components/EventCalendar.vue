<!-- <template>
  <el-calendar style="color: #000">
    <template #date-cell="{ data }">
      <div class="event-content">
        <div class="event-content__date">
          {{ new Date(data.day).getDate() }}
        </div>
        <div
          class="event-content__info"
          v-if="getEventByDate(new Date(data.day))"
          @click="console.log(123)"
        >
          {{ getEventByDate(new Date(data.day)).name }}
        </div>
      </div>
    </template>
  </el-calendar>
</template>

<script setup>
const events = [
  { date: "2024-10-05", name: "Какой то евент типа" },
  { date: "2024-10-05", name: "Какой то евент типа1" },
  { date: "2024-10-21", name: "Какой то евент типа" },
];

// Функция для поиска события по дате
const getEventByDate = (date) => {
  const formattedDate = date.toISOString().split("T")[0]; // Преобразуем дату в строку формата 'YYYY-MM-DD'
  return events.find((event) => event.date === formattedDate); // Ищем событие с совпадающей датой
};
</script>

<style lang="scss">
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
}

.event-content__info {
  font-size: 12px;
  line-height: 100%;
  background-color: purple;
  border-radius: 5px;
  padding: 5px;
  color: #fff;
}

.is-today {
  background-color: rgba(0, 128, 0, 0.4) !important;
}
</style> -->
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
                    {{ event.name }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div v-else class="event-item" @click="showEvent(event)">
            {{ getEventsByDate(new Date(data.day))[0].name }}
          </div>
        </div>
      </div>
    </template>
  </el-calendar>
</template>

<script setup>
import { ref } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
// Массив с событиями
const events = ref([
  { date: "2024-10-05", name: "Первое событие" },
  { date: "2024-10-05", name: "Второе событие" },
  { date: "2024-10-21", name: "Ещё одно событие" },
]);

const showEvent = (event) => {
  console.log(event);
};

// Функция для поиска всех событий по дате
const getEventsByDate = (date) => {
  const formattedDate = date.toISOString().split("T")[0]; // Преобразуем дату в строку формата 'YYYY-MM-DD'
  return events.value.filter((event) => event.date === formattedDate); // Ищем все события с совпадающей датой
};
</script>

<style lang="scss">
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
}

.event-item {
  margin-top: 5px;
  background-color: purple;
  border-radius: 5px;
  padding: 5px;
  color: #fff;
  &._more-events {
    font-size: 10px;
  }
}

.is-today {
  background-color: rgba(0, 128, 0, 0.4) !important;
}
</style>
