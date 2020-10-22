import axios from 'axios'

export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    
  },
  actions: {
    
    login({commit}, user){
      return new Promise((resolve, reject) => {
        axios({url: process.env.VUE_APP_API_PATH + 'auth/login/', data: user, method: 'POST' })
        .then(res => {
          const token = res.data.token
          const user = res.data.user
          commit('setUser',user);
          commit('setToken',token);
          localStorage.setItem('token', token);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
          commit('clearError');
          resolve(res)
        })
        .catch(err => {
          commit('setError',err);
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    
    register({dispatch,commit},user) {
      return new Promise((resolve, reject) => {
          axios.post(process.env.VUE_APP_API_PATH + 'auth/register/',user).then(res => {
            resolve(res.data)
          }).catch(err => {
            commit('setError',err);
            localStorage.removeItem('token')
            reject(err)
          });
      })
    },
    getUser({dispatch,commit}){

      return new Promise ((resolve,reject) => {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
          }
        };
       
        axios.get(process.env.VUE_APP_API_PATH + 'auth/me/',config).then(res => {
          if(res.data) {
            commit('setUser',res.data.user);
            resolve(res.data)
          }
          else { console.log(res); }
        }).catch(err => {
          console.log(err)
          reject(err);
        });
      });
      
     
      
    },
    async logout({commit}) {
      console.log('logout');
      // await firebase.auth().signOut()
      localStorage.removeItem('token');
      await commit('setUser',{}) 
      await commit('setToken','') 
    }

  },
  getters: {
    user: state => state.user,
    token: state => state.token,
  },
}