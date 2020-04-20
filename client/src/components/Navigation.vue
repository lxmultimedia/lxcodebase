<template>
  <div class="icon">
    <vue-custom-scrollbar class="scroll-area"  :settings="settings">
      <v-list-item link v-for="c in getCategories" :key="c.id">
        <v-list-item-action @click="resetEditCategory()">
          <v-icon>mdi-apps</v-icon>
        </v-list-item-action>
        <v-list-item-content @click="selectCategory(c)">
          <v-list-item-title>{{ c.title }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action @click="editCategory(c)" v-if="$store.state.isUserLoggedIn && !isEditCategory">
          <v-icon>mdi-pencil</v-icon>
        </v-list-item-action>
        <v-list-item-action @click="deleteCategory(c)" v-if="$store.state.isUserLoggedIn && isEditCategory">
          <v-icon>mdi-delete</v-icon>
        </v-list-item-action>
      </v-list-item>
    </vue-custom-scrollbar>
    <div class="categoryinput">
      <v-text-field v-if="$store.state.isUserLoggedIn"
        label="New Category Name"
        placeholder="Please input category"
        outlined
        append-icon="mdi-keyboard-return"
        v-model="newCategory"
        @keyup.enter.native="onSubmitNewCategory"
        :background-color= "colorTextfield"
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
      newCategory: '',
      categoryEdit: null,
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
    },
    isEditCategory () {
      return this.categoryEdit instanceof Object
    },
    colorTextfield () {
      if (this.isEditCategory) {
        return '#F6D1DE'
      } else {
        return '#fff'
      }
    }
  },
  methods: {
    onSubmitNewCategory () {
      if (this.isEditCategory) {
        this.categoryEdit.title = this.newCategory
        this.$store.dispatch('updateCategory', this.categoryEdit)
        this.categoryEdit = null
      } else {
        const category = {'title': this.newCategory}
        this.$store.dispatch('newCategory', category)
      }
    },
    deleteCategory (c) {
      this.$store.dispatch('deleteCategory', c)
    },
    editCategory (c) {
      this.categoryEdit = c
      this.newCategory = c.title
    },
    selectCategory (c) {
      this.$router.push('/browse/category/' + c.id)
    },
    resetEditCategory () {
      this.categoryEdit = null
      this.newCategory = ''
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
  text-align: left;
  overflow: hidden;
}
.categoryinput {
  position: absolute;
  bottom: 0px;
  margin: 0px 15px;
}
</style>
