import { createStore } from 'vuex';
//import user from '../../backend/models/user';
const axios=require('axios');
const defaultUrl='http://localhost:3000/api';

const instance =axios.create({
  baseURL:defaultUrl
});

//valeur par défaut
let userDefault={
  token:" ",
  rank:-1               //-1 deconnecté, 0 à supprimer, 1 standard, 2 admin
};

let userDefaultInfo={
  email:'',
  name:'',
  firstname:'',
  password:'',
  service:'',
  description:'',
  avatar:''
};

let statusDefault='log'; // log, loading, create, created, working, lost,logged

let defaultState={
  user:userDefault,
  operatingStatus:statusDefault,
  userInfo:userDefaultInfo,
  errorStatus:false
}


let localStorageUser=localStorage.getItem('user');
let userReturn;
let statusReturn;
if(!localStorageUser){
  userReturn=userDefault;
  statusReturn=statusDefault
}
else{
  try{
    userReturn=JSON.parse(localStorageUser) //pour inverser le stringify
    statusReturn='logged';
    instance.defaults.headers.common['Authorization']=userReturn.userId+' '+userReturn.token;
  }
  catch(error){
    userReturn=userDefault;
  }
}

export default createStore({
  state: {
    operatingStatus:statusReturn,
    errorStatus:false,
    user:userReturn,
    userInfo:userDefaultInfo,
    initUser:{},
  },
  mutations: {
    setStatus(state,operatingStatus){
      state.operatingStatus=operatingStatus;
    },
    setUser(state,user){
      state.user.id=user.userId;
      state.user.rank=user.userRank;
      state.user.token=user.token;
      instance.defaults.headers.common['Authorization']=user.userId+' '+user.token; // on fait en sorte que le token soit implanté par défaut dans l'autorisation de l'instance
      localStorage.setItem('user',JSON.stringify(user)) //sinon [objet, objet]
      //console.log(instance.defaults.headers.common['Authorization']); //ok
    },
    setUserInfos(state,userInfo){
      //console.log('setUserInfo');
      //console.log(userInfo.user._id);
      state.userInfo.id=userInfo.user._id;
      state.userInfo.email=userInfo.user.email;
      state.userInfo.name=userInfo.user.name;
      state.userInfo.firstname=userInfo.user.firstname;
      state.userInfo.service=userInfo.user.service;
      state.userInfo.rank=userInfo.user.userRank;
      state.userInfo.description=userInfo.user.description;
      state.userInfo.avatar=userInfo.user.avatar;  
      //state.userInfo.password=userInfo.user.password;
    },
    setError(state,errorStatus){
      state.errorStatus=errorStatus
    },
    logout(state){
      localStorage.removeItem('user');
        state.user=defaultState.user;
        state.operatingStatus=defaultState.operatingStatus;
        state.userInfo=defaultState.userInfo;
        state.errorStatus=defaultState.errorStatus;
    },
    userCopy(state,initUser){
      state.initUser.id=initUser.user._id;
      state.initUser.email=initUser.user.email;
      state.initUser.name=initUser.user.name;
      state.initUser.firstname=initUser.user.firstname;
      state.initUser.service=initUser.user.service;
      state.initUser.rank=initUser.user.userRank;
      state.initUser.description=initUser.user.description;
      state.initUser.avatar=initUser.user.avatar;
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
        },
    storeGetProfile({commit},userInfo){
      commit('setStatus','loading');          // on appelle la mutation setStatus
      instance.get('/auth/getProfile',
         {userId: userInfo }
         )  //on accéde à l'instance déclaré plus haut et on saisit le chemin vers la méthode dont on a besoin
                                              //ici on n'a pas besoin de paramètres car le token est inclus dans l'instance  
            .then(function(res){
            //  console.log('storeGetProfile.then'); 
            //  console.log(res.data);
              commit('setStatus','profile');
              commit('setUserInfos',res.data);
              commit('userCopy',res.data);
              commit('setError',false);
                
                //console.log(res);     // on console le retour du backend                    
              })/*
              .catch(function(error){
                commit('setStatus','log');
                commit('setError',true);
                console.log(error.message)
              })*/
              
    }
    //publication

        //voir  https://fr.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html pour axios
  },
  modules: {
  }
})
