<template>
  <nav id="nav">
    <riverScrollHandler v-bind:hamburger-prop="this.hamburgerShow"/>
    <div class="nav-container">
      <LogoContainer :mobile="mobile">
      </LogoContainer>
      <component :is="getNavList()"></component>
    </div>
  </nav>
</template>
<script>
  import ScrollHandler from "./navigation/ScrollHandler";
  import LogoContainer from './navigation/LogoContainer';
  import DesktopNavList from './navigation/DesktopNavList';
  import MobileNavList from './navigation/MobileNavList';
  import {mapActions, mapState} from "vuex";

  export default {

    components:
      {
        'riverScrollHandler': ScrollHandler,
        LogoContainer,
        DesktopNavList,
        MobileNavList

      },

    data() {
      return {
        window: {
          width: 0,
        },

      }
    },
    computed: {
      ...mapState(['mobile',]),
    },
    created() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods:
      {
        ...mapActions(['changeMobile']),
        handleResize() {
          this.changeMobile(window.innerWidth < 990);
        },
        getNavList() {
          return this.mobile ? MobileNavList : DesktopNavList;
        }
      },
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/css/_globalVars.scss';

  .login-button {
    font-weight: $font-bold;
  }

  .scrolled {
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    background-color: black !important;
    padding: 0.2em 0 !important;
  }

  .navbar-fixed-top {
    right: 0;
    left: 0;
    top: 0;
    z-index: 1030;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .navbar-fixed-top > .container {
    display: grid;
    grid-gap: 40px;
    color: #444;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    padding: 10px;
  }

  .nav li {
    display: inline-block;
    margin-left: 5%;
    margin-right: 5%;
    zoom: 1;
    *display: inline;
  }

  .nav a {
    color: white;
    font-size: 1.25em;
  }

  /*Navigation items*/
  nav {
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    padding: 0.64em 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 2147483647;
    color: white;
    background-color: #17171d;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }

  .nav-container {
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (min-width: 1025px) {
    .nav-container {
      width: 80%;
    }
  }
  @media (max-width: 1024px) {
    .nav-container {
      width: 100%;
    }
  }
</style>
