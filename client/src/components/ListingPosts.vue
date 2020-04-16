<template>
<div>
  <div id="listing" class="white elevation-2" v-if="getEntries.length > 0">
    <h3 class="heading">{{ getCategoryTitle }}</h3>
    <v-banner one-line v-for="e in getEntries" :key="e.id">
      <v-avatar
        slot="icon"
        color="deep-purple accent-4"
        size="40"
      >
        <v-icon
          icon="mdi-code-tags"
          color="white"
        >
          mdi-code-tags
        </v-icon>
      </v-avatar>

      <span class="postlink" @click="loadContent(e)">{{ e.title }}</span>

      <template v-slot:actions>
        <v-btn @click="loadContent(e)" text color="deep-purple accent-4">View</v-btn>
      </template>
    </v-banner>
  </div>
  <v-alert
    v-if="getEntries.length == 0"
    border="top"
    colored-border
    type="info"
    elevation="2"
  >
    There are no listing in this category
  </v-alert>
</div>
</template>

<script>
export default {
  data () {
    return {
      entries: []
    }
  },
  computed: {
    getEntries () {
      return this.entries
    },
    getCategoryTitle () {
      return this.$store.getters.getCategoryTitle(parseInt(this.$route.params.id))
    }
  },
  methods: {
    loadContent (e) {
      this.$router.push('/browse/listing/' + e.id)
    }
  },
  mounted () {
    this.entries = this.$store.getters.getCategoryListings(parseInt(this.$route.params.id))
  }
}
</script>

<style scoped>
  .postlink {
    cursor: pointer;
  }
  #listing {
    padding: 20px;
    text-align: center;
  }
</style>
