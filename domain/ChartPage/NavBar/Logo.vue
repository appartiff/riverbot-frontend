<template>
  <div class="nav-list-item">
    <div class="nav-brand-container">
      <router-link v-if="this.showSidebar" to="/" class="logo-container">
        <img src="/img/valknut-blue.png" alt="logo">
      </router-link>
      <div v-else class="hamburger" @click="toggleShow">
        <font-awesome-icon icon="bars"/>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapActions,mapMutations, mapState} from "vuex";

    export default {
        computed: {
            ...mapState('dashboard/sidebar', ['showSidebar']),

        },
        methods:
            {
              ...mapMutations('dashboard/sidebar', ['setSidebar','toggleShowSidebar']),
                toggleShow() {
                    this.toggleShowSidebar();
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

  img {
    height: 80%;
    width: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
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
