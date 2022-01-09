<template>
    <div>
        <ul>
            <li>{{ getUser.id }}</li>
            <li>{{ getUser.token }}</li>
            <li>{{ getUser.rank }}</li>  
        </ul>
    </div>
</template>

<script>
export default {
    name:'connected',
    mounted:function(){      //lors de la création de la vue on vérifie que le rang est différent de -1 car -1= déconnecté
            if(this.$store.state.user.rank==-1){
                this.$router.push('/');
                console.log(this.$store.state.user);
                this.$store.state.operatingStatus='log';
                return;     // pour désactiver la suite du code si on est considéré comme déconnecté
            }
            this.$store.dispatch('storeGetUser')
    },
    computed:{
        getUser(){
            return this.$store.state.user;
        }
    }
}
</script>