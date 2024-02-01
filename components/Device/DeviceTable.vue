<script setup lang="ts">
defineProps({
  headers: {
    type: Array,
    default: [
      { label: '№', value: 'id' },
      { label: 'Название (Тип)', value: 'name' },
      { label: 'Парт.номер', value: 'part_number' },
      { label: 'Оставшийся ресурс', value: 'estimated_resource' },
      { label: 'Плановая замена', value: 'estimated_prt_replace_date' },
      { label: 'Склад', value: 'id' },
    ]
  },
  options: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <!--
  <table>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Название <br /> (Тип)</th>
        <th scope="col">Парт.номер</th>
        <th scope="col">Оставшийся <br /> ресурс</th>
        <th scope="col">Плановая замена</th>
        <th scope="col">Склад</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <td data-label="id">1</td>
      <td data-label="Account">Visa - 3412</td>
      <td data-label="Due Date">04/01/2016</td>
      <td data-label="Amount">$1,190</td>
      <td data-label="Period">03/01/2016 - 03/31/2016</td>
      <td data-label="Repository">----</td>
    </tr>
    <tr>
      <td data-label="id">2</td>
      <td scope="row" data-label="Account">Visa - 6076</td>
      <td data-label="Due Date">03/01/2016</td>
      <td data-label="Amount">$2,443</td>
      <td data-label="Period">02/01/2016 - 02/29/2016</td>
      <td data-label="Repository">----</td>
    </tr>
    <tr>
      <td data-label="id">3</td>
      <td scope="row" data-label="Account">Corporate AMEX</td>
      <td data-label="Due Date">03/01/2016</td>
      <td data-label="Amount">$1,181</td>
      <td data-label="Period">02/01/2016 - 02/29/2016</td>
      <td data-label="Repository">----</td>
    </tr>
    <tr>
      <td data-label="id">4</td>
      <td scope="row" data-label="Acount">Visa - 3412</td>
      <td data-label="Due Date">02/01/2016</td>
      <td data-label="Amount">$842</td>
      <td data-label="Period">01/01/2016 - 01/31/2016</td>
      <td data-label="Repository">----</td>
    </tr>
    </tbody>
  </table>
  -->
  <div class="container mt-32">
    <table class="rwd-table">
      <tbody>
      <tr>
        <th v-for="h in headers" :id="h.value">
          {{ h.label }}
        </th>
      </tr>

      <tr v-for="(option, idx) in options"  :key="`option_${option.id}`">
        <td v-for="(header, index) in headers" :key="`header_${header.value}`" :data-th="header.value">
          <div
              v-if="header.value === 'estimated_resource'"
              class="row"
          >
            <div
                class="column"
            >
              <div
                  class="row justify-between estimate-resources"
              >
                <div>
                  {{ Math.floor(option['estimated_resource'] / option['resource_pages']) }} %
                </div>
                <div>
                  {{ option['estimated_resource'] }} / {{ option['resource_pages'] }}
                </div>
              </div>

              <div class="range-container">
                <div
                    class="custom-range"
                    :style="{ width: `${option['estimated_resource'] / option['resource_pages']}%` }"
                />
              </div>
              <!-- option['estimated_resource'] / option['resource_pages'] -->
            </div>

            <div class="px-12">
              <img
                  v-if="option.source"
                  src="assets/icons/menu/dns-icon.svg"
                  alt="Иконка ДНС"
              />
              <img
                  v-else
                  src="assets/icons/menu/printer-icon.svg"
                  alt="Иконка принтера"
              />
            </div>
          </div>


          <span v-else>
            {{ !index ? idx + 1 : option[header.value] }}
          </span>

        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.estimate-resources {
  width: 130px;
  color: var(--Text-Light, #8E94A0);
  /* Main Text T2 */
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
}
/*
table {
  // width: 100%;
  // border-collapse: collapse;
  border-radius: 10px 10px 0 0;
  padding: 0;
  table-layout: fixed;
  background: rgba(168, 195, 245, 0.30);
  text-align: left;

  tbody tr:nth-child(odd) {
    background-color: #f2f2f2; // серый цвет для нечетных строк
  }

  tbody tr:nth-child(even) {
    background-color: #ffffff; // белый цвет для четных строк
  }

  tbody td:last-child {
    border-bottom: 0; // убираем полосу после последней ячейки в ряду
  }
}

table th,
table td {
  padding: 12px;
  color: var(--Text-Dark, #11151C);

  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
}
*/

.container {
  overflow: auto;
  border-radius: 4px 4px 0 0;
  border: 1px solid var(--Main-Blue-Light, #A8C3F5);

  color: var(--Text-Dark, #11151C);

  /* Main Text T2 */
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px; /* 115.385% */
}

.rwd-table {
  min-width: 300px;
  width: 100%;
  border-collapse: collapse;
}

.rwd-table tr:first-child {
  // background: #428bca;
  background: rgba(168, 195, 245, 0.30);
}

.rwd-table tr {
  border-bottom: 1px solid;
  border-color: var(--Main-Blue-Light, #A8C3F5);
  background-color: #f5f9fc;
}

.rwd-table tr:nth-child(odd):not(:first-child) {
  background-color: #ebf3f9;
}

.rwd-table th {
  display: none;
}

.rwd-table td {
  display: block;
}

.rwd-table td:first-child {
  margin-top: .5em;
}

.rwd-table td:last-child {
  margin-bottom: .5em;
}

.rwd-table td:before {
  content: attr(data-th) ": ";
  font-weight: bold;
  width: 120px;
  display: inline-block;
  color: #000;
}

.rwd-table th,
.rwd-table td {
  text-align: left;
}

.rwd-table {
  color: #333;
  overflow: hidden;
}

.rwd-table tr {
  border-color: var(--Main-Blue-Light, #A8C3F5);
}

.rwd-table th,
.rwd-table td {
  padding: .5em 1em;
}
@media screen and (max-width: 601px) {
  .rwd-table tr:nth-child(2) {
    border-top: none;
  }
}
@media screen and (min-width: 600px) {
  .rwd-table tr:hover:not(:first-child) {
    background-color: #d8e7f3;
  }
  .rwd-table td:before {
    display: none;
  }
  .rwd-table th,
  .rwd-table td {
    display: table-cell;
    padding: .25em .5em;
  }
  .rwd-table th:first-child,
  .rwd-table td:first-child {
    padding-left: 0;
  }
  .rwd-table th:last-child,
  .rwd-table td:last-child {
    padding-right: 0;
  }
  .rwd-table th,
  .rwd-table td {
    padding: 1em !important;
  }
}


/* THE END OF THE IMPORTANT STUFF */

/* Basic Styling */
body {
  background: #4B79A1;
  background: -webkit-linear-gradient(to left, #4B79A1 , #283E51);
  background: linear-gradient(to left, #4B79A1 , #283E51);
}
h1 {
  text-align: center;
  font-size: 2.4em;
  color: #f2f2f2;
}
.container {
  display: block;
  text-align: center;
}
h3 {
  display: inline-block;
  position: relative;
  text-align: center;
  font-size: 1.5em;
  color: green;
}
h3:before {
  content: "\25C0";
  position: absolute;
  left: -50px;
  -webkit-animation: leftRight 2s linear infinite;
  animation: leftRight 2s linear infinite;
}

h3:after {
  content: "\25b6";
  position: absolute;
  right: -50px;
  -webkit-animation: leftRight 2s linear infinite reverse;
  animation: leftRight 2s linear infinite reverse;
}

@-webkit-keyframes leftRight {
  0%    { -webkit-transform: translateX(0)}
  25%   { -webkit-transform: translateX(-10px)}
  75%   { -webkit-transform: translateX(10px)}
  100%  { -webkit-transform: translateX(0)}
}
@keyframes leftRight {
  0%    { transform: translateX(0)}
  25%   { transform: translateX(-10px)}
  75%   { transform: translateX(10px)}
  100%  { transform: translateX(0)}
}

/*
    Don't look at this last part. It's unnecessary. I was just playing with pixel gradients... Don't judge.
*/
/*
@media screen and (max-width: 601px) {
  .rwd-table tr {
    background-image: -webkit-linear-gradient(left, #428bca 137px, #f5f9fc 1px, #f5f9fc 100%);
    background-image: -moz-linear-gradient(left, #428bca 137px, #f5f9fc 1px, #f5f9fc 100%);
    background-image: -o-linear-gradient(left, #428bca 137px, #f5f9fc 1px, #f5f9fc 100%);
    background-image: -ms-linear-gradient(left, #428bca 137px, #f5f9fc 1px, #f5f9fc 100%);
    background-image: linear-gradient(left, #428bca 137px, #f5f9fc 1px, #f5f9fc 100%);
  }
  .rwd-table tr:nth-child(odd) {
    background-image: -webkit-linear-gradient(left, #428bca 137px, #ebf3f9 1px, #ebf3f9 100%);
    background-image: -moz-linear-gradient(left, #428bca 137px, #ebf3f9 1px, #ebf3f9 100%);
    background-image: -o-linear-gradient(left, #428bca 137px, #ebf3f9 1px, #ebf3f9 100%);
    background-image: -ms-linear-gradient(left, #428bca 137px, #ebf3f9 1px, #ebf3f9 100%);
    background-image: linear-gradient(left, #428bca 137px, #ebf3f9 1px, #ebf3f9 100%);
  }
}*/

.range-container {
  position: relative;
  width: 100%;
  height: 2px;
  background-color: #D9D9D9;
  margin-top: 10px;
}

.custom-range {
  background-color: #4285F4;
  height: 100%;
}
</style>
