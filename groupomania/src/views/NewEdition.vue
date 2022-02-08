<template>
    <div>

            <p>Title<input v-model='title'></p>
            <p>{{ texte.length }}/150</p>
            <input type='file' @change='fileName'>
            <p><textarea v-model='texte' :title='texte.length' maxlength="150"></textarea></p>
        
            <button @click='creer'>Valider</button>
    
    </div>    
</template>

<script>
export default {
    name:'NewEdition',
    data(){
        return{
            title:'',
            texte:'',
            urlimage:{},
            urlfile:{},
        }
    },
    methods:{
        fileName(e){
           // this.urlfile=e.target.files[0];            
            let file=e.target.files[0] || e.dataTransfer.file;   
            let reader=new FileReader();
            let image=new Image();
            //let $this=this;

            console.log('file');
            console.log(file);
            
            this.urlfile=file;
            reader.onload=(e)=>{
                image=e.target.result;
                //console.log('onload');
                //console.log(image)
                return this.urlimage=image;
            }
            reader.readAsDataURL(this.urlfile);
            
            console.log('createImage');
            console.log(image);
            console.log('urliImage');
            console.log(this.urlimage)
        },
        removeImage(){
            this.urlimage=''
        },
        creer(){
            let date=new Date();
            /*
            console.log('createur: '+this.$store.state.user.id);
            console.log('date de création: '+date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+'-'+date.getHours()+':'+date.getMinutes());
            console.log('title: '+this.title);
            console.log('texte: '+this.texte);
            console.log('image: '+this.urlimage);
            */
            let publication={
                maker:this.$store.state.user.id,
                date:date,
                title:this.title,
                texte:this.texte,
                //image:this.urlimage,
                file:this.urlfile,
            }
            console.log('newEditions>publication');
            console.log(publication);
            let id=this.$store.state.user.id;
            localStorage.setItem('publication',JSON.stringify(publication));
            this.$store.dispatch('storeCreatePublication', {
                id, 
                publication}
                )
        }
    }
}
</script>

<style lang="scss" scoped>

</style>