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
      <file-upload
        :onComplete="setImageUrl"
      ></file-upload>
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
import FileUpload from '@/components/FileUpload.vue'

export default {
  name: 'CreateBlog',
  components: {
    FileUpload
  },
  data () {
    return {
      blogPost: {}
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
        await this.$router.push({
          name: 'root'
        })
      } catch (err) {
        console.log(err)
      }
    },
    setImageUrl (imageUrl) {
      this.blogPost.imageUrl = imageUrl
    }
  }
}
</script>

<style scoped>

</style>
