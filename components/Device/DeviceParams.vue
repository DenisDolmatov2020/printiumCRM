<script setup lang="ts">
const props = defineProps({
  serial: {
    type: String,
    default: ''
  }
})

const params = ref([]);

import {useCommon} from "~/composable/useCommon";

const commonApi = useCommon();
const getParts = async () => {
  const response = await commonApi.getParams(props.serial);
  params.value = response.device_parameters;
}

getParts();
</script>

<template>
  <div class="row justify-between right-buttons mt-16">
    <div>
      <el-button class="el-button__outline"> Excel </el-button>
      <el-button class="el-button__outline"> Обновить </el-button>
    </div>

    <el-button class="el-button__outline"> SNMP </el-button>
  </div>
  <DeviceTable
    :headers="[
        { label: '№', value: 'oid' },
        { label: 'Название параметра', value: 'name' },
        { label: 'Значения', value: 'value' }
    ]"
    :options="params"
    class="mt-24"
  />
</template>

<style scoped lang="scss">

</style>
