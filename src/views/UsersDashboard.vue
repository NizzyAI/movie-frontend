<template>
  <div>
    <h2>User Dashboard</h2>
    <UserCard :user="user" />
  </div>
</template>

<script>
import UserCard from '@/components/UserCard.vue'
import NavigationLinks from '@/components/NavigationLinks.vue'
import LogoutButton from '@/components/LogoutButtonS.vue'

export default {
  _components: {
    UserCard,
    NavigationLinks,
    LogoutButton,
  },
  get components() {
    return this._components
  },
  set components(value) {
    this._components = value
  },
  data() {
    return {
      user: null,
    }
  },
  async created() {
    await this.fetchUser()
  },
  methods: {
    fetchUser() {
      const userData = JSON.parse(localStorage.getItem('user'))
      if (userData) {
        this.user = userData
      }
    },

    goToMovies() {
      this.$router.push({ name: 'Movies' })
    },

    goToCategories() {
      this.$router.push({ name: 'Categories' })
    },
  },
}
</script>

<style scoped>
h2 {
  color: #42b983;
}

p {
  font-size: 16px;
  margin: 8px 0;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #369f6e;
}
</style>
