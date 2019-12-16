<template>
  <div>
    <v-row justify="space-around">
      <v-col cols="12" sm="6">
        <v-row justify="space-around" class="d-flex align-center">
          <v-switch
              v-model="filters.Benched"
              class="mx-2"
              label="Show Benched"
              dark
          >
          </v-switch>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6" justify="space-around">
        <v-select
            :items="gamers"
            v-model="selectedGamers"
            label="Specify"
            item-text="Gamers"
            return-object
            multiple
            dark
        >
          <template v-slot:selection="{ item, index }">
          <v-chip v-if="index < 5">
            <span>{{ item.Gamers }}</span>
          </v-chip>
          <span
            v-if="index === 5"
            class="grey--text caption"
          >(+{{ selectedGamers.length - 1 }} others)</span>
        </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-switch v-model="filters.Druid"   dark class="mx-2" label="Druid"></v-switch>
      <v-switch v-model="filters.Hunter"  dark class="mx-2" label="Hunter"></v-switch>
      <v-switch v-model="filters.Mage"    dark class="mx-2" label="Mage"></v-switch>
      <v-switch v-model="filters.Paladin" dark class="mx-2" label="Paladin"></v-switch>
      <v-switch v-model="filters.Priest"  dark class="mx-2" label="Priest"></v-switch>
      <v-switch v-model="filters.Rogue"   dark class="mx-2" label="Rogue"></v-switch>
      <v-switch v-model="filters.Shaman"  dark class="mx-2" label="Shaman"></v-switch>
      <v-switch v-model="filters.Warlock" dark class="mx-2" label="Warlock"></v-switch>
      <v-switch v-model="filters.Warrior" dark class="mx-2" label="Warrior"></v-switch>
    </v-row>

    <div class="d-flex justify-space-between flex-wrap">
      <div max-width="400px"
           min-width="300px"
           class="mb-5 mx-auto"
           v-for="gamer in selectedGamers"
      >
        <v-card :color="getClassColor(gamer.Class)">
          <v-card-title class="justify-space-between" >
            {{gamer.Gamers}}
            <v-chip>{{gamer.DKP}}</v-chip>
          </v-card-title>
          <v-card-subtitle align="left">
            {{gamer.Class}}
          </v-card-subtitle>
          <v-card-text class="gamer-log">
            <v-row v-for="row in gamer.Logs">
              <v-col>{{ row.Date }}</v-col>
              <v-col>{{ row.Event }}</v-col>
              <v-col>{{ row.DKP }}</v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </div>

  </div>
</template>

<script>
  import GoogleSheetsService from '@/services/GoogleSheetsService'
  export default {
    data () {
      return {
        gamers: [],
        selectedGamers: [],
        filters: {
          Druid: true,
          Hunter: true,
          Mage: true,
          Paladin: true,
          Priest: true,
          Rogue: true,
          Shaman: true,
          Warlock: true,
          Warrior: true,
          Benched: false
        }
      }
    },
    methods: {
      async refreshGamers () {
        this.gamers = (await GoogleSheetsService.get()).data
        this.filterGamers(this.filters)
      },
      filterGamers (filters) {
        let selectedGamers = this.gamers.filter(g => {
          if (filters.Benched === true) {
            return true
          } else {
            return g.Status === 'In Raid'
          }
        })
        selectedGamers = selectedGamers.filter(g => filters[g.Class] === true)
        this.selectedGamers = selectedGamers.sort(
          (a, b) => {
            if (a.Gamers > b.Gamers) return 1
            if (b.Gamers > a.Gamers) return -1
            return 0
          }
        )
      },
      getClassColor (c) {
        let classColors = {
          Warrior: 'brown lighten-2',
          Warlock: 'deep-purple lighten-3',
          Shaman: 'indigo lighten-2',
          Rogue: 'yellow lighten-3',
          Paladin: 'pink lighten-4',
          Mage: 'blue lighten-3',
          Druid: 'orange lighten-3',
          Hunter: 'light-green lighten-2',
          Priest: 'grey lighten-3'
        }
        return classColors[c] ? classColors[c] : 'red'
      }
    },
    watch: {
      filters: {
        handler: function (newVal, oldVal) {
          this.filterGamers(newVal)
        },
        deep: true
      }
    },
    async mounted () {
      await this.refreshGamers()
      setInterval(async () => {
        await this.refreshGamers()
        console.log('refreshing...')
      }, 30000)
    }
  }
</script>

<style scoped>
  .gamer-log {
    max-height:250px;
    overflow-y:auto;
  }

  .warriorCard {
    background: brown!important
  }
</style>
