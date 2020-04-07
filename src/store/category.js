import firebase from 'firebase/app'
export default {
  actions: {
    async fetchCategories({commit,dispatch}){
      try {
        const uid = await dispatch('getUid');
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};
        let cats = [];
        // Object.keys(categories).forEach( key => {
        //   cats.push({
        //     title: categories[key].title,
        //     limit: categories[key].limit,
        //     id: key
        //   });
        // });
        cats = Object.keys(categories).map(key => ({...categories[key], id:key}));
        return cats;
    } 
    catch (error) {
      commit('setError',error);
      throw error;
    }
    },
    async createCategory({commit,dispatch},{title,limit}){
      try {
          const uid = await dispatch('getUid');
          const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit});
          return { title, limit, id: category.key }
      } 
      catch (error) {
        commit('setError',error);
        throw error;
      }
    },
    async updateCategory({commit,dispatch},{title,limit,id}){
      try {
          const uid = await dispatch('getUid');
          await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit});
      } 
      catch (error) {
        commit('setError',error);
        throw error;
      }
    },
    async deleteCategory({commit,dispatch},{id}){
      try {
          const uid = await dispatch('getUid');
          return await firebase.database().ref(`/users/${uid}/categories`).child(id).remove();
      } 
      catch (error) {
        commit('setError',error);
        throw error;
      }
    }
  }
}