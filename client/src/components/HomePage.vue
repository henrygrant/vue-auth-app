<template>
  <div class="d-flex flex-column">
    <v-btn
        class="homepage-item mx-auto mb-3"
        v-if="this.$store.state.isUserLoggedIn"
        to="/createBlog"
    >
      Create New Blog
    </v-btn>
    <div
      v-for="blog in blogPosts"
      class="d-flex flex-column"
    >
      <blog-post
          @deletedBlog="removeDeletedBlog"
          :blog="blog"
          class="mb-5 mx-auto homepage-item"
      >
      </blog-post>
    </div>
  </div>
</template>

<script>
  import BlogPost from '@/components/BlogPost'
  import CreateBlog from '@/components/CreateBlog'
  import BlogPostService from '@/services/BlogPostService'

  export default {
    // components used in this component
    components: {
      BlogPost,
      CreateBlog
    },
    // component vars
    data () {
      return {
        blogPosts: []
      }
    },
    // when component is finished initializing
    async mounted () {
      this.blogPosts = (await BlogPostService.get()).data.reverse()
    },
    // functions the component can use
    methods: {
      removeDeletedBlog (deletedBlog) {
        this.blogPosts = this.blogPosts.filter(b => b.id !== deletedBlog)
      }
    }
  }
</script>

<style scoped>
.homepage-item {
  max-width:750px;
}
</style>
