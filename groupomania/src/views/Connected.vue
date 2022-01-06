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
    computed:{
        getUser(){
            return this.$store.state.user;
        }
    }
}
</script>