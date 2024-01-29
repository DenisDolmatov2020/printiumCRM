<script setup lang="ts">
import {DeviceDetail, DeviceParams} from "#components";

defineProps({
  info: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <div class="row block-info">
    <div class="column left">
      <div class="left-title">
        {{ info.name }}
      </div>
      <div class="row justify-between left-subtitle mt-12">
        <div class="left-subtitle__address">
          Офис в {{ info.lk_location }}
        </div>
        <div class="left-subtitle__ip">
          IP: {{ info.ip_address }}
        </div>
      </div>

      <div class="mt-20 column gap-8">
        <div class="row gap-8">
          <span>
            Серийный номер:
          </span>
          <span>
            {{ info.serial }}
          </span>
        </div>
        <div class="row gap-8">
          <span>
            Инвент. номер:
          </span>
          <span>
            1232321
          </span>
        </div>

        <div class="left-comment">
          Комментарий:
          <br />
          Бухгалтерия, заменить в апреле
        </div>
      </div>
    </div>

    <div class="column right">
      <UITabs
          :options="[
            { label: 'Детали', component: DeviceDetail, info },
            { label: 'Параметры', component: DeviceParams, info }
          ]"
      />
    </div>

    <div class="block-info__close-icon">
      <img src="/assets/icons/close-icon.svg" alt="Иконка закрытия" />
    </div>

  </div>

</template>

<style scoped lang="scss">

.block-info {
  position: relative;
  padding: 30px 45px;
  border-radius: 8px;
  border: 1px solid var(--Main-Blue-Button, #4285F4);
  background: var(--Grey-Table, #F5F5F5);

  color: var(--Text-Dark, #11151C);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 85.714% */

  &__close-icon {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #89ADF2;
    border-radius: 20px
  }
}

.left {
  width: 300px;
  &-title {
    font-size: 20px;
    font-weight: 600;
    line-height: 22px; /* 110% */
  }
  &-subtitle {
    &__address {
      color: var(--Text-Dark, #11151C);
    }
    &__ip {
      color: var(--Main-Blue-Button, #4285F4);
    }
  }

  &-comment {
    margin-top: 28px;
    border-radius: 8px;
    background: #E3EDFF;
    padding: 4px 16px;
    font-size: 14px;
    line-height: 18px; /* 128.571% */
  }
}

.right {
  width: calc(100% - 380px);
  max-width: 1080px;
  margin: -10px 0 0 5vw;
}
</style>

