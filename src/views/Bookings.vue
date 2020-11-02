<template>
    <div>
         <div class="page-title">
            <h3>Bookings</h3>
        </div>

        
        <Loader v-if="loading" />
        <p class="center" v-else-if="!items.length">No bookings yet <router-link to="/addbooking">Add new booking</router-link></p>
        <BookingsList v-else :bookings="items"/> 
        <Paginate
            v-model="page"
            :page-count="pageCount"
            :click-handler="pageHandlerNew"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'waves-effect'"
            />

    </div>
</template>
<script>
import BookingsList from '@/components/BookingsList'
import paginationMixin from '@/mixins/pagination.mixin.js'
// import { mapActions } from 'vuex'


export default {
    name: 'bookings',
    components: { BookingsList},
  
    mixins: [paginationMixin],
    data: () => ({
        bookings: [],
        loading: true,
        queryData: {
            page: 1
        },
    }),
    methods: {
       
       async getBookings(page) {
            this.loading = true;
            // const queryData = new URLSearchParams();
            // queryData.append('page', page);
            this.queryData.page = page;
            try {
                this.bookings = await this.$store.dispatch('fetchOrders',this.queryData);
                if(typeof this.bookings !== 'undefined') {
                    this.items = this.bookings.data;
                    this.pageCount = this.bookings.last_page;
                    this.loading = false;
                }
            }
            catch(err) {
                console.log(err);
            }            
            
       }, 
       pageHandlerNew(page) {
            // this.loading = true;
            this.$router.push(`${this.$route.path}?page=${page}`);
            this.getBookings(page);

        }
    },
    mounted(){
        
      
        try {
            // this.bookings = await this.$store.dispatch('fetchOrders',queryData);
            this.getBookings();
        } catch( err ) {
            console.log(err);
        }
        // this.categories = await this.$store.dispatch('fetchCategories');
        // this.setupPagination(this.bookings.map(it => {
        //     it.category = this.categories.filter(ct => ct.id === it.category);
        //     if(it.category) it.category = it.category[0];
        //     return it;
        // }));
   
       
       
    }
   
}
</script>
