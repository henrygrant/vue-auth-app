<template>
  <v-card>
    <v-toolbar dark short>
      <v-toolbar-title>Log In</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <form
        name="login-form"
        autocomplete="off"
      >
      <v-text-field
        type="email"
        label="email"
        v-model="email"
      />
      <v-text-field
        type="password"
        label="password"
        v-model="password"
      />
      <div class="error" v-html="error"></div>
      </form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        dark
        @click="login"
      >
        Log In
      </v-btn>
    </v-card-actions>
  </v-card>
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
          await this.$store.dispatch('setToken', response.data.token)
          await this.$store.dispatch('setUser', response.data.user)
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
