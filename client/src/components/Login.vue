<template>
  <div>
      <v-flex xs12 md8 offset-md2>
        <div class="white">
          <v-toolbar dark
          color="indigo">
            Login
          </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2 panel">
            <form
            name="lxcodebase_login">
              <v-text-field
                type="email"
                name="email"
                v-model = "email"
                placeholder="email"
                @keyup.enter.native = "onSubmit()" />
              <br>
              <v-text-field
                type="password"
                name="password"
                v-model = "password"
                placeholder = "password"
                @keyup.enter.native = "onSubmit()" />
              <div class="error" v-html="error" v-if="error"></div>
              <br>
              <v-btn
                id="btnSubmit"
                dark
                large
                class="indigo"
                @click="login">
                Login
              </v-btn>
            </form>
          </div>
        </div>
      </v-flex>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token).then(() => {
          this.autoLogout(response.data.expires)
          this.$router.push('/browse')
        })
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setExpires', response.data.expires)
      } catch (error) {
        this.error = error.response.data.error
        this.$store.dispatch('setToken', null)
      }
    },
    autoLogout (expires) {
      const timeout = expires - Date.now()
      if (timeout > 0) {
        setTimeout(() => {
          this.$store.dispatch('setToken', null)
        },
        timeout)
      }
    },
    onSubmit () {
      this.login()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: white;
  margin: 15px 0px;
  padding: 5px;
}
#btnSubmit {
  margin-bottom: 20px;
}
.panel {
  border: 1px solid #ddd;
}
</style>
