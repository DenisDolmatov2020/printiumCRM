<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";

const activeName = ref('Детали');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
}

const props = defineProps({
  activeTab: {
    type: String,
    default: 'Детали'
  },
  options: {
    type: Array,
    default: () => [
      { label: 'Все' },
      { label: 'Локации', component: null },
      { label: 'Группы', component: null }
    ]
  }
})

onMounted(() => {
  activeName.value = props.activeTab;
})
</script>

<template>
  <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
    <el-tab-pane
        v-for="option in options"
        :key="option.label"
        :label="option.label"
        :name="option.label"
    >
      <component :is="option?.component" :serial="option.info?.serial" />
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss">
.el-tabs__item {
  color: var(--Text-Light, #8E94A0);
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 120% */
}
</style>
