import Api from '@/services/Api'

export default {
  get () {
    return Api().get('users', {})
  },
  put (user) {
    return Api().put(`users/${user.id}`, user)
  },
  post (user) {
    return Api().post('users', user)
  },
  delete (user) {
    return Api().delete('users', user)
  }
}
