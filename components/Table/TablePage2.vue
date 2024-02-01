<template>
  <div class="be-content">
    <div class="main-content container-fluid">
      <div
          ref="cardTable"
          class="card card-table mb-0"
      >
        <table
            ref="devicesTable"
            class="table"
        >
          <thead>
          <tr>
            <!-- for first column-->
            <th
                colspan="1"
                style="width: 53px"
            />

            <!---
            Колонки первого уровня
            <th
                v-for="col in columns"
                v-show="col.isActive"
                :key="col.id"
                :class="{ 'text-center' : (col.subColumns && col.subColumns.length)}"
                :colspan="(col.subColumns && col.subColumns.length)? col.subColumns.length : 1"
                :style="col.style"
            >
                <span v-if="col.subColumns && col.subColumns.length">
                  {{ col.title }}
                </span>
            </th>
            -->
          </tr>
          <tr>
            <th
                class="sorter text-left"
                title="Сбросить сортировку"
            >
              #
            </th>

            <template>
              <th
                  v-for="col in columns"
                  v-show="col.isActive && !col.subColumns"
                  :key="col.field"
                  :style="col.style"
                  :class="{'sorter' : col.isSorted, 'number': col.isNumber}"
                  title="Сортировать"
              >
                <div :class="['th-content', {'centered': centeredColumns.includes(col.field)}]">
                  {{ col.title }}
                  <i
                      :class="['mdi sort-icon ml-2']"
                      :title="'sortTitle'"
                  />
                </div>
              </th>
            </template>
          </tr>
          </thead>


          <DeviceRow
              v-for="(p, i) in devices"
              :key="i + '-' + p.id"
              :item="p"
              :index="i"
              :columns="columns"
          />

        </table>
      </div>
    </div>
  </div>
</template>

<script>
import DeviceRow from './DeviceRow.vue';

export default {
  name: 'DeviceList',
  components: {
    DeviceRow,
  },
  props: {
    devices: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShowModalTableColumns: false,
      excelFetching: false,
      isInited: false,
      centeredColumns: [
        'clmn_is_legal',
        'clmn_color',
      ],
    };
  },
  computed: {
    columns() {
      return [
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
      ];
    },

  },

  methods: {
    columnParameter(columnName) {
      if (!columnName) return '';
      for (const clmn of this.columns) {
        if (clmn.field === columnName && clmn.containedParameters) {
          return clmn.containedParameters[0];
        }
        if (clmn.subColumns) {
          for (const sclmn of clmn.subColumns) {
            if (sclmn.field === columnName && sclmn.containedParameters) {
              return sclmn.containedParameters[0];
            }
          }
        }
      }
      return '';
    }
  },

};
</script>

<style scoped>
.table thead th {
  vertical-align: middle;
  border-bottom: 1px solid #dee2e6;
}
th {
  background: white;
}
/*  thead {
    top: 61px;
    position: sticky;
  }*/
.card-table{
  overflow-y: hidden;
}
/*
th:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-bottom: 1px solid #dee2e6;
}

 */
.table-with-params {
  table-layout: fixed;
  width: 1600px;
}
table {
  border-collapse: separate;
  border-spacing: 0;
}
.sort-icon {
  color: royalblue;
  font-size: 18px;
}
.th-content {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  text-wrap: balance;
  overflow-wrap: normal;
}
.centered {
  justify-content: center;
}
.sorter:hover {
  background: #fbfbfb;
}
.number {
  text-align: left;
}

</style>
