<script setup lang="ts">

</script>

<template>
  <button class="ui-button" @click="$emit('click')">
    <ClientOnly>
      <slot />
    </ClientOnly>
  </button>
</template>

<style scoped lang="scss">
.ui-button {
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
}
</style>
