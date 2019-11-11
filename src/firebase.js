import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDER0ZPjVNJh_LyWEaEjGefJsEbGDWwZ5A",
  authDomain: "chat-c47b1.firebaseapp.com",
  databaseURL: "https://chat-c47b1.firebaseio.com",
  projectId: "chat-c47b1",
  storageBucket: "chat-c47b1.appspot.com"
};
firebase.initializeApp(config);

export default firebase;