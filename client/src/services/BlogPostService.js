import Api from '@/services/Api'

export default {
  get () {
    return Api().get('blogs', {})
  },
  post (blog) {
    return Api().post('blogs', blog)
  }
}
