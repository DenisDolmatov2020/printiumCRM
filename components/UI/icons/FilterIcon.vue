<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: '#4285F4'
  }
})
</script>

<template>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.3215 2.5H3.67851C3.02764 2.5 2.5 3.02764 2.5 3.67851C2.5 3.99107 2.62416 4.29083 2.84518 4.51184L6.91421 8.58088C7.28929 8.95595 7.5 9.46466 7.5 9.99509V13.7639C7.5 14.5215 7.92801 15.214 8.60557 15.5528L11.7764 17.1382C12.1088 17.3044 12.5 17.0627 12.5 16.691V9.99509C12.5 9.46466 12.7107 8.95595 13.0858 8.58088L17.1548 4.51184C17.3758 4.29083 17.5 3.99107 17.5 3.67851C17.5 3.02764 16.9724 2.5 16.3215 2.5Z" :stroke="color" stroke-width="2" stroke-linecap="round"/>
  </svg>
</template>

<style scoped lang="scss">

</style>
