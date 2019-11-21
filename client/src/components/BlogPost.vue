<template>
  <v-card>
    <v-toolbar dark short>
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
    <slot>
      No blog content found.
    </slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style scoped>

</style>
