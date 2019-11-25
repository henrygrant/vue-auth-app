<template>
  <div>
    <create-blog
        v-if="this.$store.state.isUserLoggedIn"
        @newBlog="addNewBlog"
        class="mb-5">
    </create-blog>
    <div v-for="blog in blogPosts">
      <blog-post
          :blog="blog"
          class="mb-5">
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
      this.blogPosts = (await BlogPostService.get()).data.reverse()
      console.log(this.blogPosts)
    },
    methods: {
      addNewBlog (newBlog) {
        this.blogPosts.unshift(newBlog)
      }
    }
  }
</script>

<style scoped>

</style>
