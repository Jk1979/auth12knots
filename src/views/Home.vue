<template>
  <div>
    <div class="page-title">
      <h3>12 knots Bookings</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
     
    </div>
    <Loader v-if="loading"/>
    <div v-else class="row">
      <div class="col s12 m6 l4">
        <HomeBill :rates="currency.rates"/>
      </div>

      <div class="col s12 m6 l8">
        <HomeCurrency :rates="currency.rates" :date="currency.date"/>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  import HomeBill from '@/components/HomeBill'
  import HomeCurrency from '@/components/HomeCurrency'

  export default {
    name: 'home',
    data: () => ({
      currency: null,
      loading: true,
    }),
    computed : {
      bill() { return this.$store.getters.info.bill;  },
    },
    components: {
        HomeBill,HomeCurrency
    },
   async mounted() {
       let cur = await this.$store.dispatch('fetchCur');
       if(cur.rates) {
         this.currency = {rates: {...cur.rates, 'EUR':1}, date: cur.date};
         
       }
      
       this.loading = false;
      
      
    },
    methods: {
      async refresh() {
        this.loading = true;
        let cur = await this.$store.dispatch('fetchCur');
        if(cur.rates) {
        
         this.currency = {rates: {...cur.rates, 'EUR':1}, date: cur.date};
       }
       this.loading = false;
      },
      // async refreshToken() {
      //   let res = await this.$store.dispatch('refresh');
      //   console.log(res);
      // },
    }
  }
</script>
<style lang="stylus" scoped>

</style>