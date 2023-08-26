import "./assets/tailwind.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBSKXVi8bLWmDm36Pl1XebXesubHUluIFM',
  authDomain: 'bankable-a113d.firebaseapp.com',
  projectId: 'bankable-a113d',
  storageBucket: 'bankable-a113d.appspot.com',
  messagingSenderId: '460820204014',
  appId: '1:460820204014:web:facf89f3b64562cf0f66ff',
};

initializeApp(firebaseConfig);
const app = createApp(App);

app.use(router);

app.mount('#app');