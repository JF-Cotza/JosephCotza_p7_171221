<template>
    <div>        
        <ul>
            <router-link to='/newedition'>Creer un post</router-link>
            <!--<router-link to='/listpublication'> List</router-link>-->
            <li>{{ getUser.id }}</li>
            <li>{{ getUser.token }}</li>
            <li>{{ getUser.rank }}</li>
            <li>publication</li>  
            <li v-for="publication in getPublications" :key='publication._id'>
                <div class='edition'>
                    <div>
                        <h3>{{ publication.title }}</h3>
                        <button v-if="publication.userId==getUser.id" @click='modifier' :value='publication._id'>Modifier</button>
                    </div>
                    <p>publication id {{ publication._id}}</p>       
                    <p>Auteur: {{ publication.userId}}</p>
                    <p>Date: {{ publication.date }}</p>
                    <p>{{ publication.texte}}</p>
                    <p><button @click="commenter">Ajouter un commentaire</button></p>
                </div>
                <div>
                    <p>Commentaires</p>
                </div>
                <div v-if="comment==true" class='comment new'>
                    <span>{{ newComment.length }}</span>
                        <input type="text" v-model="newComment" maxlength=150>
                    <div>
                        <button @click='toComment' :value='publication._id'>Envoyer</button>
                        <button @click='notComment'>Annuler</button>
                    </div>
                </div>
            </li>
        </ul>
        <router-view />
    </div>
</template>

<script>
export default {
    name:'connected',
    data(){
        return{
            publications:{},
            comment:false,
            newComment:'',
            //value:'',
        }
    },
    mounted:function(){      //lors de la création de la vue on vérifie que le rang est différent de -1 car -1= déconnecté
            const $this=this;
            if(this.$store.state.user.rank==-1){
                this.$router.push('/');
                console.log(this.$store.state.user);
                this.$store.state.operatingStatus='log';
                return;     // pour désactiver la suite du code si on est considéré comme déconnecté
            }
            /*
            console.log('connected>mounted>rank!=-1');
            console.log(this.$store.state.user.id);
            */
            this.$store.dispatch('storeGetProfile', this.$store.state.user.id)

            .then(function(){
                /*let userInfo={  
                email:this.$store.state.userInfo.email,
                name:this.$store.state.userInfo.name,
                firstname:this.$store.state.userInfo.firstname,
                service:this.$store.state.userInfo.service,
                rank:this.$store.state.userInfo.rank,
                description:this.$store.state.userInfo.description,
                avatar:this.$store.state.userInfo.avatar,
                password:this.$store.state.userInfo.password
                }
                console.log('mounted storeGetProfile .then res');
                console.log(res);*/
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
        },
        getPublications(){
            return this.$store.state.publications;
        }
    },
    methods:{
        modifier(e){
            const $this=this;
            this.$store.dispatch('storeGetOnePublication', e.target.value)
            .then(function(res){
                console.log('connected>modifier>then');
                $this.singlePublication=res;
                $this.$router.push('/modify');
            })
            .catch(function(error){
                console.log(error.message)
            })
        },
        toComment(e){
            //const $this=this;
            this.$store.dispatch('commentPublication',{
                userId:JSON.parse(localStorage.getItem('user')).userId,
                //makerId:JSON.parse(localStorage.getItem('user')).userId,
                publicationId:e.target.value,
                date:Date.now(),
                texte:this.newComment,
            })
        },
        commenter(){
            return this.comment=true;
        }
    },
}
</script>

<style scoped>
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
}

.comment input{
    width: 90%;
    margin: auto;
}

.new{
    background: green;
}
</style>