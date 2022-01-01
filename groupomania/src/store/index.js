import { createStore } from 'vuex'

//valeur par défaut
let userDefault={
  token:'',
  rank:-1
};

let userDefaultInfo={
  email:'',
  name:'',
  firstname:'',
  password:'',
  service:'',
};

let statusDefault='log'; // log, logging, create, creating, lost,logged



export default createStore({
  state: {
    operatingStatus:statusDefault,
    user:userDefault,
    userInfo:userDefaultInfo,
    
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
