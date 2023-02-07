<template>
  <nav id="nav">
    <div class="nav-list">
      <apex-logo></apex-logo>
      <transition name="fade">
        <ChartMenu v-if="selectedSidebar ==='chart'"></ChartMenu>
      </transition>
    </div>
    <div>
    </div>
    <div class="login">
    </div>
  </nav>
</template>

<script>
  import Logo  from './NavBar/Logo.vue'
 // import ChartNav from './navigation/chart/NavigationMenu'
  import ChartMenu from './NavBar/ChartMenu.vue';
  import {mapState} from "vuex";
    export default {
        components:
          {
           ChartMenu,
            'apex-logo': Logo,
          },
      computed:
        {
          ...mapState('dashboard/sidebar', [
            'showSidebar','selectedSidebar'
          ]),
        },
    }
</script>

<style scoped>
  body {
    margin: 0;
  }
  #nav {
    background-color: #17171d;
    position: relative;
    border-bottom: 1px solid;
  }


  .nav-list {
    margin: 0;
    display:flex;
    flex-direction:row;
  }
  .login {
    grid-column: 3;
  }

  /*nav button*/
  .progress-button-nav button
  {
    display: block;
    padding: 0.3em 1em;
    float: right;
    font-size: 1em;
    border: 2px solid #fc8966;
    border-radius: 40px;
    background: transparent;
    letter-spacing: 1px;
    color: white;
    -webkit-tap-highlight-color: transparent;
    -webkit-transition: background-color 0.3s, color 0.3s, width 0.3s, border-width 0.3s, border-color 0.3s;
    transition: background-color 0.3s, color 0.3s, width 0.3s, border-width 0.3s, border-color 0.3s;
  }

  .progress-button-nav button:hover {
    background-color: #fc8966;
  }

  .progress-button-nav button:hover > span {
    color: black;
  }
</style>
