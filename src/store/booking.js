import firebase from 'firebase/app'
export default {
  actions: {
    async addBooking({commit,dispatch},record) {
      try {
        const uid = await dispatch('getUid');
        return await firebase.database().ref(`users/${uid}/bookings`).push(record)
      }catch(e) {
        commit('setError',e);
        throw e;
      }
    },
    async fetchBookings({commit,dispatch}) {
      try {
        const uid = await dispatch('getUid');
        const bks = (await firebase.database().ref(`/users/${uid}/bookings`).once('value')).val() || {};
        let bookings = [];
        
        bookings = Object.keys(bks).map(key => ({...bks[key], id:key}));
        return bookings;
      }catch(e) {
        commit('setError',e);
        throw e;
      }
    },
    async fetchBookingById({commit,dispatch},id) {
      try {
        const uid = await dispatch('getUid');
        const book = (await firebase.database().ref(`/users/${uid}/bookings`).child(id).once('value')).val() || {};
        
        return {...book, id};
      }catch(e) {
        commit('setError',e);
        throw e;
      }
    }
  }
}