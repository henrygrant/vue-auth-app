import Api from '@/services/Api'

export default {
  getBlogPosts () {
    return Api().get('getBlogPosts', {})
  },
  postBlog (blog) {
    return Api.post('postBlog', blog)
  }
}
