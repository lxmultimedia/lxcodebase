<template>
  <div id="listing">
    <div class="listingcontent">
      <v-alert
        color="#2A3B4D"
        dark
        dense
      >
        Category
      </v-alert>
      <v-textarea
      rows="1"
      filled
      auto-grow
      dense
      readonly
      :value="getCategoryTitle.title"
      >
      </v-textarea>
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
      rows="1"
      filled
      auto-grow
      dense
      readonly
      background-color="lime lighten-5"
      :value="entry.title"
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
      rows="1"
      filled
      auto-grow
      dense
      readonly
      background-color="lime lighten-5"
      :value="entry.description"
      ></v-textarea>
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
      readonly
      background-color="amber lighten-4"
      :value="entry.content"
      ></v-textarea>
    </div>
    <div class="listingcontent chip">
      <v-alert
        color="#2A3B4D"
        dark
        dense
      >
      Created
      </v-alert>
      <v-chip
        small
        outlined
      >
      {{ sqlToJsDate(entry.createdAt) }}
      </v-chip>
    </div>
    <div class="listingcontent chip">
      <v-alert
        color="#2A3B4D"
        dark
        dense
      >
      Updated
      </v-alert>
      <v-chip
        small
        outlined
      >
      {{ sqlToJsDate(entry.updatedAt) }}
      </v-chip>
    </div>
    <div class="listingbutton" v-if="this.$store.state.isUserLoggedIn">
      <v-btn
      :to = "{ name: 'edit', params: { getEntryId }}"
      large color="warning">Edit
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      entry: {}
    }
  },
  computed: {
    getCategoryTitle () {
      return this.$store.getters.getCategory(this.entry.CategoryId) ? this.$store.getters.getCategory(this.entry.CategoryId) : ''
    },
    getEntryId () {
      return this.entry.id
    }
  },
  methods: {
    sqlToJsDate (sqlDate) {
      // sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
      var sqlDateArr1 = sqlDate.split('-')
      // format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
      var sYear = sqlDateArr1[0]
      var sMonth = (Number(sqlDateArr1[1]) - 1).toString()
      var sqlDateArr2 = sqlDateArr1[2].split('T')
      // format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
      var sDay = sqlDateArr2[0]
      var sqlDateArr3 = sqlDateArr2[1].split(':')
      // format of sqlDateArr3[] = ['hh','mm','ss.ms']
      var sHour = sqlDateArr3[0]
      var sMinute = sqlDateArr3[1]

      return new Date(sYear, sMonth, sDay, sHour, sMinute, 0, 0).toLocaleString()
    }
  },
  mounted () {
    this.entry = this.$store.getters.getListing(parseInt(this.$route.params.id))
  }
}
</script>

<style scoped>
#listing {
  padding: 20px;
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
</style>
