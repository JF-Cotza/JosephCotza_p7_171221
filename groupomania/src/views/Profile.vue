<template>
    <div>
        <input v-model='email'>
        <input v-model='name'>
        <input v-model='firstname'>
        <input v-model='service'>
        <input v-model='rank'>
        <textarea v-model='description' :placeholder="placeholder"></textarea>
        <img :src='avatar'>
        <input v-model='password'>
    </div>
</template>

<script>
export default {
    name:'Profile',
    datas(){
        return{
            email:'',
            name:'',
            firstname:'',
            service:'',
            rank:'',
            description:'',
            placeholder:'Parlez nous de vous',
            avatar:'',
            password:'',
        }
    },
    mounted:{
        getProfile(){
        //const $this=this;
        //console.log('email: '+this.email+' mdp: '+this.password)
        this.$store.state.errorStatus=false; // on réinitialise l'erreur
        this.$store.dispatch('storeGetAccount')
        .then(function(response){ 
            console.log('profile.vue');
            console.log(response.data); // on reçoit bien les infos du backend et donc de la db 
            //  this is undefined => on crée $this pour y avoir accés
            
        })
        .catch(function(error){
            console.log('profile.vue');
            console.log(error.message);
            })//s'il y a une erreur
        },
    }
}
</script>

<style scoped>

</style>