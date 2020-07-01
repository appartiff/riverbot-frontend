<template>
  <div class="nav-mobile">
    <button v-bind:class="hamburgerShow ? 'is-active':''" class="hamburger hamburger--collapse" @click="toggleShow">
      <span class="hamburger-box"><span class="hamburger-inner"/></span>
    </button>
    <ul class="nav-mobile-sidebar" v-if="hamburgerShow">
      <nuxt-link to="" tag="li" ><a>Home</a></nuxt-link>
      <nuxt-link to="/auth/register" tag="li" ><a>Register</a></nuxt-link>
      <nuxt-link to="/auth/login" tag="li" class="login-button" ><a>Login</a></nuxt-link>
      <nuxt-link to="/scanner/crypto/okex/BTCUSDT/Daily" tag="li" ><a>Scanner</a></nuxt-link>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "MobileNavList",
      data() {
        return {
          hamburgerShow: false,
        }
      },
      methods:
        {
          toggleShow() {
            this.hamburgerShow = !this.hamburgerShow;
          },
        },
      watch: {
        '$route.name': function ()
        {
          this.hamburgerShow = false;
        },
      }
    }
</script>

<style scoped>

  .nav-mobile > button {
    float: right;
  }

  .nav-mobile {
    color: white;
  }

  .nav-mobile-sidebar {
    list-style-type: none;
    white-space: nowrap;
    height: 100vh; /* 100% Full-height */
    width: 100%; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 60px;
    left: 0;
    margin: 0 !important;
    padding: 0 2em;
    background-color: #17171d; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidebar */
  }

  .nav-mobile-sidebar a {
    font-size: 2em;
  }

  .nav-mobile-sidebar li {
    margin: 1em 0;
  }

</style>
