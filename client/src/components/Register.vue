<template>

  <div class="row">
    <div class="col-12 col-sm-6 col-md-4 mx-auto">
      <v-card>
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
          <v-text-field
            type="password"
            label="confirm password"
            v-model="password2"
            autocomplete="new-password"
          />
          <div class="errorMsg">{{error}}</div>
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
    </div>
  </div>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'
  export default {
    data () {
      return {
        username: '',
        password: '',
        password2: '',
        error: null
      }
    },
    methods: {
      async register () {
        if (this.password !== this.password2) {
          this.error = "Your password's don't match"
          return
        }
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
  .errorMsg {
    color: red;
  }

  .loginContainer {
    height:100%
  }
</style>
