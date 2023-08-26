<template>
  <div
    class="bg-[#E9E9E9] h-full w-full flex flex-col justify-center items-center"
  >
    <h1>Sign in in your Account</h1>
    <div class="bg-white h-1/2 w-12">
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p v-if="errMsg">{{ errMsg }}</p>
      <button @click="register">Submit</button>
      <button @click="singInWithGoogle">Sign in With Google</button>
      <p>
        <span>No account?</span> <RouterLink to="/register">Sign up</RouterLink>
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
          errMsg.value = 'Invalid email';
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
