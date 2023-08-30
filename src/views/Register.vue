<template>
  <div class="bg-grey2 h-screen w-screen flex justify-center items-center">
    <section
      class="bg-white flex flex-col justify-center items-center w-11/12 py-10 gap-4 rounded-md sm:w-[500px]"
    >
      <h1 class="font-bold text-xl text-grey3">Create an account</h1>
      <div
        class="flex items-center justify-center gap-2 border border-grey2 p-2 w-10/12 rounded-md"
      >
        <div class="w-4"><img :src="GoogleLogo" alt="google logo" /></div>
        <button @click="singInWithGoogle">Sign in With Google</button>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-20 border-b border-gray-400"></div>
        <span class="text-gray-600">or</span>
        <div class="w-20 border-b border-gray-400"></div>
      </div>
      <input
        class="bg-grey1 w-10/12 p-2 rounded-md focus:outline-none focus:ring-grey3 focus:ring-2 caret-grey3"
        type="text"
        placeholder="Email"
        v-model="email"
      />
      <input
        class="bg-grey1 w-10/12 p-2 rounded-md focus:outline-none focus:ring-grey3 focus:ring-2 caret-grey3"
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <p
        class="bg-red1 border border-red4 text-red3 w-10/12 p-1.5"
        v-if="errMsg"
      >
        {{ errMsg }}
      </p>
      <div class="bg-blue3 w-10/12 p-2 rounded text-center text-white">
        <button @click="register">SUBMIT</button>
      </div>

      <p>
        <span class="text-grey3 font-bold">Already have an account? </span>
        <RouterLink to="/signin" class="text-blue3 font-bold"
          >Log in</RouterLink
        >
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'vue-router';
import GoogleLogo from '../assets/images/google-logo.png';

const email = ref('');
const password = ref('');
const errMsg = ref();
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(data => {
      router.push('/');
    })
    .catch(error => {
      console.log(error.code);
      if (error.code === 'auth/invalid-email') {
        errMsg.value = 'This email address is invalid';
      }
      if (error.code === 'auth/email-already-in-use') {
        errMsg.value = 'This email is already used';
      } else {
        errMsg.value = error.message;
      }
    });
};

const singInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then(result => {
      console.log(result.user);
      router.push('/');
    })
    .catch(error => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>
