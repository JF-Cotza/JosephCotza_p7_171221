<template>
  <div>
     <div id="nav" v-if='this.$store.state.user.rank==-1'>
      <router-link class="link" to="/" v-if="getStatus !='log'" @click='setStatusLog'>Home</router-link>
      <router-link class="link" to="/signin" v-if="getStatus !='create'" @click='setStatusCreate'>S'enregistrer</router-link> 
      <router-link class="link" to="/lostpassword" v-if="getStatus !='lost'" @click='setStatusLost'>Mot de passe perdu</router-link>
      <router-link class="link" to="/about" v-if="getStatus !='about'" @click='setStatusAbout'>About</router-link>
    </div>
    <div id="nav" v-else>
      <router-link class="link" to="/logged" @click='setStatusConnected'>Connecté</router-link>
      <router-link class="link" v-if='getRank==2' to="/admin" @click='setStatusAdmin'>Admin</router-link>
      <router-link class="link" to="/profile">Mon Profil</router-link>
      <button class="link" @click="disconnect" >déconnecter</button>
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
    disconnect(){
      this.$store.state.user.rank=-1;//sinon même déconnecté les boutons du mode de connexion apparaissent
      this.$store.commit('logout');
      this.$router.push('/');
    },
    setStatusConnected(){
      localStorage.removeItem('publicationalister');
    }
  },
  created:function(){
    return this.tokenExist=this.$store.state.user.token;
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

li{
    list-style: none;
}
.edition{
    border:1px solid blue;
    background: cadetblue;
    width: 50%;
    min-width: 300px;
    margin: 5px auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.edition>*{
    width: 95%;
    margin: auto;
    text-align: left;
}

.edition div{
    display: flex;
    justify-content: space-between;
}

.edition div button{
    width:fit-content;
}

.comment{
    width: 50%;
    min-width: 300px;
    margin: 5px auto;
    padding: 5px;
    display: flex;
    flex-direction: column;
    background: yellow;
}


.comment input, .commentlist{
    width: 90%;
    margin: 5px auto;
    background: red;
}

.new{
    background: green;
}

.masked {
  display:none,
}

a{
  text-decoration: none;
}
</style>
