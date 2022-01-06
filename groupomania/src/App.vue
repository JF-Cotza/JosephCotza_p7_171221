<template>
  <div>
     <div id="nav" v-if='getUser.token==""'>
      <router-link class="link" to="/" v-if="getStatus !='log'" @click='setStatusLog'>Home</router-link>
      <router-link class="link" to="/signin" v-if="getStatus !='create'" @click='setStatusCreate'>S'enregistrer</router-link> 
      <router-link class="link" to="/lostpassword" v-if="getStatus !='lost'" @click='setStatusLost'>Mot de passe perdu</router-link>
      <router-link class="link" to="/about" v-if="getStatus !='about'" @click='setStatusAbout'>About</router-link>
    </div>
    <div id="nav" v-else>
      <router-link class="link" to="/logged" @click='setStatusConnected'>Connecté</router-link>
      <router-link class="link" v-if='getRank==2' to="/admin" @click='setStatusAdmin'>Admin</router-link>
      <router-link class="link" to="/profile" @click='setStatusProfile'>Modifier Mon Profil</router-link>
      
      <!--<router-link to="/" v-if="getStatus !='log'">Home</router-link> |
      <router-link to="/signin" v-if="getStatus !='create'" @click='setStatusCreate'>S'enregistrer</router-link> |
      <router-link to="/lostpassword" @click='setStatusLost'>Mot de passe perdu</router-link> |
      <router-link to="/logged" @click='setStatusCreate'>Connecté</router-link> |
      <router-link to="/about">About</router-link>-->
    </div>
    <router-view /> 
  </div>  
</template>

<script>
export default{
  methods:{
    setStatusCreate(){
      this.$store.state.operatingStatus='create';
    },
    setStatusLog(){
      this.$store.state.operatingStatus='log';
    },
    setStatusLost(){
      this.$store.state.operatingStatus='lost';
    },
    setStatusAbout(){
      this.$store.state.operatingStatus='about';
    },
  },
  computed:{
    getUser(){
      return this.$store.state.user;
    },
    getStatus(){
      return this.$store.state.operatingStatus;
    },
    getRank(){
      return this.$store.state.user.rank;
    },
  }
}

</script>




<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: black;
    text-decoration: none;

    &.router-link-exact-active {
      color: white;
    }
  }
}

.link{
  background: silver;
  padding: 5px;
  border:1px solid black;
  border-radius: 5px;
  margin:5px;
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


</style>
