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
        axios({url: 'http://12knots_october.com/api/auth/login/', data: user, method: 'POST' })
        .then(res => {
          const token = res.data.token
          const user = res.data.user
          commit('setUser',user);
          commit('setToken',token);
          localStorage.setItem('token', token);
          axios.defaults.headers.common['Authorization'] = token
          resolve(res)
        })
        .catch(err => {
          commit('setError',err);
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    login2({dispatch,commit},user) {
        axios.post('http://12knots_october.com/api/auth/login/',user).then(res => {
          if(res.data) {
            
            commit('setUser',res.data.user);
            commit('setToken',res.data.token);
            if(res.data.token) localStorage.setItem('token', res.data.token)
          }
          else { console.log(res); }
        }).catch(err => {
          console.log(err)
        });
    },
    register({dispatch,commit},user) {
      try {
        axios.post('http://12knots_october.com/api/auth/register/',user).then(res => {
          if(res.data) {
            console.log(res.data);
           
          }
          else { console.log(res); }
        }).catch(err => {
          console.log(err)
        });
     

      } catch (e) {
          console.log(e);
          commit('setError',e);
          throw e
      }
    },
    getUser({dispatch,commit}){

      return new Promise ((resolve,reject) => {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
          }
        };
       
        axios.get('http://12knots_october.com/api/auth/me/',config).then(res => {
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
      // await firebase.auth().signOut()
      localStorage.removeItem('token');
      // await commit('clearInfo')
    }

  },
  getters: {
    user: state => state.user,
    token: state => state.token,
  },
}