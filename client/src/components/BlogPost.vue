<template>
  <div class="d-flex">
    <v-card class="newblog">
      <v-img
          v-if="blog.imageUrl"
          :src="blog.imageUrl"
          :alt="blog.imageUrl"
      >
      </v-img>

      <v-card-title class="d-flex justify-center">
        {{blog.title}}
      </v-card-title>

      <v-card-subtitle >
        {{blog.User.username}} - {{blog.createdAt | moment("MMMM Do YYYY")}}
      </v-card-subtitle>

      <v-card-text>
        {{blog.body}}
      </v-card-text>

      <v-card-actions>
        <v-btn
            text
            @click="deleteBlog(blog)"
            class="red--text"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script>
import BlogPostService from '@/services/BlogPostService'

export default {
  props: [
    'blog'
  ],
  methods: {
    async deleteBlog (blog) {
      try {
        const deletedBlog = await BlogPostService.delete(blog)
        this.$emit('deletedBlog', deletedBlog)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
  .newblog {
    max-width:750px;
  }
</style>
