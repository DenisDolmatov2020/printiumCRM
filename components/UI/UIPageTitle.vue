<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "Название страницы"
  }
})
</script>

<template>
  <div class="page">
    <div class="page-title">
      {{ title }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-title {
  color: var(--Text-Dark, #11151C);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Inter, sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 40px;
}
</style>
