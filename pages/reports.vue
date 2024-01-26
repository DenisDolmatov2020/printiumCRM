<script setup lang="ts">
import SearchPage from "~/components/Table/SearchPage.vue";
import FilterPage from "~/components/Table/FilterPage.vue";

const haveClick = () => {
  console.log('HAVE')
}
</script>

<template>
  <div class="row gap-15">
    <UIPageTitle title="Отчеты" />
    <UISelect />

    <UIButton>
      <img src="~/assets/icons/add-icon.svg" alt="Добавить новый" />
    </UIButton>
  </div>

  <SearchPage />
  <FilterPage />

  <TablePage />
</template>

<style scoped lang="scss">

</style>
