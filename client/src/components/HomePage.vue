<template>
  <v-container>
    <div class="row">
      <div class="col-6 mx-auto">
        <h1>Bunky Boyz isn't just a guild...</h1>
        <h3>It's a collection of the most elite gamers in the UNIVERSE</h3>
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
        <blockquote class="blockquote">Think you have what it takes to be in the &lt;Bunky Boyz&gt;?</blockquote>
        <div class="d-flex justify-center align-center">
          <v-btn dark
              class="ml-5"
              to="/apply"
          >Apply Now</v-btn>
        </div>
      </div>
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
