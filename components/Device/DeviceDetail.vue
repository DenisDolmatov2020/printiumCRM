<script setup lang="ts">

const props = defineProps({
  serial: {
    type: String,
    default: ''
  }
})

const parts = ref([]);

import {useCommon} from "~/composable/useCommon";

const commonApi = useCommon();
const getParts = async () => {
 const response = await commonApi.getParts(props.serial);
  parts.value = response.parts;
}

getParts();
</script>

<template>
  <div class="right-buttons mt-16">
    <el-button class="el-button__outline"> Загрузить запчасти </el-button>
    <el-button class="el-button__outline"> Обновить </el-button>
  </div>

  <DeviceTable :options="parts" class="mt-24" />
</template>

<style scoped lang="scss">

</style>
