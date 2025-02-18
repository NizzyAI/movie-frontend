<template>
  <div>
    <router-link to="/movies">Movies</router-link>
    <router-link to="/categories">Categories</router-link>
    <router-link to="/register">Register</router-link>
  </div>
</template>

<script>
export default {
  computed: {
    isAdmin() {
      return this.$store.state.auth.user?.role === 'admin'
    },
  },
}
</script>

<style scoped>
router-link {
  margin: 10px;
  text-decoration: none;
  color: #ffa500;
}

router-link:hover {
  text-decoration: underline;
}
</style>
