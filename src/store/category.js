import axios from 'axios'

export default {
  actions: {
    async fetchCategories({commit,dispatch}){
      return new Promise((resolve, reject) => {
        const userid = this.getters.user.id;
        if(userid) {
          axios.get('http://12knots_october.com/api/v1/getcats/'+userid + '/') .then(res => {
            resolve(res.data);
          }).catch(err => {
            commit('setError',err);
            reject(err)
          });
        }
        else {
          reject('no user')
        }
    })
      // try {
      //   const uid = await dispatch('getUid');
      //   const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};
      //   let cats = [];
      //   cats = Object.keys(categories).map(key => ({...categories[key], id:key}));
      //   return cats;
      // } 
      // catch (error) {
      //   commit('setError',error);
      //   throw error;
      // }
    },
    async fetchCategoryById({commit,dispatch},id){
      // try {
      //   const uid = await dispatch('getUid');
      //   const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {};
      //   return {...category, id};
      // } 
      // catch (error) {
      //   commit('setError',error);
      //   throw error;
      // }
    },
    async createCategory({commit,dispatch},{title,limit}){
      // try {
      //     const uid = await dispatch('getUid');
      //     const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit});
      //     return { title, limit, id: category.key }
      // } 
      // catch (error) {
      //   commit('setError',error);
      //   throw error;
      // }
    },
    async updateCategory({commit,dispatch},{title,limit,id}){
      // try {
      //     const uid = await dispatch('getUid');
      //     await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit});
      // } 
      // catch (error) {
      //   commit('setError',error);
      //   throw error;
      // }
    },
    async deleteCategory({commit,dispatch},{id}){
      // try {
      //     const uid = await dispatch('getUid');
      //     return await firebase.database().ref(`/users/${uid}/categories`).child(id).remove();
      // } 
      // catch (error) {
      //   commit('setError',error);
      //   throw error;
      // }
    }
  }
}