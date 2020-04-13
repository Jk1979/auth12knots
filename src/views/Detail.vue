<template>
    <div>
        <div>
            <div class="breadcrumb-wrap">
                <router-link to="/history">History</router-link>
                <a class="breadcrumb" @click.prevent>
                    Expense
                </a>
            </div>
            <Loader v-if="loading" />
            <div class="row" v-else-if="booking">
                <div class="col s12 m6">
                    <div class="card red">
                        <div class="card-content white-text">
                            <p>Description: {{booking.description}}</p>
                            <p>Booking cost: {{ booking.amount|currency('EUR')}}</p>
                            <p>Category: {{booking.catTitle}}</p>

                            <small>{{booking.date|date('datetime')}}</small>
                        </div>
                    </div>
                </div>
            </div>
            <p class="center" v-else>No booking with such id</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Detail',
   
    data: () => ({
        loading: true,
        booking: {}
        
    }),
    async mounted(){
        const booking = await this.$store.dispatch('fetchBookingById',this.$route.params.id);
        const category = await this.$store.dispatch('fetchCategoryById',booking.category);
        booking.catTitle = category.title;
        this.booking = booking
        this.loading = false;
      
    }
}
</script>