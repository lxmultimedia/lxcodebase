<template>
  <div class="icon">
    <v-list-item link v-for="c in getCategories" :key="c.id">
      <v-list-item-action>
        <v-icon>mdi-apps</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title @click="selectCategory(c)">{{ c.title }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action @click="deleteCategory(c)" v-if="$store.state.isUserLoggedIn">
        <v-icon>mdi-delete</v-icon>
      </v-list-item-action>
    </v-list-item>
    <v-text-field v-if="$store.state.isUserLoggedIn"
      class="categoryinput"
      label="New Category"
      placeholder="Please input category"
      outlined
      append-icon="mdi-keyboard-return"
      v-model="newcategory"
      @keyup.enter.native="onSubmitNewCategory"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: null,
      newcategory: ''
    }
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
.icon {
  max-width: 100%;
  text-align: left;
}
.categoryinput {
  position: absolute;
  bottom: 0px;
  margin: 0px 15px;
}
</style>
