<template>
  <div class="userContainer">
    <div
      v-for="user in users"
      class="mb-3 d-flex justify-center flex-column"
    >
        <v-card class="userCard">
          <div>{{user.createdAt | moment("MM / DD / YYYY")}}</div>
          <div>{{user.username }}</div>
          <v-switch
              v-model="user.isAdmin"
              class="mx-2"
              label="Admin"
              color="red darken-3"
              @change="setAdmin(user)"
              :disabled="$store.state.user && user.id === $store.state.user.id"
          >
          </v-switch>
        </v-card>
    </div>
  </div>
</template>

<script>
  import UserService from '@/services/UserService'
  export default {
    data () {
      return {
        headers: [],
        users: []
      }
    },
    methods: {
      async setAdmin (user) {
        try {
          user = await UserService.put(user)
        } catch (err) {
          console.log(err)
        }
      }
    },
    async mounted () {
      this.headers = ['id', 'username', 'password', 'createdAt', 'updatedAt']
      this.users = (await UserService.get()).data
    }
  }
</script>

<style scoped>
  .userContainer {
    max-width:750px;
    margin:auto
  }

  .userCard {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    width:100%;
  }

  .userCard > div {
    flex: 0 1 20%;
  }
</style>
