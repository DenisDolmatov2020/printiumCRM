<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import SubscribePage from "~/components/Table/SubscribePage.vue";

// Определение пропа с использованием v-model
defineProps(['modelValue', 'isSubscribing']);

</script>

<template>
  <div class="block row justify-between align-center">
    <el-input
        :model-value="modelValue"
        placeholder="Поиск"
        :prefix-icon="Search"
        :size="'large'"
        class="block-input"
        @input="v => $emit('update:modelValue', v)"
    />

    <div class="row">
      <SubscribePage v-if="isSubscribing" />

      <el-button size="large" class="el-button__outline">Скачать Excel</el-button>
      <el-button size="large" type="primary">Сохранить отчет</el-button>
    </div>
  </div>
</template>

<style lang="scss">
.block {
  margin-top: 24px;
  &-input {
    max-width: 420px;

    .el-icon.el-input__icon {
      svg {
        color: #8E94A0 !important;
      }
    }
  }
}
</style>
