<template>
<fragment>
  <NavList>
    <nuxt-link to="/" tag="li" v-scroll-to="'#Main-nav'" active-class="active" exact><a>Home</a></nuxt-link>
    <li  v-scroll-to="'#features'"><a>Features</a></li>
  </NavList>
 <NavList>
    <nuxt-link to="/auth/register" tag="li" active-class="active">
      <RoundedButton
        type="is-primary"
        size="small"
        color="red"
      >
        Register
      </RoundedButton>
    </nuxt-link>
    <nuxt-link to="/auth/login" tag="li" class="login-button"  active-class="active"><a>Login</a></nuxt-link>
 </NavList>
</fragment>
</template>
<script>
  import RoundedButton from '../../ui/buttons/RoundedButton.vue';
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
