<template>
  <b-container class="bv-example-row bv-example-row-flex-cols">
    <b-row class="">
        <b-col cols="12" align-self="center">
            <div class="home">
            <main>
              <header class="block">
                <div class="header-left">
                  <b-img rounded="circle" :src="chooseImage(profile.name)" width="40" alt="Circle image"></b-img>
                  <span>{{profile.name}}</span>
                </div>
                <div class="header-right">
                  <button class="btn btn-secondary" @click="logout">Logout</button>
                </div>
              </header>
        <div class="chat-box">
        <b-list-group>
          <b-list-group-item class="chat-item" v-for="chat in chats" :key="chat.key">
            <div>
              <div class="chat-message text-right" v-if="chat.user === profile.name">
                <div class="right-bubble">
                  <span class="msg-name">Me</span>
                  <span class="msg-date">{{chat.sendDate | timeConvert}}</span>
                  <p text-wrap>{{chat.message}}</p>
                </div>
              </div>
              <div class="chat-message text-left" text-left v-if="chat.user !== profile.name">
                <b-img rounded="circle" class="left-image" :src="chooseImage(chat.user)" width="40" alt="Circle image"></b-img>
                <div class="left-bubble">
                  <span class="msg-name">{{chat.user}}</span>
                  <span class="msg-date">{{chat.sendDate | timeConvert}}</span>
                  <p text-wrap>{{chat.message}}</p>
                </div>
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
      <footer class="sticky-footer">
        <b-form @submit="onSubmit">
          <b-input-group>
              <b-form-input id="message" v-model.trim="data.message" placeholder="Enter your message"></b-form-input>
              <b-button type="submit" variant="primary" :disabled="!data.message">Send</b-button>
          </b-input-group>
        </b-form>
      </footer>
            </main>
          </div>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import firebase from '@/firebase'
import moment from 'moment'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'home',
  data () {
    return {
      profile: {name: '', image: '', email: ''},
      chats: [],
      data: {message: ''},
    }
  },
  created () {
    if (localStorage.isLoggin) {
      firebase.database().ref('chat').on('value', (snapshot) => {
      this.chats = [];
      snapshot.forEach((doc) => {
        let item = doc.val()
        item.key = doc.key
        this.chats.push(item)
      });
    })
      const data = JSON.parse(localStorage.data)
      this.profile.name = data.name
      this.profile.image = data.image
      this.profile.email = data.email
    } else {
      this.$router.push({
            name: 'login',
          })
    }
  },
  methods: {
     onSubmit (evt) {
        evt.preventDefault()

        let newData = firebase.database().ref('chat').push();
        newData.set({
            type: 'newmsg',
            user: this.profile.name,
            message: this.data.message,
            sendDate: Date()
        });
        this.data.message = '';
    },
    chooseImage (username) {
      console.log(username)
      if (username == 'Jarjit Singh') {
        return 'https://api.adorable.io/avatars/160/jarjit@mail.com.png'
      } else if (username == 'Ismail') {
        return 'https://api.adorable.io/avatars/160/ismail@mail.com.png'
      } else {
        return ''
      }
    },
    logout () {
      localStorage.clear();
      this.$router.push({
            name: 'login',
          }) 
    }
  },
  filters: {
    timeConvert: function (time) {
      const now = moment().format('DD-MM-YYYY')
      console.log('1', now, time)
      time = new Date(time)
      console.log('2', time)
      const after = moment(time).format('DD-MM-YYYY')
      if (after != now) {
        return moment(time).format('DD/MM/YYYY HH:mm A')
      } else {
       return  moment(time).format('HH:mm A')
      }
    }
  }
}
</script>
<style scoped>
  .block {
    display: block;
    background: #dcf8c6;
  }
  .header-right{
    float: right;
  }

  .header-left{
    float: left;
  }

  .header-left>span{
    padding: 0px 10px;
    font-size: 20px;
  }

  .chat-box {
    height: 85vh;
    width: 100%;
    overflow: scroll;
    border: 2px solid;
  }
  .chat-item {
    border: none;
  }
  .chat-message {
    width: 80%;
    min-height: 40px;
  }
  .chat-message .right-bubble {
    position: relative;
    background: #dcf8c6;
    border-top-left-radius: .4em;
    border-bottom-left-radius: .4em;
    border-bottom-right-radius: .4em;
    padding: 5px 10px 10px;
    left: 24%;
  }
  .chat-message .right-bubble span.msg-name {
    font-size: 12px;
    font-weight: bold;
    color: green;
    display: block;
  }
  .left-image{
    position: relative;
    float: left;
    left: -2%;
  }

  .chat-message .right-bubble span.msg-date {
    font-size: 10px;
    display: block;
  }
  .chat-message .right-bubble:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
    height: 0;
    border: 27px solid transparent;
    border-left-color: #dcf8c6;
    border-right: 0;
    border-top: 0;
    margin-top: -0.5px;
    margin-right: -27px;
  }
  .chat-message .left-bubble {
    position: relative;
    background: #efefef;
    border-top-right-radius: .4em;
    border-bottom-left-radius: .4em;
    border-bottom-right-radius: .4em;
    padding: 5px 10px 10px;
    left: 5%;
  }
  .chat-message .left-bubble span.msg-name {
    font-size: 12px;
    font-weight: bold;
    color: blue;
    display: block;
  }
  .chat-message .left-bubble span.msg-date {
    font-size: 10px;
    display: block;
  }
  .chat-message .left-bubble:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    border: 27px solid transparent;
    border-right-color: #efefef;
    border-left: 0;
    border-top: 0;
    margin-top: -0.5px;
    margin-left: -27px;
  }
  footer.sticky-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    background-color: #ffffff;
    border-top: solid 1px #efefef;
  }

  @media only screen and (max-width:1200px) {
    .chat-message .left-bubble{
      left: 7%;
    }
}
@media only screen and (max-width:990px) {
    .chat-message .left-bubble{
      left: 10%;
    }
}

@media only screen and (max-width:768px) {
    .chat-message .left-bubble{
      left: 14%;
    }
}
</style>
