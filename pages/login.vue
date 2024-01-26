<script lang="ts" setup>
import {useAuth} from "~/composable/useAuth";
import {ArrowLeft, Edit} from "@element-plus/icons-vue";

definePageMeta({
  middleware: ["guest-only"],
  layout: "auth"
});

const { login } = useAuth();

const form = reactive({
  data: {
    email: "denispoliarush@icloud.com",
    password: "DenVik37"
  },
  error: "",
  pending: false,
});

// const isAdmin = useAdmin();

async function onLoginClick() {
  try {
    form.error = "";
    form.pending = true;

    await login(form.data.email, form.data.password);

    const redirect = '/'; //  isAdmin.value ? "/admin" : "/private";
    await navigateTo(redirect);
  } catch (error: any) {
    console.error(error);

    if (error.data.message) form.error = error.data.message;
  } finally {
    form.pending = false;
  }
}
</script>

<template>
  <div class="m-auto justify-between modal">
    <div class="column modal-column">
      <el-button
          link
          :icon="ArrowLeft"
          type="primary"
          class="modal-column__back"
      >Назад</el-button>

      <img
          src="/assets/images/logo.svg"
          width="64"
          alt="Логотип printum"
          class="m-auto modal-column__img"
      />

      <span class="m-auto modal-column__title">printum</span>

      <span class="m-auto modal-column__type mt-32">
        Авторизация
      </span>

      <div class="mt-20">
        <div class="mb-12 modal-column__label">Логин</div>
        <el-input v-model="form.data.email" size="large" placeholder="User@email.ru" />
      </div>

      <div class="mt-20">
        <div class="mb-12 modal-column__label row justify-between">
          <div>
            Пароль
          </div>
          <div class="modal-column__label-recovery">
            Восстановить пароль
          </div>
        </div>
        <el-input v-model="form.data.password" type="password" size="large" placeholder="1234567" />
      </div>

      <el-button type="info" size="large" style="margin-top: 50px" @click="onLoginClick">
        Войти
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  width: 312px;
  padding-top: 5vw;

  &-column {
    &__back {
      max-width: 50px;
      margin-bottom: 5vw;
    }

    &__title {
      color: #666;
      font-feature-settings: 'clig' off, 'liga' off;
      font-family: Jura;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 15px; /* 75% */
    }

    &__type {
      color: #333;
      font-family: Inter;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    &__label {
      color: var(--Text-Dark, #11151C);
      font-family: Roboto;
      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      line-height: 17px; /* 113.333% */

      &-recovery {
        color: var(--Main-Blue-Button, #4285F4);
        font-family: Inter;
        font-size: 13px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    }

  }
}
</style>
