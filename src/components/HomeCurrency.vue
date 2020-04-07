<template>
    <div class="card orange darken-3 bill-card">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title">Currency rate</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>Rate</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="cur in currencies" :key="cur">
                  <td>{{cur}}</td>
                  <td>{{rates[cur]}}</td>
                  <td>{{date | date('date')}}</td>
                </tr>
              </tbody>
            </table>
          </div>
    </div>
</template>
<script>
export default {
  name: 'HomeCurrency',
  props: ['rates','date'],
  data: ()=> ({
    currencies: ['RUB', 'USD', 'EUR']
  }),
}
</script>