<script setup lang="ts">
definePageMeta({
  middleware: ["user-only"]
});
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header height="49px">
        <UIHeader />
      </el-header>
      <el-container>
        <el-aside width="320px" class="aside">
          <UIMenu />
        </el-aside>
        <el-main>
          <NuxtPage />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
a, * {}
</style>
