<template>
  <div>
    <div class="page-subtitle">
      <h4>Edit</h4>
    </div>

    <form @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="current">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.title}}</option>
        </select>
        <label>Choose category</label>
      </div>

      <div class="input-field">
        <input id="name" type="text" v-model="title" :class="{ invalid : ($v.title.$dirty && !$v.title.required)}">
        <label for="name">Name</label>
        <span class="helper-text invalid" v-if="$v.title.$dirty && !$v.title.required">Input title</span>
      </div>

      <div class="input-field">
        <input id="limit" type="number" v-model.number="limit" :class="{ invalid : ($v.limit.$dirty && !$v.limit.minValue)}">
        <label for="limit">Limit</label>
        <span class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.minValue">Limit must be at least {{$v.limit.$params.minValue.min}} charachters</span>
      </div>


      <button class="btn waves-effect waves-light" type="submit">
        Update
        <i class="material-icons right">send</i>
      </button>
      <button class="btn waves-effect waves-light" @click.prevent="deleteCategory">
        Delete
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
/* eslint-disable */

import {required, minValue} from 'vuelidate/lib/validators'

export default {
    name: 'CategoryEdit',
    data: () => ({
      select: null,
      title: '',
      limit: 100, 
      current: null
    }),
    validations: {
      title : { required },
      limit : { minValue: minValue(1) },
    },
    props: {
      categories: {
        type: Array,
        required: true
      } 
    },
    watch: {
      current(catId) {
        const {title, limit} = this.categories.find(c => c.id === catId )
        this.title = title;
        this.limit = limit;
      }
    },
    created(){
      const {id, title, limit} = this.categories[0];
      this.current = id;
      this.title = title;
      this.limit = limit;
    },
    mounted() {
      M.updateTextFields()
      const options = {}
      this.select = M.FormSelect.init(this.$refs.select, options);
    },
    destroyed() {
      if(this.select && this.select.destroy) {
        this.select.destroy();
      }
    },
    methods: {
      async submitHandler() {
        if(this.$v.$invalid) {
          this.$v.$touch();
          return
        }
        try {
          await this.$store.dispatch('updateCategory',  {
              id:    this.current,
              title: this.title,
              limit: this.limit
          })
          
          this.$message('Category was updated')
          this.$v.$reset();
          this.$emit('updated',{
              id:    this.current,
              title: this.title,
              limit: this.limit
          });
        } catch (e) { console.log(e); }
       
      },
      async deleteCategory() {
        try {
         await this.$store.dispatch('deleteCategory',{
                  id:    this.current
              });
           
          this.$message('Category has been deleted');
          this.$v.$reset();
          this.$emit('deleted',this.current);
        } catch (e) { console.log(e); }
      }
    },

  }
</script>