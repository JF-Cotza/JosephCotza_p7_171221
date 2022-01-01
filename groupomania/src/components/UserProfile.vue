<template>
    <div>
        <fieldset>
            <legend>Vous</legend>
                <input type="text" v-model='name' placeholder="Votre Nom">
                <input type="text" v-model='firstname' placeholder="Votre Prénom">
                <input type="text" v-model='service' placeholder="service">
        </fieldset>
        <fieldset>
            <legend>Vos contact</legend>
                <input type="email" v-model='email' placeholder="votre mail">
                <input type="tel" v-model='phone' pattern="[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}" placeholder="Votre N° de téléphone">
        </fieldset>
        <fieldset>
            <legend>Votre Avatar</legend>
                <img src="" alt="votre avatar">
                <input type="file"><button>importer un nouvel avatar</button>
        </fieldset>
        <fieldset>
            <legend>Parlez nous de vous</legend>
                <textarea name="" id="" cols="30" rows="10"></textarea>
        </fieldset>
    </div>
</template>

<script>
export default {
    name:'UserProfile'
        
}
</script>