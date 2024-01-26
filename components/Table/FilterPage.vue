<script setup lang="ts">
import {
  Setting,
  Delete
} from '@element-plus/icons-vue'

const props = defineProps({
  optionsLocation: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <el-row class="mt-16 gap-8" justify="space-between">

    <client-only>
      <el-row class="gap-8">
        <UISelect label="Локации" :options="optionsLocation">
          Фильтр 1
        </UISelect>

        <el-date-picker>

        </el-date-picker>
      </el-row>

      <el-row :gutter="15">
        <el-button type="info" :icon="Setting" circle plain class="button-icon" />

        <el-button type="info" :icon="Delete" circle plain class="button-icon" />
      </el-row>

    </client-only>
  </el-row>
</template>

<style scoped lang="scss">
.ui-select {
  max-width: 200px;
  width: 164px;
  height: 36px;
  border: none;
  border-radius: 60px;
  background: var(--Grey-Table, #F5F5F5);

  &__wrapper {
    background: var(--Grey-Table, #F5F5F5);
  }
  // background-color: #4285F4;
  &__selected-item {
    background: var(--Grey-Table, #F5F5F5);
  }
}

.button-icon {
  color: black;
}
</style>
