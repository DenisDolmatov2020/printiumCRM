<script setup lang="ts">
import {useAuthUser} from "~/composable/useAuthUser";

const router = useRouter()
const clickUserIcon = () => {
  const isAuth = useAuthUser()
  console.log('isAuth', isAuth.value)

  if (!isAuth.value) {
    router.push('/login')
  }
}
</script>

<template>
    <div class="header">
      <div class="header-label">
        <img src="../../assets/icons/logo-icon.svg" alt="icon" class="header-label__icon" />
        <span class="header-label__title">printum</span>
      </div>

      <div class="header-buttons gap-15">

        <img src="../../assets/icons/bell-icon.svg" alt="icon" />
        <img src="../../assets/icons/help-icon.svg" alt="icon" />
        <img
            src="../../assets/icons/avatar-icon.svg"
            alt="Иконка пользователя"
            class="cursor-pointer"
            @click="clickUserIcon"
        />

      </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;

  &-buttons {
    display: flex;
    align-items: center;
  }
  &-label {
    display: inline-flex;
    justify-content: center;

    &__icon {
      margin-right: 7px;
    }

    &__title {
      color: var(--Text-Dark, #11151C);
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Jura;
      font-size: 28px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 71.429% */
    }
  }
}

</style>
