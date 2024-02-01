<script setup>
import SearchPage from "~/components/Table/SearchPage";
import { h, ref, shallowRef } from "vue";
import {useDevices} from "~/composable/useDevices";
import {useLocations} from "~/composable/useLocations";
import CloseIcon from "~/components/UI/icons/CloseIcon.vue";
import Settings from "~/components/Device/Settings.vue";
import {useCommon} from "~/composable/useCommon";
import {ElNotification} from "element-plus";
import {Check} from "@element-plus/icons-vue";
const commonApi = useCommon();

definePageMeta({
  // middleware: ["user-only"]
});

const settings = ref([]);
const getSettings = async () => {
  const response = await commonApi.getSettings('printers');
  settings.value = response?.settings?.columns || [];

  const defaultSettings = [
    {
      id: 1,
      field: "clmn_name_default",
      order: 0,
      width: 350,
      containedParameters: ["name", "serial"],
      isActive: true,
      isSorted: true,
      title: "Модель"
    },
    {
      id: 2,
      field: "clmn_location",
      order: 1,
      title: "Локация",
      isActive: true,
      isSorted: true,
      containedParameters: ["location_name", "ip_address"],
    },
    {
      id: 3,
      field: "clmn_main_counter",
      order: 2,
      width: 260,
      title: "Счетчик",
      isActive: true,
      subColumns: [
        {
          id: 7,
          field: "clmn_start_pg_tl",
          title: "Начало периода",
          isNumber: true,
          isSorted: true,
          containedParameters: ["count_page_total__on_start", "count_page_color__on_start"]
        },
        {
          id: 8,
          field: "clmn_finish_pg_tl",
          title: "Конец периода",
          isNumber: true,
          isSorted: true,
          containedParameters: ["count_page_total__on_end", "count_page_color__on_end"],
        }
      ]
    },
    {
      id: 4,
      field: "clmn_main_print",
      order: 3,
      width: 300,
      isActive: true,
      title: "Объем печати",

      subColumns: [
        {
          id: 9,
          field: "clmn_delta_pg_bl",
          title: "ЧБ",
          isNumber: true,
          isSorted: true,
          containedParameters: ["count_page_black__on_period"]
        },
        {
          id: 10,
          field: "clmn_delta_pg_cl",
          title: "ЦВ",
          isNumber: true,
          isSorted: true,
          containedParameters: ["count_page_color__on_period"]
        },
        {
          id: 11,
          field: "clmn_delta_pg_tl",
          title: "Всего",
          isNumber: true,
          isSorted: true,
          containedParameters: ["count_page_total__on_period"]
        }
      ]
    },
    {
      id: 5,
      field: "clmn_main_cost",
      order: 4,
      width: 330,
      title: "Стоимость",
      isActive: true,

      subColumns: [
        {
          id: 12,
          field: "clmn_sum_bl",
          title: "ЧБ",
          isNumber: true,
          isSorted: true,
          containedParameters: ["black_cost__on_period"]
        },
        {
          id: 13,
          field: "clmn_sum_cl",
          title: "ЦВ",
          isNumber: true,
          isSorted: true,
          containedParameters: ["color_cost__on_period"]
        },
        {
          id: 14,
          field: "clmn_sum_tl",
          title: "Всего",
          isNumber: true,
          isSorted: true,
          containedParameters: ["full_cost__on_period"]
        }
      ]
    },
    {
      id: 6,
      field: "clmn_dt",
      order: 5,
      width: 100,
      title: "Дата",
      isActive: true,
      containedParameters: ["date_updated", "interface"]
    }
  ]

  // Пройдемся по defaultSettings и обновим settings.value
  defaultSettings.reverse().forEach((defaultSetting) => {
    const existingSetting = settings.value.find((setting) => setting.field === defaultSetting.field);

    if (!existingSetting) {
      // Если объект с полем field не найден, добавляем его в начало массива
      settings.value.unshift(defaultSetting);
    }
  });

  await getDevices();
}

const updateSettings = async () => {
  commonApi.setParams({
    lk_section_name: "printers",
    section_settings: {
      columns: settings?.value || []
    }
  })

  ElNotification({
    message: 'Настройки сохранены',
    icon: Check,
    customClass: 'success',
    offset: 20,
    duration: 6500
  })

  getDevices()
}

const addParam = async value => {
  settings.value.push(value);
}

getSettings();


const otherFilters = ref([]);
const optionsLocation = ref([]);

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
  getDevices()
  /*
  debounce(() => {
    // const query = searchValue.value.toLowerCase();
    getDevices()
    // searchResults.value = searchResults.value.filter(item => item.name.toLowerCase().includes(query));
  }, 1500);
  */
});

watch(() => dateValues.value, () => {;
  getDevices();
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


const settingsToQuery = (settings, query) => {
  settings.forEach(option => {

    if (option?.subColumns?.length) {
      settingsToQuery(option.subColumns, query);
    } else if (option?.containedParameters?.length) {
      for (const parameter of option?.containedParameters) {
        query[parameter] = null;
      }
    } else if (option?.field && !['printed_without_copy', 'printer_errors', 'two_color_copy'].includes(option.field)) {
      query[option.field] = null;
    }
  })

  return query;
}


const getDevices = async (isDownload = false) => {
  let query = {
    query: searchValue.value.trim(),
    statuses: optionsStatus.value.filter(item => item.value).map(item => item.id).join(','),
    location: optionsLocation.value[0]?.children?.filter(item => item.value)?.map(item => item.id)?.[0] || null,
    date_start: formatDate(dateValues?.value?.[0]),
    date_end: formatDate(dateValues?.value?.[1])
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
  const v = settings.value.filter(setting => setting.isActive);
  query = await settingsToQuery(v, query);

  /*
  settings.value.forEach(option => {
    console.log('OPTION', option);
    if (option.isActive) {
      if (option?.subColumns?.length) {
        option?.subColumns.forEach(option_1 => {
          console.log('OPTION 1', option_1);
            if (option_1?.subColumns?.length) {
              option_1.subColumns.forEach(option_2 => {
                console.log('OPTION 2', option_2);
                  if (option_2?.subColumns?.length) {
                    query = settingsToQuery(option_2.subColumns, query);
                  } else if (option_2?.containedParameters?.length) {
                    for (const parameter of option_2?.containedParameters) {
                      console.log("PARAMETER 2", parameter)
                      query[parameter] = null;
                    }
                  } else if (option_2?.field && !['printed_without_copy', 'printer_errors', 'two_color_copy'].includes(option_2.field)) {
                    query[option_2.field] = null;
                  }

              })
            } else if (option_1?.containedParameters?.length) {
              for (const parameter of option_1?.containedParameters) {
                console.log("PARAMETER 1", parameter)
                query[parameter] = null;
              }
            } else if (option_1?.field && !['printed_without_copy', 'printer_errors', 'two_color_copy'].includes(option_1.field)) {
              query[option_1.field] = null;
            }
        })
      } else if (option?.containedParameters?.length) {
        for (const parameter of option?.containedParameters) {
          console.log("PARAMETER", parameter)
          query[parameter] = null;
        }
      } else if (option?.field && !['printed_without_copy', 'printer_errors', 'two_color_copy'].includes(option.field)) {
        query[option.field] = null;
      }
    }
  })
  console.log('qqq', query);

   */

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

  const sts = {
    ok: 2,
    warning: 4,
    unavailable: 6,
    error: 5,
  }

  optionsStatus.value = Object.keys(sts).map(key => {
    const info = infoStatuses[key];
    const id = sts[key];
    const label = key;
    const value = false;
    const type = 'checkbox';

    return { ...info, id, label, value, type };
  });
}

getStatuses();

const locationsApi = useLocations();

function addFieldsRecursive(array) {
  return array.map(item => {
    const newItem = { ...item, value: false, type: 'checkbox' };

    if (newItem.children && newItem.children.length > 0) {
      newItem.children = addFieldsRecursive(newItem.children);
    }

    return newItem;
  });
}

const getLocations = async () => {
  const { locations } = await locationsApi.getLocations();

  optionsLocation.value = addFieldsRecursive(locations.children);
}

getLocations();

const checkOptionLocation = item => {
  let updateOption = optionsLocation.value.find(option => option === item);

  if (!updateOption) {
    optionsLocation.value.forEach(location => {
      const found = location.children?.find(option => option === item);
      if (found) {
        updateOption = found;
        updateOption.value = !updateOption.value;

        location.value = !location.children?.some(option => option.value === false);
      }
    })
  } else {
    updateOption.value = !updateOption.value;
    item?.children?.forEach(child => {
      child.value = updateOption.value
    })
  }


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

  <UITabs :active-tab="'Все'" class="mt-24" />

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
              class="el-date-picker-alt"
              :class="{ active: dateValues }"
              :day-of-week="1"
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

        <Settings
            :parameters="settings"
            @update-settings="updateSettings"
            @add-param="addParam"
            @get-settings="getSettings"
        />
      </div>
    </client-only>

    <TablePage :items="devices" :headers="settings" />
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
