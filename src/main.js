import "./assets/tailwind.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './utils/firebaseConfig';



initializeApp(firebaseConfig);
const app = createApp(App);

app.use(router);

app.mount('#app');