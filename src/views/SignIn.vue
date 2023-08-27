<template>
  <div
    class="bg-[#E9E9E9] h-screen w-screen flex flex-col justify-center items-center"
  >
    <div
      class="bg-white flex flex-col justify-center items-center w-11/12 py-10 gap-4 rounded-md sm:w-[500px]"
    >
      <h1 class="font-bold text-xl text-[#969696]">User Log in</h1>
      <div
        class="flex items-center justify-center gap-2 border border-[#E9E9E9] p-2 w-10/12 rounded-md"
      >
        <div class="w-4"><img :src="GoogleLogo" alt="" /></div>
        <button @click="singInWithGoogle">Sign in With Google</button>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-20 border-b border-gray-400"></div>
        <span class="text-gray-600">or</span>
        <div class="w-20 border-b border-gray-400"></div>
      </div>
      <input
        class="bg-[#F2F2F2] w-10/12 p-2 rounded-md focus:outline-none focus:ring-[#969696] focus:ring-2 caret-[#969696]"
        type="text"
        placeholder="Email"
        v-model="email"
      />
      <input
        class="bg-[#F2F2F2] w-10/12 p-2 rounded-md focus:outline-none focus:ring-[#969696] focus:ring-2 caret-[#969696]"
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <p
        class="bg-[#FBDADA] border border-[#e30904] text-[#eb2300] w-10/12 p-1.5"
        v-if="errMsg"
      >
        {{ errMsg }}
      </p>
      <div class="bg-[#3A7FC2] w-10/12 p-2 rounded text-center text-white">
        <button @click="register">LOGIN</button>
      </div>

      <p>
        <span class="text-[#969696] font-bold">No account? </span>
        <RouterLink to="/register" class="text-[#3A7FC2] font-bold"
          >Sign up</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'vue-router';
import GoogleLogo from '../assets/images/google-logo.png';

const email = ref('');
const password = ref('');
const errMsg = ref(); // error message
const router = useRouter();

const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(data => {
      console.log('Successfullly signed in');
      router.push('/');
    })
    .catch(error => {
      console.log(error.code);
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'This email address is invalid';
          break;
        case 'auth/user-not-found':
          errMsg.value = 'No account with that email was found';
          break;
        case 'auth/wrong-password':
          errMsg.value = 'Incorrect password';
          break;
        default:
          errMsg.value = 'Email or password was incorrect';
          break;
      }

      alert(error.message);
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
