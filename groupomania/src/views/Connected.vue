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
            const $this=this;
            if(this.$store.state.user.rank==-1){
                this.$router.push('/');
                console.log(this.$store.state.user);
                this.$store.state.operatingStatus='log';
                return;     // pour désactiver la suite du code si on est considéré comme déconnecté
            }
            this.$store.dispatch('storeGetProfile', this.$store.state.user.id)
            .then(function(res){
                /*let userInfo={  
                email:this.$store.state.userInfo.email,
                name:this.$store.state.userInfo.name,
                firstname:this.$store.state.userInfo.firstname,
                service:this.$store.state.userInfo.service,
                rank:this.$store.state.userInfo.rank,
                description:this.$store.state.userInfo.description,
                avatar:this.$store.state.userInfo.avatar,
                password:this.$store.state.userInfo.password
                }*/
                //console.log('mounted storeGetProfile .then res');
                console.log(res);
                //console.log('store');
                if($this.$store.state.userInfo)
                    {console.log($this.$store.state.userInfo)}
                else{
                    console.log('void')
                }
            })
    },
    computed:{
        getUser(){
            return this.$store.state.user;
        }
    }
}
</script>