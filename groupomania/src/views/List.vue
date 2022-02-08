<template>
    <div class='edition'>
        <p class='masked'>{{ publication._id }}</p>
        <p>Auteur: {{ publication.userId }}</p>
        <p>Date :{{ publication.date }}</p>
        <p>Titre: {{ publication.title }}</p>
        <p>{{ publication.texte }}</p>
        <p><button @click="commenter">Commenter</button></p>
        <ul class='comment'>Commentaires
            <li v-if='commenting==true'>
                <input type="text" maxlength="150" v-model="newComment">
                <p>
                    <button @click="toComment" :value='publication._id'>valider</button>
                    <button @click="notComment" >annuler</button>
                </p>
            </li>
            <li v-for='comment in comments' :key='comment._id' class='commentlist'>
                <p>Auteur: {{ comment.userId }}</p>
                <p class='masked'>{{ comment._id }}</p>
                <p>{{ comment.texte }}</p>
                
            </li>
        </ul>
        
    </div>    
</template>

<script>
export default {
    name:'list',
    data(){
        return{
            publication:{},
            comments:[],
            commenting:false,
            newComment:"",
        }
    },
    mounted:function(){
        let $this=this;
        console.log('toto');
        let id=localStorage.getItem('publicationalister');
        console.log(localStorage.getItem('publicationalister'));
        this.$store.dispatch('storeGetOnePublication',id)
        .then(function(res){
            console.log('list get publication ')
            console.log(res.data);
            $this.publication=res.data
            $this.$store.dispatch('storeGetComments',id)
            .then(function(res){
                console.log('list get comment');
                console.log(res.data);
                $this.comments=res.data;
            })
        })
    },
    methods:{
        toComment(e){
            const $this=this;
            this.$store.dispatch('commentPublication',{
                userId:JSON.parse(localStorage.getItem('user')).userId,
                //makerId:JSON.parse(localStorage.getItem('user')).userId,
                publicationId:e.target.value,
                date:Date.now(),
                texte:this.newComment,
            })
            .then(function(){
                $this.$router.push('/logged')
            })
        },
        commenter(){
            return this.commenting=true;
        },
        notComment(){
            this.$router.push('/logged')
        }
    }
}
</script>

<style scoped>
p{
    width: 90%;
    margin:auto;
}
button{
    width: max-content;
    display: block;
    margin:auto;
}
input{
    width:100%
}
</style>