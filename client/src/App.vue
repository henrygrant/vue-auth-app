<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png"/>

    <div>
      <router-link to="/"> Go Home </router-link>
      <router-link to="/register"> Go Register </router-link>
    </div>


    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
