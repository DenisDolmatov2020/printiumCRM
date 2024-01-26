<template>
  <el-button type="info" :icon="Setting" circle plain class="button-icon" @click="outerVisible = true" />

  <el-dialog v-model="outerVisible" width="400" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="row justify-between align-center nowrap">
        <div
          :id="titleId"
          :class="titleClass"
        >
          Настройка
        </div>

        <el-row>
          <el-button @click="close">
            Сбросить
          </el-button>
          <el-button type="primary" @click="close">
            Ok
          </el-button>
        </el-row>

      </div>
    </template>

    <div class="container column">
      <template v-if="isShow">
        <div class="row justify-between align-center">
          <div class="container-title">
            Новый столбец
          </div>

          <div>
            <el-button :icon="Close" text type="danger" class="p-0" @click="isShow = false" />

            <el-button :icon="Check" text type="primary" class="p-0" />
          </div>

        </div>

        <el-input placeholder="Название таблицы" size="large" class="mt-12" />

        <el-select placeholder="Выберете параметер" size="large" class="mt-12" />
      </template>


      <div class="row justify-between align-center mt-24">
        <div class="container-title">
          Столбцы таблицы
        </div>

        <el-button :icon="Plus" text type="primary" @click="isShow = true">
          Столбец
        </el-button>
      </div>

      <el-input placeholder="Поиск по названию параметра" size="large" class="mt-12" />

      <div
          v-for="(parameter, index) in parameters" :key="parameter.id"
          class="full-width row justify-between align-center list-item"
          :class="{ border: index < parameters.length - 1 }"
      >
        <div>
          {{ parameter.label }}
        </div>


          <input
              :checked="parameter.value"
              type="checkbox"
              class="cursor-pointer"
          />

      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {Check, Close, Plus, Setting} from "@element-plus/icons-vue";

const isShow = ref(false);

const outerVisible = ref(false);

const parameters = ref([
  { id: 1, label: '1', value: false },
  { id: 1, label: '1', value: false },
  { id: 3, label: '3', value: true },
]);
</script>

<style lang="scss">
.container {
  &-title {
    color: var(--Text-Dark, #11151C);
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 137.5% */
  }
}
.el-dialog {
  &__header {
    margin-right: 0 !important;
  }
  &__title {
    color: var(--Text-Dark, #11151C);
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Inter;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 40px; /* 181.818% */
  }

  &__body {

  }
}

.list-item {
  padding: 12px 0;
  color: var(--Text-Light, #8E94A0);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */

  &.border {
    border-bottom: 2px solid var(--Grey-Table, #F5F5F5);
  }
}

.el-icon {
  width: 24px;
  height: 24px;
  svg {
    width: 24px;
    height: 24px;
  }
}

</style>
