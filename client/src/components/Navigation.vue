<template>
  <div style="text-align: center;">
    <clip-loader class="spinner" :size=20 color="#3F51B5" sizeUnit="px" v-if="isLoading"></clip-loader>
    <div class="icon" v-if="!isLoading">
      <vue-custom-scrollbar class="scroll-area"  :settings="settings">
        <v-list-item link v-for="c in getCategories" :key="c.id">
          <v-list-item-action v-if="!isEditCategory">
            <v-icon>mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-action v-if="$store.state.isUserLoggedIn && isEditCategory" @click="resetEditCategory()">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">mdi-undo</v-icon>
              </template>
              <span>Undo</span>
            </v-tooltip>
          </v-list-item-action>
          <v-list-item-content @click="selectCategory(c)">
            <v-list-item-title>{{ c.title }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action @click="editCategory(c)" v-if="$store.state.isUserLoggedIn && !isEditCategory">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">mdi-pencil</v-icon>
              </template>
              <span>Edit</span>
            </v-tooltip>
          </v-list-item-action>
          <v-list-item-action @click="deleteCategory(c)" v-if="$store.state.isUserLoggedIn && isEditCategory">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">mdi-delete</v-icon>
              </template>
              <span>Delete</span>
            </v-tooltip>
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
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
export default {
  data () {
    return {
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
    },
    isLoading () {
      return this.getCategories.length === 0
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
      // Trigger a confirmation dialog, https://www.npmjs.com/package/vuejs-dialog
      let message = `Are you sure to delete "${c.title}"?<br><br>All listings will be deleted.`
      let options = {
        html: true, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
        loader: false, // set to true if you want the dailog to show a loader after click on "proceed"
        reverse: false, // switch the button positions (left to right, and vise versa)
        okText: 'Delete',
        cancelText: 'Close',
        animation: 'zoom', // Available: "zoom", "bounce", "fade"
        type: 'basic', // coming soon: 'soft', 'hard'
        clicksCount: 1, // for soft confirm, user will be asked to click on "proceed" btn 3 times before actually proceeding
        backdropClose: false, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
        customClass: 'dialog' // Custom class to be injected into the parent node for the current dialog instance
      }
      this.$dialog
        .confirm(message, options)
        .then(() => {
          this.$store.dispatch('deleteCategory', c)
        })
        .catch(() => {})
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
.spinner {
  margin: 10% auto;
}
</style>
