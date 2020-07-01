<template>
    <div></div>
</template>

<script>
    export default {
        props: {
            hamburgerProp:Boolean
        },
        methods: {
            handleScroll()
            {
                if ((document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) && !this.hamburgerProp)
                {
                    this.setScrolled();
                } else {
                    this.removeScrolled()
                }
            },
            setScrolled()
            {
                document.getElementById("nav").classList.add("scrolled");
            },
            removeScrolled()
            {
                document.getElementById("nav").classList.remove("scrolled");
            }
        },
        watch:{
          hamburgerProp:function () {
              this.handleScroll();
          }
        },
        mounted() {
            window.addEventListener("scroll", this.handleScroll);
        },
        destroyed() {
            window.removeEventListener("scroll", this.handleScroll);
        }
    }
</script>

<style scoped>

</style>
