<template>
  <v-card>
    <v-toolbar dark short>
      <v-toolbar-title>{{blog.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>by {{blog.User.username}} on {{blog.createdAt | moment("MMMM Do YYYY")}}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      {{blog.body}}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: [
    'blog'
  ]
}
</script>

<style scoped>

</style>
