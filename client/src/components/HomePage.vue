<template>
  <v-container>
    <v-carousel
      cycle
      hide-delimiters
      show-arrows
    >
      <v-carousel-item
        v-for="(img, i) in images"
        :key="i"
        :src="img"
      >
      </v-carousel-item>
    </v-carousel>
    <blockquote class="blockquote">The &lt;Bunky Boyz&gt; are a collection of gamers who kill bosses and get purples.</blockquote>
    <div class="d-flex justify-center align-center">
      <span>Want to join?</span>
<!--      <v-btn dark-->
<!--          class="ml-5"-->
<!--          to="/apply"-->
<!--      >Apply Now</v-btn>-->
    </div>
  </v-container>

</template>

<script>
export default {
  data () {
    return {
      images: [
        'https://imgur.com/3BjOSZz.png',
        'https://imgur.com/PumMmEg.png',
        'https://imgur.com/4k9tcnJ.png',
        'https://imgur.com/ph6ABjy.png'
      ]
    }
  }
}
</script>

<style scoped>

</style>
