import axios from 'axios'

export default {
  actions: {
    async addBooking({commit,dispatch},record) {
      // try {
      //   const uid = await dispatch('getUid');
      //   return await firebase.database().ref(`users/${uid}/bookings`).push(record)
      // }catch(e) {
      //   commit('setError',e);
      //   throw e;
      // }
    },
    async fetchBookings({commit,dispatch}) {
      return new Promise((resolve, reject) => {
        const userid = this.getters.user.id;
        if(userid) {
          axios.get(process.env.VUE_APP_API_PATH + 'v1/getbookings/'+userid + '/') .then(res => {
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
    },
    async fetchBookingById({commit,dispatch},id) {
      return new Promise((resolve, reject) => {
        resolve({
          'id':1,
          'description':'Regata on Cuba',
          'amount' : 30000, 
          'category':1, 
          'date':'2020-06-22'
        });
        // const userid = this.getters.user.id;
        // if(userid) {
        //   axios.get(process.env.VUE_APP_API_PATH + 'v1/getbookings/'+userid + '/') .then(res => {
        //     resolve(res.data);
        //   }).catch(err => {
        //     commit('setError',err);
        //     reject(err)
        //   });
        // }
        // else {
        //   reject('no user')
        // }
      })
      // try {
      //   const uid = await dispatch('getUid');
      //   const book = (await firebase.database().ref(`/users/${uid}/bookings`).child(id).once('value')).val() || {};
        
      //   return {...book, id};
      // }catch(e) {
      //   commit('setError',e);
      //   throw e;
      // }
    }
  }
}