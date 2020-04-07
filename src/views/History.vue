<template>
    <div>
        <Loader v-if="loading" />
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
    this.bookings = await this.$store.dispatch('fetchBookings');
    this.categories = await this.$store.dispatch('fetchCategories');
    this.bookings = this.bookings.map(it => {
        it.category = this.categories.filter(ct => ct.id === it.category);
        if(it.category) it.category = it.category[0];
        return it;
    })
    this.loading = false;
       //console.log(this.bookings); 
    }
}
</script>