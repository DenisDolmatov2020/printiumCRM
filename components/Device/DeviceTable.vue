<script setup lang="ts">

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
        <th>№</th>
        <th>Название <br /> (Тип)</th>
        <th>Парт.номер</th>
        <th>Оставшийся <br /> ресурс</th>
        <th>Плановая <br /> замена</th>
        <th>Склад</th>
      </tr>
      <tr>
        <td data-th="Supplier Code">
          1
        </td>
        <td data-th="Supplier Name">
          UPS
        </td>
        <td data-th="Invoice Number">
          ASDF19218
        </td>
        <td data-th="Invoice Date">
          06/25/2016
        </td>
        <td data-th="Due Date">
          12/25/2016
        </td>
        <td data-th="Net Amount">
          $8,322.12
        </td>
      </tr>
      <tr>
        <td data-th="Supplier Code">
          2
        </td>
        <td data-th="Supplier Name">
          UPS South Inc.
        </td>
        <td data-th="Invoice Number">
          ASDF29301
        </td>
        <td data-th="Invoice Date">
          6/24/2016
        </td>
        <td data-th="Due Date">
          12/25/2016
        </td>
        <td data-th="Net Amount">
          $3,255.49
        </td>
      </tr>
      <tr>
        <td data-th="Supplier Code">
          BOX5599
        </td>
        <td data-th="Supplier Name">
          BOX Pro West
        </td>
        <td data-th="Invoice Number">
          ASDF43000
        </td>
        <td data-th="Invoice Date">
          6/27/2016
        </td>
        <td data-th="Due Date">
          12/25/2016
        </td>
        <td data-th="Net Amount">
          $45,255.49
        </td>
      </tr>
      <tr>
        <td data-th="Supplier Code">
          PAN9999
        </td>
        <td data-th="Supplier Name">
          Pan Providers and Co.
        </td>
        <td data-th="Invoice Number">
          ASDF33433
        </td>
        <td data-th="Invoice Date">
          6/29/2016
        </td>
        <td data-th="Due Date">
          12/25/2016
        </td>
        <td data-th="Net Amount">
          $12,335.69
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
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
}

.rwd-table {
  min-width: 300px;
  max-width: 100%;
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
</style>
