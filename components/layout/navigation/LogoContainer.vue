<template>
  <transition name="slide">
    <nuxt-link to="/" :class="'mobile ? logo-container-mobile : logo-container'">
      <img src="/img/logo.PNG" alt="logo" style="padding-right: 0.5em">
      River
      <span>Bot</span>
    </nuxt-link>
  </transition>
</template>

<script>
    export default {
        name: "LogoContainer",
      props:{
          mobile:{
            required:true,
            type: Boolean
          }
      }
    }
</script>

<style scoped>
  .logo-container-mobile, .logo-container {
    font-size: 1.414rem;
    color: white;
    display:flex;
    align-items: center; /* Vertical center alignment */
    justify-content: center; /* Horizontal center alignment */
  }

  .logo-container-mobile {
    padding: 0 1rem;
  }

  /*Logo items*/
  .logo-container *, .logo-container-mobile * {
    margin: 0.1em;
  }

  .logo-container > span, .logo-container-mobile > span {
    color: #6af4f5;
    font-size: 1.414rem;
  }
  .logo-container img, .logo-container-mobile img {
    height: 2.0em;
  }

</style>
