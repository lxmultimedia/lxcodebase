<template>
  <div>
      <v-flex xs12 md8 offset-md2>
        <div class="white">
          <v-toolbar dark
          color="indigo">
            Register
          </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2 panel">
            <form
            name="lxcodebase_register"
            autocomplete="off">
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
                placeholder="password"
                autocomplete="new-password"
                @keyup.enter.native = "onSubmit()" />
              <div class="error" v-html="error" v-if="error"></div>
              <br>
              <v-btn
                id="btnSubmit"
                dark
                large
                class="indigo"
                @click="register">
                Register
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
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push('/browse')
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    onSubmit () {
      this.register()
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
.panel {
  border: 1px solid #ddd;
}
#btnSubmit {
  margin-bottom: 20px;
}
</style>
