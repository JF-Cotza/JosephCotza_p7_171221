<template>
  <div>
     <div id="nav" v-if='getSiteStatus=="out"'>
      <router-link to="/" v-if="getStatus !='log'">Home</router-link> |
      <router-link to="/signin" v-if="getStatus !='create'" @click='setStatusCreate'>S'enregistrer</router-link> |
      <router-link to="/lostpassword" @click='setStatusLost'>Mot de passe perdu</router-link> |
      <router-link to="/logged" @click='setStatusCreate'>Connecté</router-link> |
      <router-link to="/about">About</router-link>

    </div>
    <div id="nav" v-else>
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
  },
  computed:{
    getSiteStatus(){
      return this.$store.state.siteStatus;
    },
    getStatus(){
      return this.$store.state.operatingStatus;
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
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
