<template>
  <v-card>
    <v-toolbar dark short>
      <v-toolbar-title>Register</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <form
        name="register-form"
        autocomplete="off"
      >
      <v-text-field
        label="username"
        v-model="username"
        autocomplete="new-password"
      />
      <v-text-field
        type="password"
        label="password"
        v-model="password"
        autocomplete="new-password"
      />
      <div class="error" v-html="error"></div>
      </form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        dark
        @click="register"
      >
        Register
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'
  export default {
    data () {
      return {
        username: '',
        password: '',
        error: null
      }
    },
    methods: {
      async register () {
        try {
          await AuthenticationService.register({
            username: this.username,
            password: this.password
          })
          // remove this when you handle registration better
          const resp2 = await AuthenticationService.login({
            username: this.username,
            password: this.password
          })
          await this.$store.dispatch('setToken', resp2.data.token)
          await this.$store.dispatch('setUser', resp2.data.user)
          await this.$router.push({
            name: 'root'
          })
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
  }
  </script>

<style scoped>
  .error {
    color: red;
  }

  .loginContainer {
    height:100%
  }
</style>
