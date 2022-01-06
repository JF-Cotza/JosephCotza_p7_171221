import { createStore } from 'vuex';
const axios=require('axios');
const defaultUrl='http://localhost:3000/api';

const instance =axios.create({
  baseURL:defaultUrl
});

//valeur par défaut
let userDefault={
  token:'',
  rank:-1               //-1 deconnecté, 0 à supprimer, 1 standard, 2 admin
};

let userDefaultInfo={
  email:'',
  name:'',
  firstname:'',
  password:'',
  service:'',
};

let statusDefault='log'; // log, loading, create, created, working, lost,logged



export default createStore({
  state: {
    operatingStatus:statusDefault,
    errorStatus:false,
    user:userDefault,
    userInfo:userDefaultInfo,
  },
  mutations: {
    setStatus(state,operatingStatus){
      state.operatingStatus=operatingStatus;
    },
    setUser(state,user){
      state.user.id=user.userId;
      state.user.rank=user.userRank;
      state.user.token=user.token;
    },
    setError(state,errorStatus){
      state.errorStatus=errorStatus
    }
  },
  actions: {
    //user
    storeLogAccount({commit},userInfos){
      this.operatingStatus='logging';
        return new Promise ((resolve, reject)=>{     //on déclare une nouvelle fonction asynchrone (si ok, sinon)
            commit('setStatus','loading');          // on appelle la mutation setStatus
            instance.post('/auth/login', userInfos)  //on accéde à l'instance déclaré plus haut et on saisit le chemin vers la méthode dont on a besoin
              .then(function(res){
                commit('setStatus','logged');
                commit('setUser',res.data);
                commit('setError',false)
                //console.log('storelogaccount');
                //console.log(res);     // on console le retour du backend
               resolve(res);                     
              })
              .catch(function(error){
                commit('setStatus','log');
                commit('setError',true)
                reject(error);
              })
            })    
        
      },
    storeCreateAccount({commit},userInfos){
        this.operatingStatus='creating';
        return new Promise ((resolve, reject)=>{     //on déclare une nouvelle fonction asynchrone (si ok, sinon)
            commit('setStatus','working');
            instance.post('/auth/signin', userInfos)  //on accéde à l'instance déclaré plus haut et on saisit le chemin vers la méthode dont on a besoin
              .then(function(res){
                commit('setStatus','created');
                commit('setError',false);
                //console.log('storecreateaccount');
                //console.log(res);     // on console le retour du backend
               resolve(res);                     
              })
              .catch(function(error){
                commit('setStatus','create');
                commit('setError',true);
                reject(error);
              })
            })  
        },
    storeDeleteAccount({commit},userInfos){
        commit;
        instance.put('/delete', userInfos)     //on accéde à l'instance déclaré plus haut et on saisit le chemin vers la méthode dont on a besoin 
         .then(function(res){
           console.log(res);                     // on console le retour du backend
         })
        },
    storeUpdateAccount({commit},userInfos){
        commit;
        instance.put('/update', userInfos)     //on accéde à l'instance déclaré plus haut et on saisit le chemin vers la méthode dont on a besoin 
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
