<template>
  <v-card>
    <v-toolbar dark short>
      <v-toolbar-title>Create Post</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <form
        name="new-blog-form"
        autocomplete="off"
      >
      <v-text-field
        type="text"
        label="title"
        v-model="blogPost.title"
      />
      <v-textarea
        type="text"
        label="body"
        v-model="blogPost.body"
      />
      <v-text-field
        type="text"
        label="imageUrl"
        v-model="blogPost.imageUrl"
      />
      </form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        dark
        @click="postBlog(blogPost)"
      >
        Post
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import BlogPostService from '@/services/BlogPostService'

export default {
  data () {
    return {
      blogPost: {},
      error: null
    }
  },
  methods: {
    async postBlog (blogPost) {
      try {
        const newBlog = await BlogPostService.post({
          title: this.blogPost.title,
          body: this.blogPost.body,
          UserId: this.$store.state.user.id,
          imageUrl: this.blogPost.imageUrl
        })
        console.log(newBlog)
        this.$emit('newBlog', newBlog.data)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
