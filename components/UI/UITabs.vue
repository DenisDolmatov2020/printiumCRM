<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";

const activeName = ref('Детали');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
}

defineProps({
  options: {
    type: Array,
    default: () => [
      { label: 'Все' },
      { label: 'Локации', component: null },
      { label: 'Группы', component: null }
    ]
  }
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
      <component :is="option.component" />
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
