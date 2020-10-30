<template>
    <div>
         <div class="page-title">
            <h3>Bookings</h3>
        </div>

        
        <Loader v-if="loading" />
        <p class="center" v-else-if="!bookings.length">No bookings yet <router-link to="/addbooking">Add new booking</router-link></p>
        <vuetable ref="vuetable"
                api-url="https://vuetable.ratiw.net/api/users"
                :fields="fields"
                :sort-order="sortOrder"
                data-path="data"
                :per-page="5"
                :css="css"
                pagination-path=""
                
                @vuetable:pagination-data="onPaginationData"
            >
            <div slot="gender-slot" slot-scope="props">
                <span v-if="props.rowData.gender === 'M'" class="ui teal label"><i class="large man icon"></i>Male</span>
                <span v-else class="ui pink label"><i class="large woman icon"></i>Female</span>
            </div>
        </vuetable>

        <div class="pagination ui basic segment grid">
        <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
        <vuetable-pagination ref="pagination"
            @vuetable-pagination:change-page="onChangePage"
        ></vuetable-pagination>
        </div>

         
        
    </div>
</template>
<script>
// import BookingsHistory from '@/components/BookingHistory'
// import paginationMixin from '@/mixins/pagination.mixin.js'
import { mapActions } from 'vuex'
import Vuetable from 'vuetable-2'
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import FieldsDef from "../components/cmpdata/BookingsFields.js";
import bookingsCss from '../components/cmpdata/BookingsFieldsCss.js'

export default {
    name: 'bookings',
    // components: { BookingsHistory, PieChart},
    components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
    },
    // mixins: [paginationMixin],
    data: () => ({
        bookings: [],
        loading: true,
        fields: FieldsDef,
        css: bookingsCss,
        sortOrder: [
            {
            field: "email",
            direction: "asc"
            }
        ]
    }),
    methods: {
        onPaginationData(paginationData) {
        this.$refs.pagination.setPaginationData(paginationData);
        this.$refs.paginationInfo.setPaginationData(paginationData);
        },
        onChangePage(page) {
        this.$refs.vuetable.changePage(page);
        }
    },
    async mounted(){
        
        const queryData = new URLSearchParams();
        queryData.append('page', 1);
      
        try {
            const bookings = await this.$store.dispatch('fetchOrders',queryData);
            console.log(bookings);
        } catch( err ) {
            console.log(err);
        }
        // this.categories = await this.$store.dispatch('fetchCategories');
        // this.setupPagination(this.bookings.map(it => {
        //     it.category = this.categories.filter(ct => ct.id === it.category);
        //     if(it.category) it.category = it.category[0];
        //     return it;
        // }));
   
        this.loading = false;
       
    }
   
}
</script>
<style>
.pagination {
  margin-top: 1rem;
}

.vuetable-head-wrapper table.vuetable th.sortable {
  cursor: pointer
}
</style>