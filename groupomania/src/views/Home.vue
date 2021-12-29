<template>
  <div class="home">

      <UserIdentification />
  </div>
</template>

<script>
// @ is an alias to /src

import UserIdentification from '@/components/UserIdentification.vue'


export default {
  name: 'Home',
  components: {
    UserIdentification
  }
}
</script>
