<template>
    
    <div class="app-main-layout">

      <Navbar @click="isOpen = !isOpen" />
      <Sidebar v-model="isOpen" :key="locale"/>

      <Loader v-if="loading"/>
      <main   v-else class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>

      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/addbooking">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
</template>   

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import messages from '@/utils/messages'

export default {
  data: ()=> (
    {
      isOpen: true,
      loading: true
    }
  ),
  async mounted() {
      if(!Object.keys(this.$store.getters.info).length ) {
          await this.$store.dispatch('fetchInfo');
      }
      this.loading = false;
  },
  components: {
    Navbar,Sidebar
  },
  computed: {
      error() {
          return  this.$store.getters.error
      },
      locale() {
        return this.$store.getters.info.locale
      }
  },
  watch: {
    
      error(fbError) {
          this.$error(messages[fbError.code] || 'Service temporary unavailable')     
      }
  }
  
}
</script>