<template>
<v-app-bar dark short elevate-on-scroll app>
  <img src="./../assets/horde.png" class="logo-img">

  <v-btn
    text
    to="/"
    class="ml-4"
  >
    <div>&lt;Bunky Boyz&gt;</div>
  </v-btn>

  <v-btn
      text
      class="ml-2"
      to="/apply"
  >
    Apply
  </v-btn>

<!--  <v-btn-->
<!--      text-->
<!--      class="ml-2"-->
<!--      to="/dkp"-->
<!--      v-if="-->
<!--      $store.state.isUserLoggedIn &&-->
<!--      $store.state.user &&-->
<!--      $store.state.user.isAdmin"-->
<!--  >-->
<!--    DKP-->
<!--  </v-btn>-->

  <v-btn
      text
      class="ml-2"
      to="/admin"
      v-if="
      $store.state.isUserLoggedIn &&
      $store.state.user &&
      $store.state.user.isAdmin"
  >
    Admin
  </v-btn>
  <v-spacer></v-spacer>

  <v-btn
      text
      to="/login"
      v-if="!$store.state.isUserLoggedIn"
  >
    Log In
  </v-btn>
  <v-btn
      text
      class="ml-2"
      to="/register"
      v-if="!$store.state.isUserLoggedIn"
  >
    Sign Up
  </v-btn>
  <v-btn
      text
      v-if="$store.state.isUserLoggedIn"
      @click="logout"
  >
    Log Out
  </v-btn>
</v-app-bar>
</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$store.dispatch('setToken', null)
      await this.$store.dispatch('setUser', null)
      if (this.$router.history.current.name !== 'root') {
        await this.$router.push({
          name: 'root'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
