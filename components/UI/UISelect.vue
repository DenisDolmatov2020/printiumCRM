<script setup>
import { ref } from "vue";
import Chevron from "~/components/UI/icons/ChevronIcon.vue";

const isShow = ref(false);


const props = defineProps({
  typeFields: {
    type: String,
    default: "checkbox"
  },
  label: {
    type: String,
    default: "Без названия"
  },
  options: {
    type: Array,
    default: () => []
  }
});

const activeOptions = computed(() => props.options.filter(v => !!v.value));
</script>

<template>
  <!--
  <select
      v-model="value"
      class="m-2 select"
  >
    <option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    >
      {{ item.label }}
    </option>
  </select>\

  -->

    <div class="field-select">
      <div
        class="field-select__button row justify-between align-center gap-8"
        :class="{ active: isShow }"
        @click="isShow = !isShow"
      >
        <div class="field-select__button-label">
          {{ label }}
        </div>

        <div
          v-for="option in activeOptions"
          :key="`option_${option.id}`"
          class="row justify-between align-center nowrap gap-8 field-select__button-chip"
        >
          {{ option.name }}

          <img
              src="/assets/icons/close-icon-grey.svg"
              alt="Close icon"
              @click.stop="$emit('check', option)"
          />
        </div>

        <div class="field-select__button-icon">
          <Chevron :is-active="isShow" />
        </div>
      </div>

      <div v-if="isShow" class="field-select__options">
        <template
          v-for="item in options"
          :key="item.value"
        >
          <fieldset
            v-if="item.type === 'checkbox'"
            class="field-select__options-item row justify-between align-center cursor-pointer"
            @click="$emit('check', item)"
          >
            <div class="row nowrap align-center gap-8">
              <div
                v-if="item?.color"
                :class="`bg-${item?.color}`"
                style="width: 12px; height: 12px; border-radius: 20px"
              />

              <span>
                {{ item.name }}
              </span>
            </div>

            <input
              :checked="item.value"
              type="checkbox"
              class="cursor-pointer checkbox-input"
            />
          </fieldset>

          <fieldset
              v-else
              class=""
              @click="$emit('check', item)"
          >
            <label>
              {{ item.name }}
            </label>

            <input
              v-model="item.value"
              type="text"
            />
          </fieldset>
        </template>


      </div>
    </div>
</template>

<style scoped lang="scss">
.field-select {
  position: relative;
  color: var(--Text-Dark, #11151C);
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  &__options {
    padding: 16px 0;
    border-radius: 8px;
    z-index: 999;
    // display: none;
    position: absolute;
    width: 16vw;
    height: auto;
    background-color: #FFFFFF;
    box-shadow: 1px 1px 11px rgba(0, 0, 0, 0.1);

    &-item {
      color: var(--Text-Dark, #11151C);
      font-family: Inter;
      font-size: 14px;
      padding: 16px;
      color: var(--Text-Dark, #11151C);
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      border: none;

      &:hover {
        background: var(--Light-Blue, #F0F5FF);
      }
    }
  }

  &__button {
    background: var(--Grey-Table, #F5F5F5);
    min-width: 164px;
    border-radius: 60px;
    margin-bottom: 4px;
    cursor: pointer;
    padding: 2px 16px 2px;
    height: 100%;

    &-chip {
      padding: 6px 8px;
      background-color: #FFFFFF;
      border-radius: 24px;
    }

    &:hover,
    &.active {
      background: var(--Light-Blue, #F0F5FF);
    }

    &-icon {

    }
  }
}



.select {
  display: flex;
  width: 164px;
  height: 36px;
  padding: 4px 16px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  appearance: none; /* Сбрасываем стандартные стили браузера */
  -webkit-appearance: none; /* Для вебкит-браузеров */
  -moz-appearance: none;

  &::-ms-expand {
    display: none; /* Скрываем стрелку в Firefox */
  }
}

.flex-grow {
  flex-grow: 1;
}
</style>
