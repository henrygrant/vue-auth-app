<template>
  <v-app>
    <div id="app">
      <v-app-bar dark short elevate-on-scroll app>
        <v-toolbar-title title>
          <router-link to="/" class="title-link">
            BunkyApp
          </router-link>
        </v-toolbar-title>

        <v-btn
            class="ml-5"
            to="/blog"
        >
          Blog
        </v-btn>

        <v-btn
            class="ml-5"
            to="/apply"
        >
          Apply
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
            to="/login"
            v-if="!$store.state.isUserLoggedIn"
        >
          Log In
        </v-btn>
        <v-btn
            class="ml-5"
            to="/register"
            v-if="!$store.state.isUserLoggedIn"
        >
          Sign Up
        </v-btn>
        <v-btn
            v-if="$store.state.isUserLoggedIn"
            @click="logout"
        >
          Log Out
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
    },
    methods: {
      logout () {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({
          name: 'root'
        })
      }
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
