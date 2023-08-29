<template>
  <header>
    <nav class="flex items-center justify-between px-2 py-2 border-b-10">
      <RouterLink to="/">
        <div class="w-24"><img :src="BankableLogo" alt="google logo" /></div
      ></RouterLink>

      <RouterLink to="/invoicesboard"
        ><button class="bg-blue1 p-2 rounded text-center text-white sm:hidden">
          My Invoices
        </button></RouterLink
      >
      <button
        class="flex items-center gap-1 sm:gap-2 font-bold sm:hidden"
        @click="handleSignOut"
        v-if="isLoggedIn"
      >
        <p class="text-grey4">Log out</p>
        <div class="w-4"><img :src="LogOut" alt="log out logo" /></div>
      </button>
      <div class="items-center sm:flex hidden gap-2">
        <RouterLink to="/invoicesboard"
          ><button class="bg-blue1 p-2 rounded text-center text-white">
            My Invoices
          </button></RouterLink
        >
        <button
          class="flex items-center gap-1 sm:gap-2 font-bold"
          @click="handleSignOut"
          v-if="isLoggedIn"
        >
          <p class="text-grey4">Log out</p>
          <div class="w-4"><img :src="LogOut" alt="log out logo" /></div>
        </button>
      </div>
    </nav>
    <div class="w-full"><img :src="BankableLine" alt="bankable line" /></div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import router from '../router';
import BankableLogo from '../assets/images/bankable-logo.png';
import LogOut from '../assets/images/log-out.svg';
import BankableLine from '../assets/images/bankable-line.jpg';

const isLoggedIn = ref(false);

//I used onMounted hook to access Firebase once the app is mounted. Showing the logout only if there is a user login
let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, user => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/signin');
  });
};
</script>

<style scoped></style>
