<template>
<b-container class="bv-example-row bv-example-row-flex-cols">
<b-row class="justify-content-md-center" style="height: 100vh; text-align: center;">
    <b-col cols="8" align-self="center">
      <h2>
        Login
      </h2>
        <b-alert variant="warning" show v-if="!correct.check && correct.submit">Email or Password Wrong</b-alert>
      <b-jumbotron>
        <b-form @submit="onSubmit">
          <b-row class="my-1">
      <b-col sm="3">
        <label for="email">Email:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input :type="'email'"
        v-model.trim="login.email" placeholder="Enter your email"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label for="password">Password:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input
        id="password"
        :type="'password'"
        v-model="login.password"
        ></b-form-input>
      </b-col>
    </b-row>
          <b-button type="submit" variant="primary" :disabled="!login.email || !login.password">Login</b-button>
        </b-form>
      </b-jumbotron>
    </b-col>
  </b-row>
</b-container>
  
</template>

<script>

import router from '../router'
import axios from 'axios'
export default {
 name: 'Login',
  data (){
    return {
      login: { email: '', password: '' },
      userData: [],
      correct: {submit: false, check: false}
    }
  },
  created() {
    if(!localStorage.isLoggin) {
      axios.get('data.json')
        .then(data => {
            this.userData = data.data.data
        })
    } else {
       router.push({
            name: 'home',
          }) 
    }
  },
  methods: {
    onSubmit: async function (evt) {
      evt.preventDefault()
      this.correct.submit = true
      this.checkLogin()

    },
    checkLogin () {
      for (let i in this.userData) {
        if (this.userData[i].email == this.login.email && this.userData[i].password == this.login.password) {
          localStorage.setItem('isLoggin', true)
          localStorage.setItem('data', JSON.stringify(this.userData[i]))
          router.push({
            name: 'home',
          })
          return true
        }
      }
      this.correct.check = false
      this.login.password = ''
      setTimeout(() => {
        this.correct.submit = false
        document.getElementById('password').focus()
      }, 2000)
    },
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>