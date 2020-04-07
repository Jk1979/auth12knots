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
    }
  }
}