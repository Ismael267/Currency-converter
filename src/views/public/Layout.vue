<template>
    <div>
        
        <PublicNav/>
       
    </div>
    <RouterView />
</template>

<script>
import PublicNav from '../../components/PublicNav.vue';

export default{

    name:"layout",
     components:{
        PublicNav
     }
}

</script>