<template>
  <div>
    <v-card>
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
            v-if="$store.state.user && $store.state.user.isAdmin"
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
        await BlogPostService.delete(blog)
        this.$emit('deletedBlogId', blog.id)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
