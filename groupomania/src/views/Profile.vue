<template>
    <div>
        <div>
            <button class='danger' @click="askForConfirmation">Supprimer le profil</button>
            <div v-if='asked==true'>
                <p>Êtes vous sûr de vouloir supprimer votre profil ?</p>
                <p>Aucun retour en arrière ne sera possible</p>
                <router-link to='/' class='danger' @click='deleteProfile' :disabled='isDisabled'>Valider</router-link>
                <button class='cancel' @click='cancelDelete'>Annuler</button>
                <router-view />
            </div>
        </div>

        <label title='attention il sert à votre identification'> Votre Email 
            <input v-model='user.email' :disabled='isDisabled'>
        </label>
        <label>Votre Nom
            <input v-model='user.name' :disabled='isDisabled'>
        </label>
        <label>Votre prénom
            <input v-model='user.firstname' :disabled='isDisabled'>
        </label>
        <input v-model='user.service' :disabled='isDisabled'>
        <!--<input :v-model='user.rank' :disabled='isDisabled'>-->
        <label>Parlez nous de vous
            <textarea v-model='user.description' :placeholder="placeholder"></textarea>
        </label>
        <label>Modifier votre mot de passe
            <input v-if='isDisabled==false' v-model='user.password' :rule='validPassword'>
        </label>
        <p>email: {{ user.email }}</p>
        <div v-if="isDisabled==true">
            <button @click="activer" >Modifier le profil</button>
        </div>
        <div v-else>
            <div v-if="disabledButton==true">Le mot de passe est trop court ou ne respecte pas la casse et ne sera pas mis à jour</div>
            <div v-else>Le mot de passe sera mis à jour à la validation</div>
            <button @click='updateProfile'>mettre à jour</button>
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
                password:'',
            },
            initUser:'',
            placeholder:'Parlez nous de vous',
            isDisabled:true,
            asked:false,
            disabledButton:true,
            passwordRegex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/i,
        }
    },
    created:function(){
        localStorage.setItem('init',JSON.stringify(this.$store.state.initUser));
        this.user=this.$store.state.userInfo;
    },
    methods:{
        activer(){
            return this.isDisabled=false;
        },
        cancel(){   
            this.$store.state.userInfo=JSON.parse(localStorage.getItem('init'));
            this.user=this.$store.state.initUser;
            this.isDisabled=true;
        },
        askForConfirmation(){
            return this.asked=true;
        },
        cancelDelete(){
            return this.asked=false;
        },
        deleteProfile(){
            this.$store.dispatch('storeDeleteAccount',
                this.$store.state.user.id
            )
        },
        updateProfile(){
            localStorage.setItem('user',JSON.stringify(this.user));
            console.log(JSON.parse(localStorage.getItem('user')));
            this.$store.dispatch('storeUpdateAccount',
                {
                    userId:this.$store.state.user.id
                } 
            )
        },
        validPassword(value){
            const regex = this.passwordRegex;
            console.log('validPassword: '+value)
            if(value.length<10){
                console.log('trop court')
                return this.disabledButton=true
            }else if (!regex.test(value)) {
                console.log('pattern non respecté')
                return this.disabledButton=true;
            }
            else{
                return this.disabledButton=false;
            }
        }
    }
}
</script>

<style scoped>
.danger{
    background-color: red;
    color:black;
}
label{
display: inline-block;
width:100%;
}
</style>