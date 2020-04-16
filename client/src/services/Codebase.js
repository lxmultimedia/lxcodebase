import Api from '@/services/Api'

export default {
  getCategories () {
    return Api().get('/category')
  },
  getEntries () {
    return Api().get('/codebase')
  },
  getEntry (id) {
    return Api().get('/codebase/' + id)
  },
  getCategory (id) {
    return Api().get('/category/' + id)
  },
  postCategory (value) {
    return Api().post('/category', value)
  },
  deleteCategory (value) {
    return Api().delete('/category/' + value)
  },
  deleteListing (value) {
    return Api().delete('/codebase/' + value)
  },
  updateListing (value) {
    return Api().put('/codebase/' + value.id, value)
  },
  postListing (value) {
    return Api().post('/codebase', value)
  }
}
