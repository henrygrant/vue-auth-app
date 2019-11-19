<template>
  <div>
    <bunky-card class="mb-5">
      <v-card-text>
      <form
        name="new-blog-form"
        autocomplete="off"
      >
      <v-text-field
        type="text"
        label="title"
        v-model="newBlog.title"
      />
      <v-text-field
        type="body"
        label="body"
        v-model="newBlog.body"
      />
      <div class="error" v-html=""></div>
      </form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        dark
        @click="postBlog(newBlog)"
      >
        Post
      </v-btn>
    </v-card-actions>
    </bunky-card>
    <bunky-card v-for="post in blogPosts" title="post.title" class="mb-5">
      <div>{{post.body}}</div>
    </bunky-card>
  </div>

</template>

<script>
  import BunkyCard from '@/components/BunkyCard'
  import BlogPostService from '@/services/BlogPostService'

  let blogPosts = []
  try {
    (async () => {
      blogPosts = await BlogPostService.getBlogPosts()
    })()
  } catch {
    console.log('BEEP BEEP BAD CODE')
  }

  export default {
    components: {
      BunkyCard
    },
    data () {
      return {
        newBlog: {},
        blogPosts: blogPosts
      }
    },
    methods: {
      async getBlogPosts () {
        let blogPosts = []
        return blogPosts
      },
      async postBlog (blog) {
        try {
          await BlogPostService.postBlog({
            title: this.title,
            body: this.body
          })
        } catch {
        }
      }
    }
  }
</script>

<style scoped>

</style>
