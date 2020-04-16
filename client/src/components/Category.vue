<template>
  <span @click="selectCategory(entry)">{{ entry.title }}</span>
</template>

<script>
import CodebaseService from '@/services/Codebase'
export default {
  props: ['entry'],
  methods: {
    selectCategory (t) {
      this.$store.dispatch('setSelCategory', this.entry.id)
      this.$store.dispatch('setSelCategoryTitle', this.entry.title)
      this.$router.push('/browse/category/' + t.id)
    }
  },
  watch: {
    $route () {
      CodebaseService.getCategory(this.$route.params.id).then(response => {
        this.$store.dispatch('setSelCategory', response.data.id)
        this.$store.dispatch('setSelCategoryTitle', response.data.title)
      })
    }
  }
}
</script>

<style scoped>

</style>
