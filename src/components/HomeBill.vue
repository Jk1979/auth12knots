<template>
  <div class="card light-blue bill-card">
    <div class="card-content white-text">
      <span class="card-title">Booking expense</span>

      <p v-for="cur of currencies" :key="cur" class="currency-line">
        <span>{{getCurrency(cur)|currency(cur) }} </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeBill',
  data: ()=> ({
    currencies: ['RUB', 'USD', 'EUR']
  }),
  props: ['rates'],
  computed : {
    bill() { return this.$store.getters.info.bill;  },
    
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.bill * this.rates[currency]);
    }
  }
}
</script>