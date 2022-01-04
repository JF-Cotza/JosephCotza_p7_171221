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

let statusDefault='log'; // log, loading, create, created, working, lost,logged



export default createStore({
  state: {
    operatingStatus:statusDefault,
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
                commit('setUser',res.data)
                console.log('storelogaccount');
                console.log(res);     // on console le retour du backend
               resolve(res);                     
              })
              .catch(function(error){
                commit('setStatus','log');
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
                console.log('storecreateaccount');
                console.log(res);     // on console le retour du backend
               resolve(res);                     
              })
              .catch(function(error){
                commit('setStatus','create');
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
