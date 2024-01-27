<script setup>
import SearchPage from "~/components/Table/SearchPage";
import { h, ref, shallowRef } from "vue";
import {useDevices} from "~/composable/useDevices";
import CloseIcon from "~/components/UI/icons/CloseIcon.vue";
import Settings from "~/components/Device/Settings.vue";
import {useLocations} from "~/composable/useLocations";

definePageMeta({
  // middleware: ["user-only"]
});

const searchValue = ref('');

const debounce = (callback, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const handleSearch = debounce(() => {
  // const query = searchValue.value.toLowerCase();
  getDevices()
  // searchResults.value = searchResults.value.filter(item => item.name.toLowerCase().includes(query));
}, 1500); // Задержка в миллисекундах

watch(() => searchValue.value, () => {
  console.log('WATCH for search')
  handleSearch();
});


// DATE
const customPrefix = shallowRef({
  render() {
    return h("span", "Период");
  }
})

const dateValues = ref(null)
const defaultTime = ref([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
])

// DATE END

const devices = ref([])
const devicesApi = useDevices();

const getDevices = async () => {
  const { result } = await devicesApi.getDevices({ search: searchValue.value });
  devices.value = result;
}

getDevices();

const optionsStatus = ref([

])

const infoStatuses = {
  ok: {name: 'Исправны', value: false, type: 'checkbox', color: 'blue-medium'},
  warning: {name: 'Требуют внимания', value: false, type: 'checkbox', color: 'warning'},
  error: {name: 'Неисправны', value: false, type: 'checkbox', color: 'error'},
  unavailable: {name: 'Нет данных', value: false, type: 'checkbox', color: 'grey'}
}


const checkOptionStatus = item => {
  const updateOption = optionsStatus.value.find(option => option === item)
  updateOption.value = !updateOption.value
}

const getStatuses = async () => {
  const response = await devicesApi.getStatuses();
  console.log('RES STATUS', response?.d?.statuses);
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
  console.log('RESuy', locations);
  optionsLocation.value = locations.children.map(location => { return { ...location, value: false, type: 'checkbox' }});
}

getLocations();

const checkOptionLocation = item => {
  const updateOption = optionsLocation.value.find(option => option === item);
  updateOption.value = !updateOption.value;

  getDevices()
}
</script>

<template>
  <UIPageTitle title="Устройства" />

  <UITabs class="mt-24" />

    <SearchPage v-model="searchValue" />

    <client-only>
      <div class="mt-24 row nowrap justify-between">
        <el-row class="gap-8">
          <div>
            <el-date-picker
                v-model="dateValues"
                size="large"
                :prefix-icon="customPrefix"
                :clear-icon="CloseIcon"
                type="daterange"
                start-placeholder=""
                end-placeholder=""
                :default-time="defaultTime"
                class="el-date-picker-alt"
                style="
                max-width: 250px;
                background: #F5F5F5;
                color: black !important;
                box-shadow: none;
                border-radius: 20px;
                padding: 1px 10px 1px 35px !important;"
            >

            </el-date-picker>
          </div>



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

        </el-row>

        <Settings />
      </div>
    </client-only>
  <TablePage :items="devices" />
</template>

<style lang="scss">
.el-input {
  .el-date-picker-alt {
    background: var(--Grey-Table, #F5F5F5);
    color: black !important;
    box-shadow: none;
    border-radius: 20px;
    padding: 1px 10px 1px 35px !important;
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
