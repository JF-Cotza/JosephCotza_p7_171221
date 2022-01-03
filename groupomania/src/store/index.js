import { createStore } from 'vuex';
const axios=require('axios');
const defaultUrl='http://localhost:3000/api';

const instance =axios.create({
  baseURL:defaultUrl
});

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
    storeLogAccount({commit},userInfos){
        commit;
        instance.post('/login', userInfos)     //on accéde à l'instance déclaré plus haut et on saisit le chemin vers la méthode dont on a besoin 
         .then(function(res){
           console.log(res);                     // on console le retour du backend
         })
        }
        //console.log(userInfos) //affiche les valeurs reçues du frontend
        //voir  https://fr.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html pour axios
  },
  modules: {
  }
})
