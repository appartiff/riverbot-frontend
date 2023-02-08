<template>
  <div>

    <div class="outer-background">
      <Navigation></Navigation>
      <div>
        <div class="background">
          <div class="signin-form">
            <h3>Log In</h3>
            <form @submit.prevent="onSubmit">
              <div class="form-group">

                <input
                  placeholder="Email"
                  type="email"
                  id="email"
                  v-model="email">
              </div>
              <div class="form-group">

                <input
                  placeholder="Password"
                  type="password"
                  id="password"
                  v-model="password">
              </div>
              <div class="form-group">
                <RoundedButton
                  type="is-primary"
                  size="small"
                  color="red"
                >
                  Log in
                </RoundedButton>
              </div>
              <br>
              <div class="form-group">

                <span class="registered">Not Registered? <nuxt-link   to="/auth/register" active-class="active"><a class="green">Sign up here</a></nuxt-link></span>
              </div>
            </form>
          </div>
          <div class="ocean">
            <div class="wave-bottom"></div>
            <div class="wave-top"></div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>

</template>

<script>
    export default {
        name: "Index"
    }
</script>

<style lang="scss" scoped>

@import 'assets/css/_Mixins.scss';
h3 {
  margin: 0;
  padding-bottom: 1em;
  color: white;
}
.outer-background
{
  height:100vh;
}
.background
{
  @include display-flex;
  overflow-x: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #17171d;
  z-index: 1;
}


.signin-form
{
  z-index: 16;
  border-radius: 10px;
  background: #22222a;
  margin: auto;
  display: table; /* shrinks to fit content */
  padding: 2em 2em;
  @include small-shadow
}
.registered
{
  color:white;
}
input {
  border: 0;
  outline: 0;
  width: 25vw;
  background: transparent;
  border-bottom: 1px solid #333;
  font-size: 1.25em;
  color: white;
  margin: 0.3em 0;
}
.form-group {
  padding-bottom: 1em;
  text-align: center;
}

@media screen and (max-width: 992px) {
  input{
    width: 60vw;
  }
}

.input label {
  display: block;
  color: white;
  margin-bottom: 6px;
}


</style>
