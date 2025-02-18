<template>
  <div>
    <h2>Admin Dashboard</h2>

    <UserCard :user="adminForm" />

    <LogoutButton />

    <NavigationLinks />

    <div>
      <h3>Your Details</h3>
      <form @submit.prevent="updateAdmin">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="adminForm.name" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="adminForm.email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="adminForm.password" required />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>

    <div>
      <h3>Manage Users</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <select v-model="user.role" @change="updateUserRole(user)">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </td>
            <td>
              <button @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <h3>Manage Movies</h3>
      <form @submit.prevent="addMovie">
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="movieForm.title" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea id="description" v-model="movieForm.description" required></textarea>
        </div>
        <button type="submit">Add Movie</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies" :key="movie.id">
            <td>{{ movie.title }}</td>
            <td>{{ movie.description }}</td>
            <td>
              <button @click="editMovie(movie)">Edit</button>
              <button @click="deleteMovie(movie.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <h3>Manage Categories</h3>
      <form @submit.prevent="addCategory">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="categoryForm.name" required />
        </div>
        <button type="submit">Add Category</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.name }}</td>
            <td>
              <button @click="editCategory(category)">Edit</button>
              <button @click="deleteCategory(category.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import UserCard from '@/components/UserCard.vue'
import LogoutButton from '@/components/LogoutButtonS.vue'
import NavigationLinks from '@/components/NavigationLinks.vue'

export default {
  components: {
    UserCard,
    LogoutButton,
    NavigationLinks,
  },
  data() {
    return {
      adminForm: {
        name: '',
        email: '',
        password: '',
      },
      users: [],
      movieForm: {
        title: '',
        description: '',
      },
      movies: [],
      categoryForm: {
        name: '',
      },
      categories: [],
    }
  },
  async created() {
    await this.fetchAdmin()
    await this.fetchUsers()
    await this.fetchMovies()
    await this.fetchCategories()
  },
  methods: {
    fetchAdmin() {
      const adminData = JSON.parse(localStorage.getItem('user'))
      if (adminData) {
        this.adminForm.name = adminData.name
        this.adminForm.email = adminData.email
      }
    },

    async updateAdmin() {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/users/${this.adminForm.id}`,
          this.adminForm,
        )
        localStorage.setItem('user', JSON.stringify(response.data))
        alert('Admin details updated successfully!')
      } catch (error) {
        console.error('Error updating admin:', error)
        alert('Failed to update admin details.')
      }
    },

    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8000/api/users')
        this.users = response.data
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },

    async updateUserRole(user) {
      try {
        await axios.put(`http://localhost:8000/api/users/${user.id}`, {
          role: user.role,
        })
        alert('User role updated successfully!')
      } catch (error) {
        console.error('Error updating user role:', error)
        alert('Failed to update user role.')
      }
    },

    async deleteUser(userId) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${userId}`)
        this.users = this.users.filter((user) => user.id !== userId)
        alert('User deleted successfully!')
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('Failed to delete user.')
      }
    },

    async fetchMovies() {
      try {
        const response = await axios.get('http://localhost:8000/api/movies')
        this.movies = response.data
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    },

    async addMovie() {
      try {
        const response = await axios.post('http://localhost:8000/api/movies', this.movieForm)
        this.movies.push(response.data)
        this.movieForm = { title: '', description: '' }
        alert('Movie added successfully!')
      } catch (error) {
        console.error('Error adding movie:', error)
        alert('Failed to add movie.')
      }
    },

    async editMovie(movie) {
      try {
        const updatedMovie = {
          ...movie,
          title: prompt('Enter new title:', movie.title),
          description: prompt('Enter new description:', movie.description),
        }
        await axios.put(`http://localhost:8000/api/movies/${movie.id}`, updatedMovie)
        this.movies = this.movies.map((m) => (m.id === movie.id ? updatedMovie : m))
        alert('Movie updated successfully!')
      } catch (error) {
        console.error('Error updating movie:', error)
        alert('Failed to update movie.')
      }
    },

    async deleteMovie(movieId) {
      try {
        await axios.delete(`http://localhost:8000/api/movies/${movieId}`)
        this.movies = this.movies.filter((movie) => movie.id !== movieId)
        alert('Movie deleted successfully!')
      } catch (error) {
        console.error('Error deleting movie:', error)
        alert('Failed to delete movie.')
      }
    },

    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:8000/api/categories')
        this.categories = response.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },

    async addCategory() {
      try {
        const response = await axios.post('http://localhost:8000/api/categories', this.categoryForm)
        this.categories.push(response.data)
        this.categoryForm = { name: '' }
        alert('Category added successfully!')
      } catch (error) {
        console.error('Error adding category:', error)
        alert('Failed to add category.')
      }
    },

    async editCategory(category) {
      try {
        const updatedCategory = { ...category, name: prompt('Enter new name:', category.name) }
        await axios.put(`http://localhost:8000/api/categories/${category.id}`, updatedCategory)
        this.categories = this.categories.map((c) => (c.id === category.id ? updatedCategory : c))
        alert('Category updated successfully!')
      } catch (error) {
        console.error('Error updating category:', error)
        alert('Failed to update category.')
      }
    },

    async deleteCategory(categoryId) {
      try {
        await axios.delete(`http://localhost:8000/api/categories/${categoryId}`)
        this.categories = this.categories.filter((category) => category.id !== categoryId)
        alert('Category deleted successfully!')
      } catch (error) {
        console.error('Error deleting category:', error)
        alert('Failed to delete category.')
      }
    },
  },
}
</script>

<style scoped>
h2 {
  color: #42b983;
}

form div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  padding: 8px;
  width: 100%;
  max-width: 300px;
}

button {
  padding: 10px 20px;
  background-color: #ffa500;
  color: white;
  border: none;
  cursor: pointer;
  margin: 5px;
}

button:hover {
  background-color: #ffa500;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

th {
  background-color: #ffa500;
  color: white;
}
</style>
