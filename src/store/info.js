import axios from 'axios'

export default {
  state: {
    info: {},
    currency: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    setCurrency(state, currency) {
      state.currency = currency;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async updateInfo({ dispatch, commit }, toUpdate) {
      // try {
      //   const uid = await dispatch("getUid");
      //   const updateData = { ...this.getters.info, ...toUpdate };

      //   const res = await firebase
      //     .database()
      //     .ref(`/users/${uid}/info`)
      //     .update(updateData);
       
      //   commit("setInfo", updateData);
      // } catch (e) {
      //   commit("setError", e);
      //   throw e;
      // }
    },
    fetchInfo({ dispatch, commit }) {
      axios.get(process.env.VUE_APP_API_PATH + 'v1/getinfo/').then(res => {
        if(res.data) {
          commit("setInfo",  res.data );
        }
        else { console.log(res); }
      }).catch(err => {
        console.log(err)
      });
      
      
      // try {
      //   const uid = await dispatch("getUid");
      //   const info = (
      //     await firebase
      //       .database()
      //       .ref(`/users/${uid}/info`)
      //       .once("value")
      //   ).val();
      //   commit("setInfo", info);
      // } catch (e) {
      //   commit("setError", e);
      //   throw e;
      // }
    },
    async fetchCur({ dispatch, commit }) {
      const api = "https://api.exchangeratesapi.io/latest?symbols=USD,RUB";
      try {
        let response = await fetch(api);
        return await response.json();
      } catch (e) {
        commit('setError',e);
        console.log(e);
      }
    },
    fetchCurrency({ dispatch, commit }) {
      const curObj = {
        success: true,
        base: "EUR",
        date: "2020-03-30",
        rates: {
          USD: 1.2,
          RUB: 80,
        },
      };
      return new Promise(function(resolve, reject) {
        // Setting 2000 ms time
        setTimeout(resolve, 5000);
      }).then(function() {
        commit("setCurrency", curObj);
      });
    },
  },
  getters: {
    info: (state) => state.info,
    currency: (state) => state.currency,
  },
};
