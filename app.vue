<template>
  <NuxtLoadingIndicator />

  <el-config-provider :locale="locale">
    <NuxtLayout slot="default" />
  </el-config-provider>
</template>
<script>
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'

import ru from 'element-plus/dist/locale/ru.mjs'

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      locale: ru,
    }
  },
})
</script>
