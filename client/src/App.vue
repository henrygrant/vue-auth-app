<template>
    <div id="app">
      <v-app>
        <page-header></page-header>
        <v-content class="grey darken-2">
          <v-container fluid>
              <router-view></router-view>
          </v-container>
        </v-content>
      </v-app>
    </div>
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
  .logo-img {
    height:30px
  }

</style>
