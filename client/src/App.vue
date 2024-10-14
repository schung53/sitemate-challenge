<template>
  <div>
    <h1 style="margin-bottom: 20px">Sitemate Issues Tracker</h1>
    <li 
      v-for="issue in issues" 
      :key="issue.id" 
      style="margin-top: 5px; cursor: pointer;"
      @click="selectIssue(issue)"
    >
      {{ issue.title }} – {{ issue.description }}
    </li>

    <h2 style="margin-top: 70px;">Create a New Issue</h2>
    <form @submit.prevent="createIssue">
      <input v-model="newIssue.title" placeholder="Title" />
      <input v-model="newIssue.description" placeholder="Description" />
      <button type="submit">Create</button>
    </form>

    <div v-if="selectedIssue.id"> 
      <h2 style="margin-top: 70px;">Update {{ selectedIssue.title }}</h2>
      <form @submit.prevent="updateIssue">
        <input v-model="selectedIssue.title" placeholder="Title" />
        <input v-model="selectedIssue.description" placeholder="Description" />
        <button type="submit">Update</button>
      </form>

      <h2 style="margin-top: 70px;">Delete {{ selectedIssue.title }}</h2>
      <form @submit.prevent="deleteIssue">
        <button type="submit">Delete</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      issues: [],
      newIssue: {
        title: "",
        description: "",
      },
      selectedIssue: {
        id: "",
        title: "",
        description: ""
      }
    }
  },
  async mounted() {
    await this.getAllIssues()
  },
  methods: {
    selectIssue(issue) {
      this.selectedIssue = issue
    },
    async getAllIssues() {
      const response = await axios.get('http://localhost:3000/issues')
      this.issues = response.data
      console.log(response.data)
    },
    async createIssue() {
      const response = await axios.post('http://localhost:3000/issue', this.newIssue)
      console.log(response.status)
    },
    async updateIssue() {
      const response = await axios.put(
        `http://localhost:3000/issue/${this.selectedIssue.id}`, 
        this.selectedIssue
      )
      console.log(response.status)
    },
    async deleteIssue() {
      const response = await axios.delete(
        `http://localhost:3000/issue/${this.selectedIssue.id}`
      )
      console.log(response.status)
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
