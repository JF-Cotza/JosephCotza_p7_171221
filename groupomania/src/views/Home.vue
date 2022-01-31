<template>
  <div class="home">
        <h2 v-if='getStatus=="log"'>Vous avez un profil et voulez vous connecter ?</h2>
        <h2 v-if='getStatus=="create"'>Vous n'avez pas de profil et voulez en créer un ?</h2>
        <h2 v-if='getStatus=="lost"'>Vous voulez redemander un mot de passe ?</h2>
        <input type="email" v-model='email' placeholder="Votre email pro" :rule='validEmail'>
        <input type="text" v-model='name' placeholder="Votre nom" v-if="getStatus=='create'">
        <input type="text" v-model='firstname' placeholder="Votre prénom" v-if="getStatus=='create'">
        <div class="input">
          <input :type='typePassword' v-model='password' :rule='validPassword' placeholder="saisissez votre mot de passe" v-if="getStatus!='lost'">
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
        <div v-if='getError==false'>
          <p v-if='getStatus=="loging"'>Connexion en cours</p>
          <p v-if='getStatus=="working"'>Création en cours</p>
        </div>
        <div v-else>
          <p v-if='getStatus=="log"'>Erreur dans le mot de mot de passe ou l'adresse e-mail</p>
          <p v-if='getStatus=="create"'>Adresse e-mail déjà utilisée</p>
        </div> 
         {{message}}
  </div>
</template>

<script>
// @ is an alias to /src
//import { Form, Field } from 'vee-validate';

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
      message:'',
      disabledButton:true,
      passwordRegex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/i,
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
    getError(){
      return this.$store.state.errorStatus;
    }
  },
  methods:{
    //verifier que l'élément saisi est bien un email
    validEmail(value){
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return false;
      }
      else{
        return true;
      }
    },
    //verifier que le mot de passe saisi respecte le patern
    validPassword(value){
      const regex = this.passwordRegex;
      if(value.length<10){
        console.log('trop court')
        return false
      }else if (!regex.test(value)) {
        console.log('pattern non respecté')
        return false;
      }
      else{
        return true;
      }
    },
    //afficher / masquer le mot de passe
    switchPassword(){
      return this.typePassword='password';
    },
    switchText(){
      return this.typePassword='text';
    },
    //pour se connecter
    logAccount(){
      const $this=this;
      //console.log('email: '+this.email+' mdp: '+this.password)
      this.$store.state.errorStatus=false; // on réinitialise l'erreur
      this.$store.dispatch('storeLogAccount',{
        email:this.email,
        password:this.password
      })
      .then(function(){ //response une fois le résultat de storeCreateAccount reçu
        //console.log('home.vue');
        //console.log(response.data); // on reçoit bien les infos du backend et donc de la db 
        //  this is undefined => on crée $this pour y avoir accés
        $this.$router.push('Logged'); // on accéde à la route 'Logged' soit avec son nom soit avec le chemin relatif '/logged'
        $this.getAllPublications();
      })
      .catch(function(error){
        console.log('home.vue');
        console.log(error.message);
        })//s'il y a une erreur
    },
    //pour créer le compte
    createAccount(){
      //console.log('email: '+this.email+' mdp: '+this.password+' nom: '+this.name+' prenom: '+this.firstname)
      if(this.validPassword(this.password)==false){
         return this.message='le mot de passe ne respecte pas le format : min 10 caractére au moins 1 lettre, 1 chiffre, 1 caractère spécial'
      }
      if(this.validEmail(this.email)==false){
         return this.message="le format de l'email est invalide"
      }
      else{
        const $this=this;
        this.$store.state.errorStatus=false; // on réinitialise l'erreur
        this.$store.dispatch('storeCreateAccount',{
          email:this.email,
          password:this.password,
          name:this.name,
          firstname:this.firstname
        })
        .then(function(response){ // une fois le résultat de storeLogAccount reçu
          console.log('home.vue');
          console.log(response);
          $this.logAccount();
          
        })      
        .catch(function(error){
          console.log('home.vue');
          console.log(error.message);
          })//s'il y a une erreur
      }
    },
    //pour redemander un mot de passe
    askPassword(){
      if(this.validEmail(this.email)==false){
        console.log('email invalide')
      }
      else{
        console.log('email: '+this.email)
      }
    },
    getAllPublications(){
      let $this=this
      this.$store.dispatch('storeGetAllPublications')
      .then(function(res){
        $this.$store.state.publications=(res.data);
        console.log('home>publications');
        console.log(res.data)
      })
      .catch(function(error){
        console.log(error.message)
      })   
    },
    mounted:function(){      //lors de la création de la vue on vérifie que le rang est différent de -1 car -1= déconnecté
   //         const $this=this;
            if(this.$store.state.user.rank!=-1){
                this.$router.push('/logged');
                console.log(this.$store.state.user);
                this.$store.state.operatingStatus='logged';
                return;     // pour désactiver la suite du code si on est considéré comme déconnecté
            }
  },
  } 


}
</script>

<style scoped>
div{
  width:90%;
  margin:auto;
  padding:5px;
  background-color: blue;
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


