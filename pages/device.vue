<script setup>
import SearchPage from "~/components/Table/SearchPage";
import { h, ref, shallowRef } from "vue";
import {useDevices} from "~/composable/useDevices";
import {useCommon} from "~/composable/useCommon";
import {useLocations} from "~/composable/useLocations";
import CloseIcon from "~/components/UI/icons/CloseIcon.vue";
import Settings from "~/components/Device/Settings.vue";
import ruRU from "element-plus/dist/locale/ru.mjs";


definePageMeta({
  // middleware: ["user-only"]
});

const commonApi = useCommon();

const otherFilters = ref([]);


const formatDate = (date) => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const searchValue = ref('');
const dateValues = ref(null);

const debounce = (callback, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

watch(() => searchValue.value, () => {
  console.log('WATCH for search');
  debounce(() => {
    // const query = searchValue.value.toLowerCase();
    getDevices()
    // searchResults.value = searchResults.value.filter(item => item.name.toLowerCase().includes(query));
  }, 1500);
});

watch(() => dateValues.value, () => {
  console.log('dateValues', dateValues.value);
  if (dateValues.value) getDevices();
});


// DATE
const customPrefix = shallowRef({
  render() {
    return h("span", "Период");
  }
})

const devices = ref([]);
const devicesApi = useDevices();

const optionsStatus = ref([]);

const getDevices = async (isDownload = false) => {

  const query = {
    query: searchValue.value,
    statuses: optionsStatus.value.filter(item => item.value).map(item => item.id).join(','),
    date_start: formatDate(dateValues?.value?.[0]),
    date_end: formatDate(dateValues?.value?.[1]),
  };

  otherFilters.value.forEach(category => {
    if (category.items) {
      category.items.forEach(filter => {
        if (filter.inputs) {
          filter.inputs.forEach(input => {
            if (input.value !== '') {
              query[input.name] = input.value;
            }
          });
        }
      });
    }
  });

  const response = await devicesApi.getDevices(query, isDownload);
  if (!isDownload) {
    devices.value = response.result;
  } else if (response?._data) {
    const blob = new Blob([response._data], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Printum-Devices${response?.fileName || ''}.xlsx`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}

getDevices();

const infoStatuses = {
  ok: {name: 'Исправны', value: false, type: 'checkbox', color: 'blue-medium'},
  warning: {name: 'Требуют внимания', value: false, type: 'checkbox', color: 'warning'},
  error: {name: 'Неисправны', value: false, type: 'checkbox', color: 'error'},
  unavailable: {name: 'Нет данных', value: false, type: 'checkbox', color: 'grey'}
}


const checkOptionStatus = item => {
  const updateOption = optionsStatus.value.find(option => option === item)
  updateOption.value = !updateOption.value

  getDevices()
}

const getStatuses = async () => {
  const response = await devicesApi.getStatuses();

  optionsStatus.value = Object.keys(response?.d?.statuses).map(key => {
    const info = infoStatuses[key];
    const id = response?.d?.statuses[key];
    const label = key;
    const value = false;
    const type = 'checkbox';

    return { ...info, id, label, value, type };
  });
}

getStatuses();

const optionsLocation = ref([]);
const locationsApi = useLocations();

const getLocations = async () => {
  const { locations } = await locationsApi.getLocations();
  optionsLocation.value = locations.children.map(location => { return { ...location, value: false, type: 'checkbox' }});
}

getLocations();

const checkOptionLocation = item => {
  const updateOption = optionsLocation.value.find(option => option === item);
  updateOption.value = !updateOption.value;

  getDevices();
}

const applyFilters = filters => {
  otherFilters.value = JSON.parse(JSON.stringify(filters));
  getDevices()
}

const clearFilter = item => {
  item.inputs = item.inputs.map(i => { return  { ...i, value: '' }})
  getDevices()
}
</script>

<template>
  <UIPageTitle title="Устройства" />

  <UITabs class="mt-24" />
    <SearchPage v-model="searchValue" @clickDownloadButton="getDevices(true)" />

    <client-only>
      <div class="mt-24 row nowrap justify-between">
        <el-row class="gap-8">
          <el-date-picker
              v-model="dateValues"
              size="large"
              :prefix-icon="customPrefix"
              :clear-icon="CloseIcon"
              type="daterange"
              :range-separator="dateValues ? 'по' : ''"
              start-placeholder=""
              end-placeholder=""
              :lang="ruRU"
              class="el-date-picker-alt"
              :class="{ active: dateValues }"
          />

          <UISelect
              label="Локации"
              :options="optionsLocation"
              @check="checkOptionLocation"
          />

          <UISelect
              label="Статус"
              :options="optionsStatus"
              @check="checkOptionStatus"
          />

          <template
            v-for="otherFilter in otherFilters"
            :key="`option_${otherFilter.title}`"
            class="option"
          >
            <template
                v-for="item in otherFilter.items"
                :key="`item_${item.title}`"
            >

              <div
                  v-if="item.inputs?.[0]?.value || item.inputs?.[1]?.value"
                  class="row justify-between align-center nowrap gap-8 option-button"
              >
                {{ item.title }}

                <div class="option-button__chip row align-center gap-8">
                  <div
                      v-for="(input, index) in item.inputs"
                      :key="`${index}_${input.title}`"
                  >
                    {{ !index ? 'С' : 'по' }}
                    {{ input?.value || '__' }}
                  </div>

                  <img
                      src="/assets/icons/close-icon-grey.svg"
                      alt="Close icon"
                      @click.stop="clearFilter(item)"
                  />
                </div>
              </div>

            </template>
          </template>



          <UIFilters @apply-filters="applyFilters" />

        </el-row>

        <Settings :options="settings" :params="params" />
      </div>
    </client-only>
  <TablePage :items="devices" />
</template>

<style lang="scss">
.option {
  &-button {
    background: var(--Grey-Table, #F5F5F5);
    min-width: 164px;
    border-radius: 60px;
    margin-bottom: 4px;
    cursor: pointer;
    padding: 0 16px;
    height: 44px;
    color: var(--Text-Dark, #11151C);
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 15px; /* 115.385% */

    &__chip {
      padding: 6px 8px;
      background-color: #FFFFFF;
      border-radius: 24px;
    }

    &:hover,
    &.active {
      background: var(--Light-Blue, #F0F5FF);
    }
  }
}



.el-date-picker-alt {
  background: var(--Grey-Table, #F5F5F5);
  color: black !important;
  box-shadow: none !important;
  border-radius: 20px;
  padding: 1px 0 1px 50px !important;
  max-width: 40px;

  &.active {
    max-width: 260px !important;
    padding-top: 2px !important;
    padding-bottom: 2px !important;
    padding-right: 10px !important;
    padding-left: 30px !important;
  }
}

.el-icon.el-input__icon {
  color: var(--Text-Dark, #11151C);
  font-style: normal !important;

  &.el-range__icon {
    margin-right: 20px;
  }
}
</style>
