<template>
  <v-app>
    <div id="app">
      <v-app-bar dark short elevate-on-scroll app>
        <v-toolbar-title title>
          <router-link to="/" class="title-link">
            BunkyApp
          </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
            to="/login"
            v-if="!$store.state.isUserLoggedIn"
        >
          Log In
        </v-btn>
        <v-btn
            to="/register"
            v-if="!$store.state.isUserLoggedIn"
        >
          Sign Up
        </v-btn>
      </v-app-bar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
      </v-container>
    </v-content>
    </div>
  </v-app>
</template>

<script>
  import PageHeader from '@/components/Header.vue'
  export default {
    name: 'app',
    components: {
      PageHeader
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .title-link {
    color: white!important;
    text-decoration: none;
    user-select: none;
  }
  .title-link:active, .title-link:focus {
    outline:none;
  }
  .title-link:hover {
    color:lightgrey!important;
  }

</style>
