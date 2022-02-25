<template>
    <div>
        <input type="file" name="image" id="image" @change='thumb'>
        <div v-if="imageVue!=''">
            <img :src="imageVue" alt="aperçu de l'image sélectionné">
            <button @click="suppress">Supprimer</button>
        </div>
        <button @click='send' v-if="toImport==true">valider</button>
    </div>
</template>

<script>
export default {
    name:'Testing',
    data(){
        return{
            toImport:false,
            imageVue:'',
            fileImport:'void'
        }
    },
    methods:{
        thumb(e){
            let file0=e.target.files[0];
            let image=document.getElementById('image');
            this.fileImport=file0;
            
            let reader=new FileReader();
            reader.onload=e=>{
                this.imageVue=e.target.result;
                localStorage.setItem('image1',this.imageVue);
            }    

            console.log('file0');
            console.log(file0);
            console.log(this.fileImport);
            console.log('imageVue');
            //console.log(this.imageVue);
            reader.readAsDataURL(this.fileImport);
            if(image.files.length==0 || file0.size==0){
                this.toImport=false;
                console.log('length false : '+ this.toImport);
                image.value='';
            }
            else{
                this.toImport=true;
                console.log('length true : '+ this.toImport);
            }

        },
        send(){
            let image=document.getElementById('image');
            let imageValue=image.value;
            let file0=image.files[0];
            console.log(image);
            console.log(imageValue);
            console.log(file0 );
        },
        suppress(){
            this.toImport=false,
            this.imageVue='';
            this.fileImport='void';
            localStorage.removeItem('image1');
            document.getElementById('image').value='';
        }
    }
}
         
</script>

<style  scoped>
img{
    width:250px;
    height: auto;
    margin:auto;
}
</style>