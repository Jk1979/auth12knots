<template>
    <div>
         <div class="page-title">
            <h3>Booking history</h3>
        </div>

        <div class="history-chart">
            <canvas></canvas>
        </div>
        <Loader v-if="loading" />
        <p class="center" v-else-if="!bookings.length">No bookings yet <router-link to="/addbooking">Add new booking</router-link></p>
        <BookingsHistory v-else :bookings="bookings"/>
    </div>
</template>
<script>
import BookingsHistory from '@/components/BookingHistory'

export default {
    name: 'history',
    components: { BookingsHistory},
    data: () => ({
        bookings: [],
        categories: [],
        loading: true
    }),
    async mounted(){
    const bookings = await this.$store.dispatch('fetchBookings');
    this.categories = await this.$store.dispatch('fetchCategories');
    this.bookings = bookings.map(it => {
        it.category = this.categories.filter(ct => ct.id === it.category);
        if(it.category) it.category = it.category[0];
        return it;
    })
   
    this.loading = false;
       //console.log(this.bookings); 
    }
}
</script>