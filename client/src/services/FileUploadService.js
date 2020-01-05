import Api from '@/services/Api'

export default {
  // get () {
  //   return Api().get('blogs', {})
  // },
  post (formData) {
    return Api().post('/imageupload', formData)
  }
}
