<template>
    <div>
            <router-link to='Testing'>test image seule</router-link>
            <p>Title<input v-model='title'></p>
            <p>{{ texte.length }}/150</p>
            <label>Ajouter une image </label>
            <div v-if="fileUpdated.size!=0">
                <div v-if='fileUrl.length>0'>
                <br>
                    <img :src="fileUrl" alt="import image">
                <br>
                    <button @click='removeImage'>Annuler</button>
                </div>
                <input v-else name='originalFile' type='file' @change='fileName' />
            </div>
            <input v-else type='file' name='originalFile' @change='fileName' />
            
            <p>
                <textarea v-model='texte' :title='texte.length' maxlength="150"></textarea>
            </p>
            
            <button @click='creer' :disabled='isDisabled'>Valider</button>
        <router-view></router-view>
    </div>    
</template>

<script>
//test dans la page
export default {
    name:'NewEdition',
    data(){
        return{
            title:'',
            texte:'',
            fileUrl:'',
            fileUpdated:'void',
        }
    },
    computed:{
        isDisabled(){
            if(this.fileUpdated!='void' || this.texte!=''){
                return false
            }
            else {
            return true
            }
        },
    },
    methods:{
        fileName(e){
            console.log('fileName')
            if(e.target.files.length===0){
                console.log('file length = 0')
                return;
            }
            if(e.target.files[0].size===0)
            {
                console.log('fichier vide')
                this.fileUpdated.size=0;
                return ;    
            }
            console.log(e.target.files[0].size);
            let fileToUpdate=e.target.files[0];
            
            console.log('fileToUpdate')
            console.log(fileToUpdate);
            console.log(JSON.stringify(fileToUpdate));
            
            this.fileUpdated=fileToUpdate
            // stockage file en localStorage 
            if(fileToUpdate.type.indexOf('image')<0){
                console.log('type invalide');
                this.fileUpdated.size=0;
                return ;
            }

            console.log(this.fileUpdated)
            
            let reader=new FileReader();
            reader.onload=e=>{
                this.fileUrl=e.target.result;
                localStorage.setItem('image1',e.target.result);
            }            
            reader.readAsDataURL(fileToUpdate)
            
            localStorage.setItem('image',fileToUpdate);
            localStorage.setItem('stringifiedImage',JSON.stringify(fileToUpdate))
            console.log('ls image')
            console.log(localStorage.getItem('image'));
            console.log('ls stringified');
            console.log(localStorage.getItem('stringifiedImage'))
            
            this.$store.state.user.file=fileToUpdate

        },
        removeImage(){
            this.fileUrl='',
            this.fileUpdated='void'
            localStorage.removeItem('image')
            localStorage.removeItem('image1')
            localStorage.removeItem('stringifiedImage')
        },
        creer(){
            let date=new Date();
            let publication={
                maker:JSON.parse(localStorage.getItem('user')).userId,  //ok
                date:date,                                              //ok
                title:this.title,                                       //ok
                texte:this.texte,                                       //ok
                where:'newEdition.vue'                                  //ok
                }
            if(this.fileUpdated!='void')
            {
                console.log('file not void');
                console.log(this.fileUpdated);
                publication.file=this.fileUpdated;
            }
            else{
                console.log('no file updated')
            }
                //file:localStorage.getItem('toto'),
                //url:this.fileUrl,
                
                
            this.$store.dispatch('storeCreatePublication',publication)
        },
    
    }//fermeture methods
//
}
</script>

<style lang="scss" scoped>

</style>