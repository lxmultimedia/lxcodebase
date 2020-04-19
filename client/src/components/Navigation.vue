<template>
  <div class="icon">
    <vue-custom-scrollbar class="scroll-area"  :settings="settings">
      <v-list-item link v-for="c in getCategories" :key="c.id">
        <v-list-item-action>
          <v-icon>mdi-apps</v-icon>
        </v-list-item-action>
        <v-list-item-content @click="selectCategory(c)">
          <v-list-item-title>{{ c.title }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action @click="deleteCategory(c)" v-if="$store.state.isUserLoggedIn">
          <v-icon>mdi-delete</v-icon>
        </v-list-item-action>
      </v-list-item>
    </vue-custom-scrollbar>
    <div class="categoryinput">
      <v-text-field v-if="$store.state.isUserLoggedIn"
        label="New Category"
        placeholder="Please input category"
        outlined
        append-icon="mdi-keyboard-return"
        v-model="newcategory"
        @keyup.enter.native="onSubmitNewCategory"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
export default {
  data () {
    return {
      categories: null,
      newcategory: '',
      settings: {
        maxScrollbarLength: null
      }
    }
  },
  components: {
    vueCustomScrollbar
  },
  computed: {
    getCategories () {
      return this.$store.getters.getCategories
    }
  },
  methods: {
    onSubmitNewCategory () {
      const category = {'title': this.newcategory}
      this.$store.dispatch('newCategory', category)
    },
    deleteCategory (c) {
      this.$store.dispatch('deleteCategory', c)
    },
    selectCategory (c) {
      this.$router.push('/browse/category/' + c.id)
    }
  },
  mounted () {
    this.categories = this.$store.getters.getCategories
  }
}
</script>

<style scoped>
.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  height: calc(100vh - 140px);
}
.icon {
  max-width: 100%;
  text-align: left;
  overflow: hidden;
}
.categoryinput {
  position: absolute;
  bottom: 0px;
  margin: 0px 15px;
}
</style>
