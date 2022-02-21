import { createStore } from 'vuex';
import FormData from 'form-data';

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
  avatar:'',
  
};

let statusDefault='log'; // log, loading, create, created, working, lost,logged

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
    singlePublication:{},
    publication:[],
    comments:[],
    file:{},
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
      state.userInfo.id=userInfo.user._id;
      state.userInfo.email=userInfo.user.email;
      state.userInfo.name=userInfo.user.name;
      state.userInfo.firstname=userInfo.user.firstname;
      state.userInfo.service=userInfo.user.service;
      state.userInfo.rank=userInfo.user.userRank;
      state.userInfo.description=userInfo.user.description;
      state.userInfo.avatar=userInfo.user.avatar;  
    },
    setError(state,errorStatus){
      state.errorStatus=errorStatus
    },
    logout(state){
      localStorage.removeItem('user');
      state.user.token=' ';
      state.user.rank=-1;
      state.user.id=' ';
      state.operatingStatus='log';
      state.userInfo={};
      state.initUser={};
      state.errorStatus=false;
      console.log('logout');
      console.log(state.user);
      console.log('userDefault');
      console.log(userDefault);
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
    },
    setPublication(state,singlePublication){
      state.singlePublication=singlePublication
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
    storeDeleteAccount({commit},userInfo){
        commit;
        
        console.log('storedelete');
        console.log(userInfo);
        instance.delete('auth/delete', 
          {userId:userInfo})     //on accéde à l'instance déclaré plus haut et on saisit le chemin vers la méthode dont on a besoin 
         .then(function(res){
            console.log(res);                     // on console le retour du backend
            commit('setStatus','log');
            commit('logout');
            
         })
        },
    storeUpdateAccount({commit},userInfos){
        commit;
        instance.put('/auth/update', 
          { userId:userInfos.userId,
            email:JSON.parse(localStorage.getItem('user')).email,
            name:JSON.parse(localStorage.getItem('user')).name,
            firstname:JSON.parse(localStorage.getItem('user')).firstname,
            rank:JSON.parse(localStorage.getItem('user')).rank,
            service:JSON.parse(localStorage.getItem('user')).service,
            description:JSON.parse(localStorage.getItem('user')).rank
          })
           
         .then(function(res){
           console.log(res);                     // on console le retour du backend
         })
        },
    storeGetProfile({commit},userInfo){
      commit('setStatus','loading');          // on appelle la mutation setStatus
      instance.get('/auth/getProfile',        //on accéde à l'instance déclaré plus haut et on saisit le chemin vers la méthode dont on a besoin
         {userId: userInfo }
      )  
        .then(function(res){
              commit('setStatus','profile');
              commit('setUserInfos',res.data);
              commit('userCopy',res.data);
              commit('setError',false);
            })
              .catch(function(error){
                commit('setStatus','log');
                commit('setError',true);
                console.log(error.message)
              })
              
    },
    //publication
    storeCreatePublication({commit},publicationInfos){
      let form=new FormData()
    
      form.append('maker',publicationInfos.maker);
      form.append('date',publicationInfos.date);
      form.append('title',publicationInfos.title);
      form.append('texte',publicationInfos.texte);
      form.append('where','index');
      
      if(publicationInfos.file){
        form.append('filename',publicationInfos.file);
      }

      console.log('source');
      console.log(publicationInfos);
   
      axios({
        url:defaultUrl+'/publications/create',
        method:'POST',
        headers:{
          //crossdomain: true,
          //'Content-Type':'undifined', //"multipart/form-data",
          authorization:userReturn.userId+' '+userReturn.token
        },
        data:form,
      })
      
      //return new Promise ((resolve, reject)=>{     //on déclare une nouvelle fonction asynchrone (si ok, sinon)
        //commit('setStatus','working');
        //  instance.post('/publications/create',
          //    form,//publicationInfos,
              /*{headers:{
              "Content-type": "multipart/form-data",
              }
            }*/
          //)  //on accéde à l'instance déclaré plus haut et on saisit le chemin vers la méthode dont on a besoin
              .then(function(res){
                commit('setStatus','created');
                commit('setError',false);
                console.log('createpublication>then');
                console.log(res);
                //resolve(res);                     
              })
              .catch(function(error){
                commit('setStatus','create');
                commit('setError',true);
                console.log(error.message)
                //reject(error);
              })
            //})  
        },
      storeGetAllPublications({commit}){
        this.operatingStatus='loading';
        return new Promise ((resolve, reject)=>{
        instance.get('/publications/all')  //on accéde à l'instance déclaré plus haut et on saisit le chemin vers la méthode dont on a besoin
          .then(function(res){
            commit('setStatus','loading');
            commit('setError',false);
            console.log('all')
            console.log(res.data)
            resolve(res);                     
          })
          .catch(function(error){
            commit('setStatus','create');
            commit('setError',true);
            console.log(error)
            reject(error);
          })
        }
      )},
      storeGetOnePublication({commit},publicationId){
        commit;
        console.log('storeGetOnePublication')
        console.log(publicationId)
        return new Promise ((resolve, reject)=>{     //on déclare une nouvelle fonction asynchrone (si ok, sinon)
            commit('setStatus','loading');          // on appelle la mutation setStatus
            instance.get('/publications/getOne/',{params:{id:publicationId}})  //on accéde à l'instance déclaré plus haut et on saisit le chemin vers la méthode dont on a besoin
              .then(function(res){
                commit('setStatus','loaded');
                commit('setPublication',res.data);
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
      updatePublication({commit},publicationInfos){
        commit;
        console.log('index>update')
        console.log(publicationInfos);
        instance.put('/publications/update',publicationInfos)  //on accéde à l'instance déclaré plus haut et on saisit le chemin vers la méthode dont on a besoin
          .then(function(res){
            commit('setStatus','updating');
            console.log(res);     // on console le retour du backend
            //resolve(res);                     
          })
          .catch(function(error){
            commit('setStatus','log');
            commit('setError',true)
            console.log(error.message)
            //reject(error);
          })  
      },
      commentPublication({commit},commentInfo){
        commit;
        console.log('comment publication');
        console.log(commentInfo);
        instance.post('/publications/comment',commentInfo)
        .then(function(res){
          console.log('comment publication>then>res');
          console.log(res);
        })
      },
      storeGetAllComments({commit}){
        this.operatingStatus='loading';
        return new Promise ((resolve, reject)=>{
        instance.get('/publications/allComments')  //on accéde à l'instance déclaré plus haut et on saisit le chemin vers la méthode dont on a besoin
          .then(function(res){
            commit('setStatus','loading');
            commit('setError',false);
            console.log('all')
            console.log(res.data)
            resolve(res);                     
          })
          .catch(function(error){
            commit('setStatus','create');
            commit('setError',true);
            console.log(error)
            reject(error);
          })
        }
      )},
      storeGetComments({commit},publicationId){
        console.log('storeGetComments');
        console.log(publicationId)
        this.operatingStatus='loading';
        return new Promise ((resolve, reject)=>{
        instance.get('/publications/listComments',{params:{id:publicationId}})  //on accéde à l'instance déclaré plus haut et on saisit le chemin vers la méthode dont on a besoin
          .then(function(res){
            commit('setStatus','loading');
            commit('setError',false);
            console.log('storeGetComments')
            console.log(res.data)
            resolve(res);                     
          })
          .catch(function(error){
            commit('setStatus','create');
            commit('setError',true);
            console.log(error)
            reject(error);
          })
        }
      )},

        //voir  https://fr.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html pour axios
  },

})
