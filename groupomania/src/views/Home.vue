<template>
  <div class="home">
        <h2 v-if='getStatus=="log"'>Vous avez un profil et voulez vous connecter ?</h2>
        <h2 v-if='getStatus=="create"'>Vous n'avez pas de profil et voulez en créer un ?</h2>
        <h2 v-if='getStatus=="lost"'>Vous voulez redemander un mot de passe ?</h2>
        <input type="email" v-model='email' placeholder="Votre email pro">
        <input type="text" v-model='name' placeholder="Votre nom" v-if="getStatus=='create'">
        <input type="text" v-model='firstname' placeholder="Votre prénom" v-if="getStatus=='create'">
        <div class="input">
          <input :type="typePassword" v-model='password' placeholder="saisissez votre mot de passe" v-if="getStatus!='lost'">
          <span class='showHide' v-if='getStatus!="lost"'>
            <button class='show' @click="switchText" v-if='typePassword=="password"' title='Afficher le mot de passe'><i class="fas fa-eye"></i></button>
            <button class='hide' @click="switchPassword" v-if='typePassword=="text"'><i class="fas fa-eye-slash" title='Masquer le mot de passe'></i></button>
          </span>  
        </div>
        <div>
          <button v-if='getStatus=="log"' id='log' :disabled='isDisabled' @click='logAccount'>Se connecter</button>
          <button v-if='getStatus=="create"' id='create' :disabled='isDisabled' @click='createAccount'>S'enregistrer</button>
          <button v-if='getStatus=="lost"' id='lost' :disabled='isDisabled' @click='askPassword'>Réinitialiser le mot de passe</button>
        </div>
         {{ typePassword }}
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data(){
    return{
      title:'log',
      email: '',
      name: '',
      firstname:'',
      password:'',
      typePassword:'password',
      info:'',
      disabledButton:true,
      
    }
  },
  computed:{
    getStatus(){    //on récupére le
      return this.$store.state.operatingStatus;
    },
    isDisabled(){
      if(this.getStatus=='lost' && this.email!=''){
          return false
        }
      else if(this.getStatus=='log' && this.email!='' && this.password!=''){
          return false
      }else if(this.getStatus=='create' && this.email!='' && this.password!='' && this.name!='' && this.firstname!=''){
          return false
        }
        else{
        return true
      }
    },
  },
  methods:{
    //afficher / masquer le mot de passe
    switchPassword(){
      return this.typePassword='password';
    },
    switchText(){
      return this.typePassword='text';
    },
    //pour se connecter
    logAccount(){
      //console.log('email: '+this.email+' mdp: '+this.password)
      this.$store.dispatch('storeLogAccount',{
        email:this.email,
        password:this.password
      })
    },
    //pour créer le compte
    createAccount(){
      console.log('email: '+this.email+' mdp: '+this.password+' nom: '+this.name+' prenom: '+this.firstname)
    },
    //pour redemander un mot de passe
    askPassword(){
      console.log('email: '+this.email)
    },
  },
  


}
</script>

<style scoped>
div{
  width:90%;
  margin:auto;
  padding:5px;
  background-color: blue;
}

input, .input{
  width:90%;
  padding:5px 0;
  font-size:1.2rem;
}

.input{
  width: 90%;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.showHide{
  width:8%;
}

.show,.hide{
  width: 100%;
  padding:5px;
  font-size:1.2rem;
  border-radius:5px;
}

.show{
  background-color: green;
  color:white;
}

.hide{
  background-color: red;
  color:black;
}

h2{
  background-color: turquoise;
  color:black;
  width:fit-content;
  margin:auto;

}
</style>


