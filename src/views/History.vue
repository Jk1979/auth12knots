<template>
    <div>
         <div class="page-title">
            <h3>Booking history</h3>
        </div>

        <div v-if="chartData" class="history-chart">
            <pie-chart :chart-data="chartData" :options="chartOptions"></pie-chart>
        </div>
        <Loader v-if="loading" />
        <p class="center" v-else-if="!bookings.length">No bookings yet <router-link to="/addbooking">Add new booking</router-link></p>
        <BookingsHistory v-else :bookings="items"/>
        <Paginate
            v-model="page"
            :page-count="pageCount"
            :click-handler="pageHandler"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'waves-effect'"
            />

         
        
    </div>
</template>
<script>
import BookingsHistory from '@/components/BookingHistory'
import paginationMixin from '@/mixins/pagination.mixin.js'
import  PieChart from '@/components/PieChart'


export default {
    name: 'history',
    components: { BookingsHistory, PieChart},
    mixins: [paginationMixin],
    data: () => ({
        bookings: [],
        loading: true,
        chartData: null,
        categories: [],
        chartOptions:{
                        responsive: true,
                        maintainAspectRatio: false
                    }
    }),
    async mounted(){
        this.bookings = await this.$store.dispatch('fetchBookings');
        this.categories = await this.$store.dispatch('fetchCategories');
        this.setupPagination(this.bookings.map(it => {
            it.category = this.categories.filter(ct => ct.id === it.category);
            if(it.category) it.category = it.category[0];
            return it;
        }));
   
        this.loading = false;
        this.setupChart();
    },
    methods: {
        setupChart() {
            this.chartData = {
                    labels: this.categories.map(cat => cat.title),
                    datasets: [{
                        label: 'Expences by category',
                        data: this.categories.map(c => {
                            return this.bookings.reduce((total,book)=> { 
                                if(book.category.id === c.id) {
                                    total+= +book.amount
                                }
                                console.log(book);
                                return total;
                            },0)
                        }),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            // 'rgba(255, 206, 86, 0.2)',
                            // 'rgba(75, 192, 192, 0.2)',
                            // 'rgba(153, 102, 255, 0.2)',
                            // 'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            // 'rgba(255, 206, 86, 1)',
                            // 'rgba(75, 192, 192, 1)',
                            // 'rgba(153, 102, 255, 1)',
                            // 'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }
           
        }
    }
}
</script>