<script setup>
import {computed} from "vue";
import {useCommon} from "~/composable/useCommon";
const commonApi = useCommon();


const props = defineProps({
  headers: {
    type: Array,
    default: () => []
  },
  items: {
    type: Array,
    default: () => []
  }
})

const multipleTableRef = ref();
const multipleSelection = ref([]);
const toggleSelection = rows => {
  if (rows) {
    rows.forEach(row => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      multipleTableRef.value?.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value?.clearSelection()
  }
}
const handleSelectionChange = val => {
  multipleSelection.value = val
}

const activeHeaders = computed(() => {
  return props.headers.filter(h => h.isActive);
})


const tableRowClassName = ({ row, rowIndex }) => {
  if (rowIndex % 2 === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

const tableCellClassName = ({ row, rowIndex, columnIndex }) => {
  if (!columnIndex) {
    if (row.status === 'error') {
      return 'cell-error'
    } else if (row.status === 'ok') {
      return 'cell-ok'
    } else if (row.status === 'warning') {
      return 'cell-warning'
    } else if (row.status === 'unavailable') {
      return 'cell-unavailable'
    }
    return 'cell-default'
  }
  return ''
}

const handleRowClick = (row, column, event) => {
  multipleTableRef.value?.toggleRowExpansion(row);
};

const handleEdit = (index, row) => {
  multipleTableRef.value?.toggleRowExpansion(row, false);
}

function isDate(input) {
  const date = new Date(input);

  if (isNaN(date.getTime()) || typeof input !== 'string') {
    // Если входная строка не является корректной датой или не является строкой, возвращаем ее без изменений
    return typeof input === 'string' ? input.toUpperCase() : input;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${day}.${month}.${year}`;
}
</script>

<template>
  <el-table
      ref="multipleTableRef"
      :data="items.map(item => { return { ...item, lk_date_created: item.lk_date_created.split('T')[0] }})"
      class="mt-24 full-width"
      style="border-radius: 4px 4px 0 0;"
      @selection-change="handleSelectionChange"
      header-row-class-name="header-columns cell-class-name"
      :row-class-name="tableRowClassName"
      :cell-class-name="tableCellClassName"
      @row-click="handleRowClick"
  >
    <el-table-column type="expand" class-name="ccc" width="10">
      <template #default="props">
        <div style="max-width: calc(100vw - 400px)">
          <DeviceInfo :info="props.row" @close="handleEdit(props.$index, props.row)" />
        </div>

      </template>
    </el-table-column>
    <el-table-column type="selection" width="30" />
    <el-table-column type="index" label="№" width="50" cell />

    <el-table-column
      v-for="(header, index) in activeHeaders"
      :key="index"
      :label="header.title"
      :prop="header.field"
      :min-width="header.field === 'printer_errors' ? 250 : 180"
    >
      <template
          #default="scope"
      >
        <div v-if="scope?.row[`lk_${header.field}`]?.length" class="column message-box">
          <span
              v-for="parameter in scope?.row[`lk_${header.field}`] || []"
              :key="parameter"

          >
            {{ parameter }}
          </span>
        </div>
      </template>
      <template v-if="header.containedParameters" #default="scope">
        <div
          v-for="parameter in header.containedParameters"
          :key="parameter"
        >
          {{ isDate(scope.row[parameter]) }}
        </div>
      </template>

      <template v-if="header.subColumns" #default="scope">
        <div class="row">
          <div
            v-for="column in header.subColumns"
            :key="column.id"
          >
            <template v-if="column?.containedParameters">
              <div
                  v-for="parameter_ in column.containedParameters.slice(0, 1)"
                  :key="parameter_"
                  class="column parameter"
              >
                <div class="header-columns label">
                  {{ column.title.includes('периода') ? column.title.split(' ')[0] : column.title }}
                </div>
                <div class="header-columns">
                  {{ isDate(scope.row[parameter_]) }}
                </div>
              </div>
            </template>
          </div>
        </div>

      </template>

    </el-table-column>
  </el-table>
</template>

<style lang="scss">
.el-table__header-wrapper {
  border: 1px solid #D9D9D9;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
}
.message-box {
  padding: 4px 8px;
  border-radius: 4px;
  background: #FAE6C0;
  color: #BA8E39;
  width: 200px;
}
.parameter {
  div {
    padding-right: 24px;
  }

}
.header-columns {
  color: var(--Text-Dark, #11151C);
  /* SubTitle ST */
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 115.385% */
  &.label {
    color: var(--Text-Light, #8E94A0);
  }
}
.ccc {
  max-width: 10px;
  .el-icon {
    display: none;
  }
  // border-left: 5px solid red !important;
}


.el-table .warning-row {
  --el-table-tr-bg-color: var(--Grey-Table, #F5F5F5);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}


.el-table {
  .cell {
    &-warning {
      border-left: 5px solid var(--System-Yellow, #FBBC05) !important;
    }

    &-ok {
      border-left: 5px solid var(--Main-Blue-Medium, #89ADF2) !important;
    }

    &-error {
      border-left: 5px solid #EAA6A0 !important;
    }

    &-unavailable {
      border-left: 5px solid var(--Grey-Icon, #BABABA) !important;
    }

    &-default {
      border-left: 5px solid var(--Grey-Table, #F5F5F5) !important;
    }
  }
  tr {
    height: 64px;
    cursor: pointer;
  }
}
</style>
