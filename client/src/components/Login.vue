<template>
  <div class="row">
    <div class="col-12 col-sm-6 col-md-4 mx-auto">
      <v-card>
        <v-card-text>
          <form
            name="login-form"
            autocomplete="off"
          >
          <v-text-field
            label="username"
            v-model="username"
          />
          <v-text-field
            type="password"
            label="password"
            v-model="password"
          />
          <div class="errorMsg">{{error}}</div>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-btn dark
            @click="login"
          >
            Log In
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
        error: null
      }
    },
    methods: {
      async login () {
        try {
          const response = await AuthenticationService.login({
            username: this.username,
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
  .errorMsg {
    color: red;
  }

</style>
