<template>
  <v-card max-width="750" class="mx-auto">
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
        :rules="[rules.imageUrl.regex]"
      />
      </form>
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-btn
          @click="postBlog(blogPost)"
          color="success"
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
      rules: {
        imageUrl: {
          regex: v => !v || (v.match(/\.(jpeg|jpg|gif|png)$/) != null || 'Must be valid image URL')
        }
      }
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
        this.$emit('newBlog', newBlog.data)
        this.blogPost = {}
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
