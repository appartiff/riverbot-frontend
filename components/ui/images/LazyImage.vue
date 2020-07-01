<template>
    <img v-lazy="this.src" :alt="this.alt"/>
</template>

<script>
    export default {
        props:{
            src:{
                type:String,
                required:true,
            },
            alt:{
                type:String,
                required:true,
            }
            
        }
    }
</script>

<style scoped>

</style>