<template>
    <div>
        <div class="page-title">
            <h3>New booking</h3>
        </div>

        <Loader v-if="loading"/>
            <p class="center" v-else-if="!categories.length">No categories yet</p>
        <form v-else class="form" @submit.prevent="submitHandler">
            <div class="input-field">
                <select ref="select" v-model="category">
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.title}}</option>
                </select>
                <label>Choose category</label>
            </div>

            <div class="input-field">
                <input id="amount" type="number" v-model="amount">
                <label for="amount">Sum</label>
                <span class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.minValue">min amount is {{$v.amount.$params.minValue.min}}</span>
            </div>

            <div class="input-field">
                <input id="description" type="text" v-model="description">
                <label for="description">Description</label>
                 <span class="helper-text invalid" v-if="$v.description.$dirty && !$v.description.required">Input description</span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Create
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>
<script>

import {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'
export default {
    name: 'record',
    data: () => ({
        loading: true,
        category: null,
        select: null,
        categories: [],
        amount: 0,
        description : ''
    }),
    validations: {
      amount : { required,minValue: minValue(1) },
      description : { required },
    },
    async mounted(){
        
        this.categories = await this.$store.dispatch('fetchCategories');
        this.loading =  false;
        if(this.categories) {
            this.category = this.categories[0].id
        }
        setTimeout(() => {
            this.select = M.FormSelect.init(this.$refs.select)
            M.updateTextFields();
            },0 )
    },
    destroyed() {
      if(this.select && this.select.destroy) {
        this.select.destroy();
      }
    },
    computed: {
        ...mapGetters(['info'])
    },
    methods: {
        async submitHandler() {
            if(this.$v.$invalid) {
            this.$v.$touch();
            return
            }
            try {
               
            await this.$store.dispatch('addBooking',  {
                category: this.category,
                amount: this.amount,
                description: this.description,
                date: new Date().toJSON()
            })
            const bill = parseInt(this.info.bill) + parseInt(this.amount);
            
            await this.$store.dispatch('updateInfo',{bill});

            this.$message('New booking request has been created');
            this.$v.$reset();
            this.amount = 1;
            this.description = '';
            
            } catch (e) { console.log(e); }
       
      }
    }
}
</script>