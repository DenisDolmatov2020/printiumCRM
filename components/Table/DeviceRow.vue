<template>
  <tbody :id="`id-device-${item.lk_inv_printer_id}`">
    <tr>
      <!-- Индекс # -->
      <td
        :class="indicatorClass"
        @click="partsVisible = !partsVisible"
      >
        {{ index + 1 }}
      </td>

      <!-- Модель -->
      <template v-for="col in columns">
        <!-- Здесь привязка идет по col.id для тех полей, у которых нет col.subColumns -->
        <td
          v-if="!col.subColumns && col.isActive"
          :key="col.field + col.id + '1'"
          :class="['cell-detail', {
            'status': col.field === 'clmn_dt',
          }]"
        >
          <template v-if="col.field === 'clmn_name_default' && col.isActive">
            <div style="display: flex">
              <div
                v-if="['lan', 'usb'].includes(item.interface)"
                class="am-icon am-cursor toggle-device pl-0 pr-2 pt-0 d-flex flex-align-item-center"
                @click="partsVisible = !partsVisible"
              >
                <span
                  v-if="partsVisible"
                  class="mdi mdi-chevron-up"
                />
                <span
                  v-else
                  class="mdi mdi-chevron-down"
                />
              </div>

              <div class="model-name-sn">
                <span class="font-weight-bold">{{ item.name }}</span>
                <span
                  v-if="item.lk_comment"
                  class="cell-detail-description"
                >{{ item.lk_comment }}</span>
                <span class="cell-detail-description">sn: {{ item.serial }}</span>
              </div>

            </div>
          </template>
          <template v-else-if="col.field === 'clmn_location' && col.isActive">
            <span>{{ item.location_name }}</span>
            <span class="cell-detail-description">
              ip:
              <span
                class="ip-opener"
                :title="`Открыть http://${item.ip_address}`"
                @click="openIP(item.ip_address)"
              >
                {{ item.ip_address }}
              </span>
            </span>
          </template>
          <template v-else-if="col.field === 'clmn_dt' && col.isActive">
            {{ item.date_updated | DATE }}
            <br>
            {{ item.interface }}
          </template>
          <template v-else-if="col.field === 'clmn_inventory_number' && col.isActive">
1234234
          </template>
          <template v-else-if="col.isActive">
            <span
              v-if="item[col.field.replace('clmn_', '')] === true"
              class="mdi mdi-check-circle text-center"
            />
            <span
              v-else-if="item[col.field.replace('clmn_', '')] === false"
              class="mdi mdi-close-circle text-center"
            />
            <span
              v-else
              :class="{'long-word-break': longWordFields.includes(col.field)}"
            >
              {{ item[col.field.replace('clmn_', '')] }}
            </span>
          </template>
        </td>

        <!-- Для тех полей, которые имеют подклонки-->
        <template v-if="col.subColumns && col.subColumns.length && col.isActive">
          <!-- Начало периода -->
          <template v-if="col.field ==='clmn_main_counter' && col.isActive">
            <td
              :key="col.field + col.id + '2'"
              class="cell-detail"
            >
              <span
                v-if="isActualDateInFilterRange(true)"
                class="actual-date"
              >
                {{ item.date_start }}
              </span>
              {{ item.count_page_total__on_start }}
              <span
                v-if="item.count_page_color__on_start !== null"
                class="cell-detail-description"
              >
                цветной: {{ item.count_page_color__on_start }}
              </span>
            </td>

            <!-- Конец периода-->
            <td
              :key="col.field + col.id + '3'"
              class="cell-detail"
            >
              <span
                v-if="isActualDateInFilterRange(false)"
                class="actual-date"
              >
                {{ item.date_end }}
              </span>
              {{ item.count_page_total__on_end }}
              <span
                v-if="item.count_page_color__on_end !== null"
                class="cell-detail-description"
              >
                цветной: {{ item.count_page_color__on_end }}
              </span>
            </td>
          </template>

          <!-- Напечатано -->
          <template v-if="col.field === 'clmn_main_print' && col.isActive">
            <td
              :key="col.field + col.id + '4'"
            >
              {{ item.count_page_black__on_period }}
            </td>
            <td
              :key="col.field + col.id + '5'"
            >
              {{ item.count_page_color__on_period }}
            </td>
            <td
              :key="col.field + col.id + '6'"
            >
              {{ item.count_page_total__on_period }}
            </td>
          </template>

          <!-- Стоимость -->
          <template v-if="col.field === 'clmn_main_cost' && col.isActive">
            <td
              :key="col.field + col.id + '7'"
            >
              {{ item.black_cost__on_period }}
            </td>
            <td
              :key="col.field + col.id + '8'"
            >
              {{ item.color_cost__on_period }}
            </td>
            <td
              :key="col.field + col.id + '9'"
            >
              {{ item.full_cost__on_period }}
            </td>
          </template>
        </template>
      </template>
    </tr>
    <tr v-if="partsVisible">
      <td :colspan="activeColumns">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a
              :class="['nav-link', { active: tab === 'PrnParts' }]"
              @click="tab='PrnParts'"
            >Детали</a>
          </li>
          <li
            v-if="item.interface === 'lan'"
            class="nav-item"
          >
            <a
              :class="['nav-link', { active: tab === 'PrnParameters' }]"
              @click="tab='PrnParameters'"
            >Параметры</a>
          </li>
        </ul>
        <component
          :is="tab"
          :item="item"
        />
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'DeviceRow',

  props: {
    item: { type: Object, default: () => ({}) },
    index: { type: Number, default: 0 },
    columns: { type: Array, default: () => [] },
  },
  data() {
    return {
      tab: 'PrnParts',
      columnsMap: {},
      testIndex: '',
      longWordFields: [
        'clmn_sys_object_id',
      ],
      partsVisible: false,

      activeColumns: [
        {
          isActive: true,
          field: 'clmn_name_default',
          title: 'Модель',
          style: 'padding-left: 36px; width: 350px',
          isSorted: true,
          id: 1,
          containedParameters: [
            'name',
            'serial',
          ],
        },
        {
          isActive: true,
          field: 'clmn_location',
          title: 'Локация',
          isSorted: true,
          id: 2,
          containedParameters: [
            'location_name',
            'ip_address',
          ],
        },
        {
          title: 'Счетчик',
          field: 'clmn_main_counter',
          isActive: true,
          style: 'width: 260px',
          id: 3,
          subColumns: [
            {
              field: 'clmn_start_pg_tl',
              title: 'Начало периода',
              isNumber: true,
              isSorted: true,
              id: 7,
              containedParameters: [
                'count_page_total__on_start',
                'count_page_color__on_start',
              ],
            },
            {
              field: 'clmn_finish_pg_tl',
              title: 'Конец периода',
              isNumber: true,
              isSorted: true,
              id: 8,
              containedParameters: [
                'count_page_total__on_end',
                'count_page_color__on_end',
              ],
            },
          ],
        },
        {
          title: 'Объем печати',
          field: 'clmn_main_print',
          id: 4,
          isActive: true,
          style: 'width: 300px',
          subColumns: [
            {
              field: 'clmn_delta_pg_bl',
              title: 'ЧБ',
              isNumber: true,
              isSorted: true,
              id: 9,
              containedParameters: [
                'count_page_black__on_period',
              ],
            },
            {
              field: 'clmn_delta_pg_cl',
              title: 'ЦВ',
              isNumber: true,
              isSorted: true,
              id: 10,
              containedParameters: [
                'count_page_color__on_period',
              ],
            },
            {
              field: 'clmn_delta_pg_tl',
              title: 'Всего',
              isNumber: true,
              isSorted: true,
              id: 11,
              containedParameters: [
                'count_page_total__on_period',
              ],
            },
          ],
        },
        {
          title: 'Стоимость',
          field: 'clmn_main_cost',
          id: 5,
          isActive: true,
          style: 'width: 330px',
          subColumns: [
            {
              field: 'clmn_sum_bl',
              title: 'ЧБ',
              isNumber: true,
              isSorted: true,
              id: 12,
              containedParameters: [
                'black_cost__on_period',
              ],
            },
            {
              field: 'clmn_sum_cl',
              title: 'ЦВ',
              isNumber: true,
              isSorted: true,
              id: 13,
              containedParameters: [
                'color_cost__on_period',
              ],
            },
            {
              field: 'clmn_sum_tl',
              title: 'Всего',
              isNumber: true,
              isSorted: true,
              id: 14,
              containedParameters: [
                'full_cost__on_period',
              ],
            },
          ],
        },
        {
          isActive: true,
          field: 'clmn_dt',
          title: 'Дата',
          isNumber: true,
          isSorted: true,
          id: 6,
          style: 'width: 100px',
          containedParameters: [
            'date_updated',
            'interface',
          ],
        },
      ]
    };
  },
  computed: {
    indicatorClass() {
      let color = '';
      switch (this.item.lk_overall_status.value) {
        case 'ok':
          color = 'blue';
          break;
        case 'warning':
          color = 'yellow';
          break;
        case 'unavailable':
          color = 'grey';
          break;
        default:
          color = 'red';
      }
      return [
        'number',
        'am-cursor',
        'status-indicator',
        `status-indicator__${color}`,
      ];
    }
  },
  created() {
    this.testIndex = this.index;
  },

  methods: {
    isActualDateInFilterRange(isStart) {
      if (isStart && !this.item.date_start) {
        return false;
      }
      if (!isStart && !this.item.date_end) {
        return false;
      }
      let actualDate;
      if (isStart) {
        actualDate = new Date(this.item.date_start.slice(0, 10));
      } else {
        actualDate = new Date(this.item.date_end.slice(0, 10));
      }
      let filterDate;

      return isStart ? actualDate > filterDate : actualDate < filterDate;
    },

    openIP(ip) {
      window.open(`http://${ip}`, '_blank', 'noopener,noreferrer');
    },
  },

};
</script>

<style scoped>
  a{
    cursor: pointer;
  }
  .status-indicator {
    position: relative;
  }
  .status-indicator:before {
    content: "";
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 6px;
  }
  .status-indicator__grey:before {
    background: #979797;
  }

  .status-indicator__blue:before {
    background: #206ff2;
  }

  .status-indicator__yellow:before {
    background: #fbbc05;
  }

  .status-indicator__red:before {
    background: #e42718;
  }

  .am-cursor {
    cursor: pointer;
  }
  .status {
    font-size: 11px;
    color: #a7a7a7;
  }
  .actual-date {
    color: red;
  }
  .toggle-device:hover {
    color: dodgerblue;
  }
  .toggle-device {
    display: inline-block;
    padding-top: 10px;
    margin-right: 10px;
    font-size: 18px;
  }
  .nav-tabs {
    max-width: 1400px;
  }
  .model-name-sn {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
  }
  .ip-opener {
    display: inline-block !important;
    border-bottom: 1px dotted #999999;
    cursor: pointer;
  }
  .ip-opener:hover {
    color: dodgerblue;
    border-bottom: 1px dotted dodgerblue;
  }
  .mdi-close-circle {
    color: #EB5757;
  }
  .mdi-check-circle {
    color: #70bf2b
  }
  .long-word-break {
    max-width: 160px;
    overflow-wrap: break-word;
  }
</style>
