<template>
    <div>
        
        <input v-model='user.email' :disabled='isDisabled'>
        <input v-model='user.name' :disabled='isDisabled'>
        <input v-model='user.firstname' :disabled='isDisabled'>
        <input v-model='user.service' :disabled='isDisabled'>
        <!--<input :v-model='user.rank' :disabled='isDisabled'>-->
        <textarea v-model='user.description' :placeholder="placeholder"></textarea>
        <img :src='user.avatar' :disabled='isDisabled'>
        <input v-if='isDisabled==false' v-model='user.password'>
        <p>email: {{ user.email }}</p>
        <div v-if="isDisabled==true">
            <button @click="activer" >Modifier le profil</button>
        </div>
        <div v-else>
            <button @click='update' >mettre à jour</button>
            <button @click='cancel' type='reset'>annuler</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'Profile',
    data(){
        return{
            user:{
                email:'',
                name:'',
                firstname:'',
                service:'',
                rank:'',
                description:'',
                avatar:'',
                password:'',
            },
            initUser:'',
            placeholder:'Parlez nous de vous',
            isDisabled:true,
        }
    },
    created:function(){
        this.initUser=this.$store.state.initUser;
        this.user=this.$store.state.userInfo;
        console.log('created')
        console.log(this.initUser);
        console.log(this.user);
    },
    computed:{
        
    },
    methods:{
        activer(){
            return this.isDisabled=false;
        },
        cancel(){   
            this.$store.state.userInfo=this.$store.state.initUser
            this.user=this.$store.state.initUser;
            this.isDisabled=true;
        },
    }
}
</script>

<style scoped>

</style>