<template>
<div>
<b-row>
    <b-col cols="12">
      <h2>
        Login
      </h2>
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
</div>
  
</template>

<script>

// import router from '../router'
import axios from 'axios'
export default {
 name: 'Login',
  data (){
    return {
      login: { email: '', password: '' }
    }
  },
  created() {
    axios.get('data.json')
        .then(data => {
            // console.log(data.data.data);
        })
  },
  methods: {
    onSubmit: async function (evt) {
      evt.preventDefault()
      router.push({
        name: 'room',
        params: { name: this.login.email }
      })
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>