<script setup>
import FilterIcon from "~/components/UI/icons/FilterIcon.vue";
import {Search} from "@element-plus/icons-vue";
import ChevronIcon from "~/components/UI/icons/ChevronIcon.vue";

const isShow = ref(false);

const searchValue = ref('');

const filters = ref([])

const filteredFilters = computed(() => {
  return filters.value.filter(f => f?.title?.toLowerCase().includes(searchValue.value.toLowerCase()));
})

const initFilters = () => {
  filters.value = [
    { id: 1, title: 'Объем печати', value: true, items: [
        {
          type: 'input', title: 'Общий объем, \n' + 'страниц', inputs: [
            { value: '', placeholder: 'От', name: 'count_page_total__on_period__gte' },
            { value: '', placeholder: 'До', name: 'count_page_total__on_period__lte' }
          ]
        },
        {
          type: 'input', title: 'Объем ЧБ печати, страниц', inputs: [
            { value: '', placeholder: 'От', name: 'count_page_black__on_period__gte' },
            { value: '', placeholder: 'До', name: 'count_page_black__on_period__lte' }
          ]
        },
        {
          type: 'input',
          title: 'Объем цветной печати, страниц',
          inputs: [
            { value: '', placeholder: 'От', name: 'count_page_color__on_period__gte' },
            { value: '', placeholder: 'До', name: 'count_page_color__on_period__lte' }
          ]
        }
      ]},
    { id: 2, title: 'Затраты', value: true, items: [
        {
          type: 'input',
          title: 'Затраты на ЧБ печать, \n' + 'рублей',
          inputs: [
            { value: '', placeholder: 'От', name: 'black_cost__on_period__gte' },
            { value: '', placeholder: 'До', name: 'black_cost__on_period__lte' }
          ]
        },
        {
          type: 'input',
          title: 'Затраты на цветную печать, \n' + 'рублей',
          inputs: [
            { value: '', placeholder: 'От', name: 'color_cost__on_period__gte' },
            { value: '', placeholder: 'До', name: 'color_cost__on_period__lte' }
          ]
        }
      ] },
    { id: 3, title: 'Фильтр 3', value: false, items: [
        { type: 'input', title: 'Объем цветной печати, страниц', inputs: [
            { value: '', placeholder: 'От' },
            { value: '', placeholder: 'До' }
          ] }
      ] }
  ]
}

initFilters()
</script>

<template>
  <div
      v-if="isShow"
      class="overlay"
      @click="isShow = false"
  />

  <div class="field">
    <button
        class="field-btn"
        :class="{ 'field-btn-active': isShow }"
        @click="isShow = true"
    >
      <FilterIcon :color="isShow ? '#FFFFFF' : '#4285F4'" />
      <span>
        Фильтры
      </span>
    </button>

    <div v-if="isShow" class="field-card">
      <div class="row justify-between align-center nowrap">
        <div class="font-22">
          Фильтры
        </div>

        <el-row>
          <el-button @click="initFilters">
            Сбросить
          </el-button>
          <el-button type="primary" @click="$emit('apply-filters', filters); isShow = false">
            Ok
          </el-button>
        </el-row>

      </div>

      <el-input
          v-model="searchValue"
          placeholder="Поиск"
          :prefix-icon="Search"
          :size="'large'"
          clearable
          class="block-input mt-12 mb-16"
          style="margin: 17px 0"
          @input="v => $emit('update:modelValue', v)"
      />

      <div class="container column">
        <template v-if="isShow">
          <div v-for="filter in filteredFilters" :key="filter.id" class="column">
            <div class="row justify-between align-center">
              <div class="container-title">
                {{ filter.title }}
              </div>

              <el-button
                  :icon="ChevronIcon"
                  text type="info"
                  class="p-0"
                  :class="{ 'rotate-180': filter.value }"
                  @click="filter.value = !filter.value"
              />
            </div>

            <div v-if="filter.value" class="column">
              <div
                  v-for="item in filter.items"
                  :key="item.title"
                  class="row justify-between align-center mt-20"
              >
                <div class="item-title">
                  {{ item.title }}
                </div>

                <div class="row">
                  <input
                      v-for="(inp, index) in item.inputs"
                      v-model="inp.value"
                      :class="{ 'input-l': !index, 'input-r': index }"
                      :placeholder="inp.placeholder"
                  />
                </div>
              </div>

              <div class="separator" />
            </div>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.separator {
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: var(--Grey-Table, #F5F5F5);
  margin: 30px 0 20px;
}
.item-title {
  color: var(--Text-Light, #8E94A0);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
  max-width: 170px;
}

.input-l,
.input-r {
  max-width: 48px;
  max-height: 39px;
  min-height: 39px;
  border-radius: 4px;
  border: 1px solid #EEE;
  background: #FFF;
  padding: 0 16px;
}

.input-l::placeholder,
.input-r::placeholder {
  color: var(--Text-Light, #8E94A0);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
}

.input-r {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.input-l {
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.field {
  position: relative;
  color: var(--Text-Dark, #11151C);
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;


  &-btn {
    &-active {
      fill: #FFFFFF;
      stroke: #FFFFFF;
      color: var(--Main-White, #FFFFFF);
      background: var(--Main-Blue-Medium, #89ADF2);
    }
    cursor: pointer;
    color: var(--Main-Blue-Button, #4285F4);

    /* SubTitle ST */
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 15px; /* 115.385% */

    display: inline-flex;
    height: 44px;
    padding: 4px 16px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex-shrink: 0;
    border-radius: 32px;
    background: var(--Light-Blue, #F0F5FF);
    border: none;
  }

  &-card {
    overflow: auto;
    z-index: 100;
    position: absolute;
    border-radius: 8px;
    background: #FFF;
    box-shadow: 0 4px 24px 0 #D1D7E2;
    left: -150px;
    width: 399px;
    height: 620px;
    max-height: 80vh;
    flex-shrink: 0;
    margin-top: 16px;

    padding: 20px 24px;
  }
}
</style>
