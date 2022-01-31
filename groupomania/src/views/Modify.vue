<template>
    <div class='edit'>
        <p>Créateur: {{ userId }}</p>
        <p>Date de création: {{ date }}</p>
        <p>Status:{{ status }} </p>
        <p>{{ texte.length }} /150</p>
        <input type='text' v-model='title'  :placeholder="getSingle.title">
        <textarea type='text' v-model='texte' maxlength='150' :placeholder="getSingle.texte"></textarea>
        <div class='btn'>
            <button class="ok" @click='edit'>Valider</button>
            <button class='no' @click='cancel'>Annuler</button>
        </div>        
        image: {{ getSingle.file }}
    </div>
</template>

<script>
export default {
    name:'modify',
    data(){
        return {
            publicationId:'',
            userId:'',
            date:'',
            status:'',
            title:'',
            texte:'',
            file:{}
        }
    },
    mounted:function(){
        console.log('singlepublication')
        const single=this.$store.state.singlePublication
        localStorage.setItem('singlePublication',JSON.stringify(single))
        this.publicationId=single._id;
        this.userId=single.userId;
        this.date=single.date;
        this.status=single.status;
        this.title=single.title;
        this.texte=single.texte;
        this.file=single.file;

    },
    computed:{
        
    },
    methods:{
        getSingle(){
            const single=this.$store.state.singlePublication
            localStorage.setItem('singlePublication',JSON.stringify(single))
            this.publicationId=single._id;
            this.userId=single.userId;
            this.date=single.date;
            this.status=single.status;
            this.title=single.title;
            this.texte=single.texte;
            this.file=single.file;
        },
        cancel(){
            this.$store.state.singlePublication= JSON.parse(localStorage.getItem('singlePublication'));
            this.getAllPublications();
            this.$router.push('/logged');
        },
        edit(){
            const $this=this;
            this.$store.dispatch('updatePublication',{
                _id: this.publicationId,
                userId: this.userId,
                date: this.date,
                status: 2, //updated
                title: this.title,
                texte: this.texte,
                file:this.file
            })
            .then(function(res){
                console.log('res');
                console.log(res);
                localStorage.removeItem('singlePublication')
                $this.getAllPublications();
                $this.$router.push('/logged');
            })
        },
        getAllPublications(){
            let $this=this
            this.$store.dispatch('storeGetAllPublications')
            .then(function(res){
                $this.$store.state.publications=(res.data);
                console.log('home>publications');
                console.log(res.data)
            })
            .catch(function(error){
                console.log(error.message)
            })   
        },
    }
}
</script>

<style scoped>
.edit{
    display: flex;
    flex-direction: column;
    width: 50%;
    min-width: 300px;
    margin:auto;
}

.edit *{
    width:90%;
    margin:5px auto;
}
.edit .btn
{
    display: flex;
    justify-content: space-between;
}

.edit .btn button{
    width:45%;
    height: 30px;
    border-radius:15px;
    font-weight: bold;
}

.ok{
    background: green;
}

.no{
    background: red;
}
</style>