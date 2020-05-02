<template>
  <div id="listing">
    <div class="listingcontent select">
      <v-alert
        color="#2A3B4D"
        dark
        dense
      >
        Category
    </v-alert>
    <v-select class="select"
      :items="categoryitems"
      item-value='id'
      item-text='title'
      v-model='entry.CategoryId'
      label="Select category"
      solo
      dense
    >
    </v-select>
    </div>
    <div class="listingcontent">
      <v-alert
        color="#2A3B4D"
        dark
        dense
      >
        Title
    </v-alert>
      <v-textarea
      filled
      auto-grow
      rows="2"
      dense
      background-color="lime lighten-5"
      :value="entry.title"
      v-model="entry.title"
    >
    </v-textarea>
    </div>
    <div class="listingcontent">
      <v-alert
        color="#2A3B4D"
        dark
        dense
      >
        Description
    </v-alert>
      <v-textarea
      filled
      auto-grow
      rows="2"
      dense
      background-color="lime lighten-5"
      :value="entry.description"
      v-model="entry.description"
    >
    </v-textarea>
    </div>
    <div class="listingcontent">
      <v-alert
        color="#2A3B4D"
        dark
        dense
      >
        Content
    </v-alert>
      <v-textarea
      filled
      auto-grow
      dense
      background-color="amber lighten-4"
      :value="entry.content"
      v-model="entry.content"
    >
    </v-textarea>
    </div>
    <div class="listingbutton" v-if="this.$store.state.isUserLoggedIn">
      <v-btn large color="primary" @click="saveListing()">Save</v-btn>
      <v-btn large color="error" @click="deleteListing()" v-if="!isNewListing">Delete</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categoryitems: null,
      entry: {},
      isNewListing: false
    }
  },
  methods: {
    deleteListing () {
      this.$store.dispatch('deleteListing', this.entry)
    },
    saveListing () {
      if (this.isNewListing) {
        if (!this.entry.title || !this.entry.CategoryId) {
          return
        }
        this.$store.dispatch('newListing', this.entry)
      } else {
        this.$store.dispatch('saveListing', this.entry)
      }
    },
    checkNewListing () {
      var route = this.$route.name
      if (route === 'new') {
        this.isNewListing = true
        this.entry = {
          content: '',
          description: '',
          title: '',
          CategoryId: ''
        }
      } else {
        this.isNewListing = false
      }
    },
    loadData () {
      this.categoryitems = this.$store.getters.getCategories
      if (this.$route.params.id && !this.isNewListing) {
        this.entry = this.$store.getters.getListing(parseInt(this.$route.params.id))
      }
    }
  },
  mounted () {
    this.loadData()
    this.checkNewListing()
  }
}
</script>

<style scoped>
#listing {
  padding: 20px;
  text-align: left;
}
.select {
  text-align: left;
}
.listingcontent.chip {
  margin-bottom: 20px;
}
.listingcontent .label {
  margin: 10px 0px;
  border: 1px solid #ccc;
  text-align: left;
  padding: 4px 10px;
}
.listingbutton {
  text-align: right;
}
.select {
  width: 250px;
}
</style>
