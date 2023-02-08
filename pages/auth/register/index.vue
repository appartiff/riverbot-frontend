<template>
  <div>
    <div class="outer-background">
      <Navigation></Navigation>
      <div>
        <div class="background">
          <div class="signup-form">
            <h3>Create Account</h3>
            <form
              @submit.prevent="checkForm">
              <div v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li class="errors" v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
              </div>
              <div class="form-group">
                <input type="text" placeholder="Email" class="form-control" v-model="userData.email"/>
              </div>
              <div class="form-group">
                <input type="text" placeholder="Full Name" class="form-control" v-model="userData.name"/>
              </div>
              <div class="form-group">
                <input id="password" :class="passwordValidation" type="password" placeholder="Password"
                       class="form-control" v-model="userData.password"/>
              </div>
              <div v-if="passwordValidation.passwordErrors.length">
                <b>Password Hints:</b>
                <ul>
                  <li class="errors" v-for="error in passwordValidation.passwordErrors" :key="error">{{ error }}</li>
                </ul>
              </div>
              <br>
              <div class="form-group">
                <input type="checkbox" id="checkbox" v-model="checked">
                <label for="checkbox">I accept the <span>Terms of Use</span> & <span>Privacy Policy</span></label>
              </div>
              <div class="form-group center">
                <RoundedButton
                  type="is-primary"
                  size="small"
                  color="red"
                >
                  SIGN UP
                </RoundedButton>
              </div>
            </form>
            <br>
            <div class="form-group">

              <span class="registered">Already Registered? <nuxt-link to="/auth/login" active-class="active"><a class="green">Log in here</a></nuxt-link></span>
            </div>
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
  import axios from 'axios'

export default {
  data() {
    return {
      errors: [],
      passwordErrors: [],
      checked: false,
      rules: [
        {message: 'One lowercase letter required.', regex: /[a-z]+/, valid: false},
        {message: "One uppercase letter required.", regex: /[A-Z]+/, valid: false},
        {message: "8 characters minimum.", regex: /.{8,}/, valid: false},
        {message: "One number required.", regex: /[0-9]+/, valid: false}
      ],
      userData: {
        name: '',
        email: '',
        password: '',
        checkPassword: '',
        secret: '',
      }
    }
  },
  computed: {
    passwordValidation: function () {
      let passwordErrors = [];
      for (let condition of this.rules) {
        if (!condition.regex.test(this.userData.password)) {
          passwordErrors.push(condition.message)
        }
      }
      if (passwordErrors.length === 0) {
        return {valid: true, passwordErrors}
      } else {
        return {valid: false, passwordErrors}
      }
    }
  },
  methods: {

    signup() {

      const formData =
        {
          Email: this.userData.email,
          FullName: this.userData.name,
          Password: this.userData.password,
          Secret: this.userData.secret,

        };
      axios
        .post('/api/users/registerbeta', formData)
        .then(response => response.data)
        .then(assets => {
          console.log(assets);
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    },
    checkForm: function (e) {
      this.errors = [];
      this.passwordErrors = [];

      if (!this.userData.name) {
        this.errors.push("Name required.");
      }
      if (!this.userData.email) {
        this.errors.push('Email required.');
      } else if (!this.validEmail(this.userData.email)) {
        this.errors.push('Valid email required.');
      }
      for (let condition of this.rules) {
        if (!condition.regex.test(this.userData.password)) {
          this.passwordErrors.push(condition.message)
        }
      }
      if (!this.errors.length && !this.passwordErrors.length) {
        this.signup();
        return true;
      }

      e.preventDefault();
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

  },

  components: {}
}
</script>

<style  lang="scss" scoped>



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





.signup-form
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
.errors {
  color: #f56a6a;
  font-family: $font-sentence;
}

.valid {
  color: #6af4f5 !important;
}

.signup-button {
  border-radius: 10px;
  padding: 0.25em 1.25em;
  font-size: 1.618em;
  background-color: transparent;
  border: solid 2px #f58d6a;
  color: white;
}

.signup-button:hover {
  background-color: #f58d6a;
  color: black;
}
div > b {
  color: #bdbdbd;
}

h3 {
  margin: 0;
  padding-bottom: 1em;
  color: white;
}

label > span {
  color: #6af4f5;
}

.form-group
{
  padding-bottom: 1em;
  text-align: center;
}

input[type=text], input[type=password] {
  border: 0;
  outline: 0;
  width: 25vw;
  background: transparent;
  border-bottom: 1px solid #333;
  font-size: 1.25em;
  color: white;
  margin: 0.3em 0;
}

@media screen and (max-width: 992px) {
  input[type=text], input[type=password] {
    width: 60vw;
  }
}

</style>
