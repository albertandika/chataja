<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="test">TEST</button>
    <button @click="add">Add</button>

    <div class="chat-box">
        <ul v-for="chat in chats" :key="chat.key">
          <li>{{chat.sendDate}}</li>
          <li>{{chat.message}}</li>
          <li>{{chat.user}}</li>
        </ul>
      </div>
      <!-- <login /> -->
  </div>
</template>
<script>
import firebase from '../firebase'
// import Login from './Login'
export default {
  // components: {
  //   Login,
  // },
  data() {
    return {
      chats: [],
    }
  },
  created () {
    firebase.database().ref('chat').on('value', (snapshot) => {
      this.chats = [];
      snapshot.forEach((doc) => {
        let item = doc.val()
        item.key = doc.key
        this.chats.push(item)
      });
    })
  },
  methods: {
    test() {
      let joinData = firebase.database().ref('chat').push();
    joinData.set({
      type: 'join',
      user: 'albert',
      message: 'has joined this room.',
      sendDate: Date()
    });
    },
    add () {
     let joinData = firebase.database().ref('chat').push();
    joinData.set({
      type: 'join',
      user: 'ali',
      message: 'has joined this room.',
      sendDate: Date()
    }); 
    }
  }
}
</script>
