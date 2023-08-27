<template>
  <div
    class="bg-[#E9E9E9] h-screen w-screen flex flex-col justify-center items-center"
  >
    <div></div>
    <div
      class="bg-white flex flex-col justify-center items-center w-11/12 py-10 gap-4 rounded-md sm:w-[500px]"
    >
      <h1 class="font-bold text-xl text-[#969696]">Create an account</h1>
      <div
        class="flex items-center justify-center gap-2 border border-[#E9E9E9] p-2 w-10/12 rounded-md"
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
        <button @click="register">SUBMIT</button>
      </div>

      <p>
        <span class="text-[#969696] font-bold">Already have an account? </span>
        <RouterLink to="/signin" class="text-[#3A7FC2] font-bold"
          >Log in</RouterLink
        >
      </p>
    </div>
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
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(data => {
      console.log('Successfullly registered');
      router.push('/');
    })
    .catch(error => {
      console.log(error.code);
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
