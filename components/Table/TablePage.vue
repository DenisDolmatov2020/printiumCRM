<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const multipleTableRef = ref()
const multipleSelection = ref([])
const toggleSelection = rows => {
  if (rows) {
    rows.forEach(row => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      multipleTableRef.value?.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value?.clearSelection()
  }
}
const handleSelectionChange = val => {
  multipleSelection.value = val
}
</script>

<template>
  <el-table
      ref="multipleTableRef"
      :data="items"
      class="mt-24 full-width"
      border
      @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" />
    <el-table-column prop="id" label="№" width="50" cell />
    <el-table-column prop="name" label="Модель" />
    <el-table-column prop="location.name" label="Локация" />
    <el-table-column label="Стоимость">
      <el-table-column prop="black_cost" label="Черно-Белая" width="120" />
      <el-table-column prop="color_cost" label="Цветная" width="100" />
      <el-table-column prop="total_cost" label="Всего" width="100" />
    </el-table-column>

    <el-table-column prop="counter" label="Счетчик">
      <el-table-column prop="date_created" label="Начало" width="120" />
      <el-table-column prop="date_updated" label="Конец" width="120" />
    </el-table-column>

    <el-table-column label="Дата">
      <el-table-column prop="last_date" label="" width="120" />
      <el-table-column prop="interface" label="" width="80" />
    </el-table-column>

    <el-table-column prop="status" label="Статус" />
  </el-table>
</template>

<style scoped lang="scss">

</style>