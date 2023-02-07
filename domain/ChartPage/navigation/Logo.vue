<template>
  <div class="nav-list-item">
    <div class="nav-brand-container">
      <router-link v-if="this.showSidebar" to="/" class="logo-container">
        <img src="https://d1x5w42ls10wrx.cloudfront.net/valknut-blue-website-min.png" alt="logo">
      </router-link>
      <div v-else class="hamburger" @click="toggleShow">
        <font-awesome-icon icon="bars"/>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        computed: {
            ...mapState('scannerUI', ['showSidebar']),
        },
        methods:
            {
                ...mapActions('scannerUI', [ 'setSidebarShow']),
                toggleShow:function()
                {
                    let opposite = !this.showSidebar;
                    this.setSidebarShow(opposite);
                },
            }
    }
</script>

<style scoped>
  .nav-brand-container {
    text-align: center;
    position: relative;
    width: 4em;
    height: 4em;
    border-color: black;
    border-right: 1px solid;
    border-bottom: 1px solid;
  }

  .nav-brand-container > a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  a > img {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .hamburger {
    height: 100%;
    padding:0;
    color: white;
  }

  .hamburger:hover
  {
    color:#66fcf1;
  }
  .hamburger svg {

    font-size: 2em;
    display: block;
    margin: auto;
    height: 100%;
  }

</style>
