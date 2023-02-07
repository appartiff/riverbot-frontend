<template>
<fragment>
  <NavList>
    <nuxt-link to="/" tag="li" v-scroll-to="'#Main-nav'" active-class="active" exact><a>Home</a></nuxt-link>
    <li  v-scroll-to="'#features'"><a>Features</a></li>
  </NavList>
 <NavList>
    <nuxt-link to="/auth/register" tag="li" active-class="active">
      <b-button
        type="is-info"

        outlined
      >
        <strong>Register</strong>
      </b-button>
    </nuxt-link>
    <nuxt-link to="/auth/login" tag="li" class="login-button"  active-class="active"><a>Login</a></nuxt-link>
 </NavList>
</fragment>
</template>
<script>
  import RoundedButton from '../../ui/buttons/RoundedButtonStyle';
  import NavList from '../../ui/Lists/NavList';
    export default {
        name: "DesktopNavList",
      components:{
          RoundedButton,
        NavList
      }
    }
</script>

<style scoped>

</style>
