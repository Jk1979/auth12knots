<template>
    <div>
  <div class="page-title">
    <h3>Menu</h3>
  </div>
  <section>
    <Loader v-if="loading" />
    <div v-else class="row">
      <div class="col s12 m6">
        <CategoryCreate @created="addNewCategory"/>
      </div>
      <div class="col s12 m6">
        <CategoryEdit v-if="categories.length" :categories="categories" @updated="refreshCats" @deleted="refreshAfterDelete" :key="categories.legth + updateCount"/>
        <p v-else class="center">No categories yet</p>
      </div>
    </div>
  </section>
</div>
</template>

<script>

import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default {
  name: 'Categories',
  data: ()=> ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    refreshCats(category) {
        this.categories.map( c => {
          if(c.id === category.id) {
            c.title = category.title;
            c.limit = category.limit;
            return c;
          }
          
        });
        this.updateCount++;
    },
    refreshAfterDelete(id) {
      this.categories = this.categories.filter( c => c.id !== id);
     
    }
  },
  components: { CategoryCreate, CategoryEdit }
  
}
</script>