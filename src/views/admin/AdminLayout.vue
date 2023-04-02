<template>
    <div>
    
        <AdminNav/>
        <button @click="deleteToken">Deconnexion</button>
    </div>
    <RouterView />

</template>
<script>

import AdminNav from '../../components/AdminNav.vue';
export default{
    name: "adminLayout",
    components: { AdminNav },
    methods:{
    deleteToken() {
      localStorage.removeItem('token');
      this.$router.push("login")
    }
}
}
</script>