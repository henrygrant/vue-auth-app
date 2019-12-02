<template>
  <div class="row">
    <div class="col-12 col-sm-8 col-md-6 mx-auto">
      <v-btn
          class="mx-auto mb-6 success"
          v-if="$store.state.user && $store.state.user.isAdmin"
          to="/createBlog"
      >
        Create New Blog
      </v-btn>
      <div v-for="blog in blogPosts">
        <blog-post
            @deletedBlogId="removeDeletedBlog"
            :blog="blog"
            class="mb-5 mx-auto"
        >
        </blog-post>
      </div>
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
      removeDeletedBlog (id) {
        this.blogPosts = this.blogPosts.filter(b => b.id !== id)
      }
    }
  }
</script>

<style scoped>

</style>
