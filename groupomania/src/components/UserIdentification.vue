<template>
    <div>
        <input type="email" v-model='email' placeholder="Votre email pro">
        <input type="text" v-model='name' placeholder="Votre nom">
        <input type="text" v-model='firstname' placeholder="Votre prénom">
        <input type="password" v-model='password' placeholder="saisissez votre mot de passe">
    </div>
</template>

<script>
export default {
  name: 'UserIdentification',
  data() {
      return{    
        email: '',
        name: '',
        firstname:'',
        password:'',
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div{
    width:75%;
    margin:auto;
    background: lightblue;
}

input{
    width: 90%;
    margin:5px 5%;
    padding: 5px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
