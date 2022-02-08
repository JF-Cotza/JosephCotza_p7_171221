<template>
    <div>        
        <ul>
            <router-link to='/newedition'>Creer un post</router-link>
            <li>{{ getUser.id }}</li>
            <li>{{ getUser.token }}</li>
            <li>{{ getUser.rank }}</li>
            <li>publication</li>  
            <li v-for="publication in getPublications" :key='publication._id' class='publication_li'>
                <button v-if="publication.userId==getUser.id" @click='modifier' :value='publication._id' class='publication_button'>Modifier</button>
                <router-link to='/list' class='edition' @click="listComment(publication._id)">
                    <h3>{{ publication.title }}</h3>
                    <p class='masked'>{{ publication._id}}</p>       
                    <p>Auteur: {{ publication.userId}}</p>
                    <p>Date: {{ publication.date }}</p>
                    <p class='texte'>{{ publication.texte}}</p>                 
                </router-link>
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
            listOfComments:[],
            listOrderer:[],
            listUnOrderer:[],
            listingComments:false,
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
            this.$store.dispatch('storeGetProfile', this.$store.state.user.id)
            .then(function(){
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
        },
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
        listComment(value){
            localStorage.setItem('publicationalister', value);
            console.log(value)
            //let $this=this;
            this.$store.dispatch('storeGetComments',value)
            .then(function(res){
                console.log('listComment>then')
                console.log(res.data);
                if(res.data[0])
                {
                    let id=res.data[0].publicationId;
                    localStorage.setItem(id, res.data);
                }
            })
        }    
    },
}
</script>

<style scoped>
h3{
    margin:5px 0;
    background: burlywood;
    width: 100%;
}
.publication_li{
    position:relative;
    width:50%;
    min-width: 300px;
    margin: auto;
}

.publication_button{
    z-index: 1;
    position: absolute;
    top:5px;
    right: 1rem;
}
.texte{
    background: white;
    margin:5px 5px;
}
</style>