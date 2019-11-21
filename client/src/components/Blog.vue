<template>
  <div>
    <create-blog></create-blog>
    <div v-for="post in blogPosts">
      <blog-post :title="post.title" class="mb-5">
        <div>{{post.body}}</div>
      </blog-post>
    </div>

  </div>

</template>

<script>
  import BlogPost from '@/components/BlogPost'
  import CreateBlog from '@/components/CreateBlog'
  import BlogPostService from '@/services/BlogPostService'

  export default {
    components: {
      BlogPost,
      CreateBlog
    },
    data () {
      return {
        blogPosts: []
      }
    },
    async mounted () {
      this.blogPosts = (await BlogPostService.get()).data
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
