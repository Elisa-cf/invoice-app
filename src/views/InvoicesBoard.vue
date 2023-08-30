<template>
  <div v-if="loading" class="flex justify-center mt-10">
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <div v-if="!loading">
    <header class="my-6 w-11/12 mx-auto max-w-4xl">
      <div class="flex flex-col">
        <h1 class="text-grey4 font-bold text-4xl">Invoices</h1>
        <span class="text-grey4 text-base"
          >There are {{ filteredAndUserData.length }} total invoices</span
        >
      </div>
      <div class="flex justify-between items-center mt-4">
        <div
          @click="toggleFilterMenu"
          class="flex text-grey4 font-bold gap-1 items-center relative cursor-pointer"
        >
          <span class="text-md"
            >Filter by status
            <span v-if="filteredInvoice">: {{ filteredInvoice }}</span></span
          >
          <img
            src="@/assets/images/arrow-down.svg"
            alt="arrow down"
            class="w-5 mt-1"
          />
          <ul
            v-show="filterMenu"
            class="bg-grey2 rounded-md top-6 absolute right-0 w-[135px] font-normal text-black"
          >
            <li class="hover:bg-grey1 px-2 py-1" @click="filteredInvoices">
              pending
            </li>
            <li class="hover:bg-grey1 px-2 py-1" @click="filteredInvoices">
              paid
            </li>
            <li class="hover:bg-grey1 px-2 py-1" @click="filteredInvoices">
              Clear Filter
            </li>
          </ul>
        </div>

        <div>
          <RouterLink to="/"
            ><button
              class="flex items-center gap-1 bg-blue4 p-2 rounded text-center text-white font-semibold"
            >
              <span class="bg-white rounded-full p-1">
                <img
                  src="@/assets/images/plus-icon.svg"
                  alt="plus icon"
                  class="w-3" /></span
              >New Invoice
            </button></RouterLink
          >
        </div>
      </div>
    </header>

    <div
      class="flex flex-col gap-3 w-11/12 mx-auto max-w-4xl justify-center mb-10"
    >
      <div v-for="invoice in filteredAndUserData" :key="invoice.docId">
        <article
          class="flex justify-between items-center bg-blue5 text-white rounded-md p-5 shadow-md shadow-grey3"
        >
          <div
            class="grid grid-cols-2 gap-2 xs:grid-cols-3 xs:gap-x-10 sm:gap-x-20 md:grid-cols-5 lg:gap-x-14 md:gap-x-10 items-center"
          >
            <p class="font-bold justify-self-start">
              # {{ invoice.invoiceNumber }}
            </p>
            <p class="justify-self-start">Due {{ invoice.paymentDueDate }}</p>
            <p class="">{{ invoice.issueName }}</p>

            <p class="font-bold justify-self-end">
              {{ invoice.totalAmount }} {{ invoice.currency }}
            </p>
            <div>
              <div
                :class="{
                  flex: true,
                  'justify-self-end': true,
                  'gap-2': true,
                  'rounded-lg': true,
                  'py-1': true,
                  'px-2': true,
                  'sm:py-2': true,
                  'sm:px-4': true,
                  'border-red4/30': invoice.invoicePending === 'pending',
                  'border-green/30': invoice.invoicePending === 'paid',
                  'bg-red4/20': invoice.invoicePending === 'pending',
                  'bg-green/20': invoice.invoicePending === 'paid',
                  'sm:pl-10': invoice.invoicePending === 'paid',
                }"
              >
                <p
                  :class="{
                    'text-red4': invoice.invoicePending === 'pending',
                    'text-green': invoice.invoicePending === 'paid',
                  }"
                >
                  ●
                </p>
                <p class="font-semibold">{{ invoice.invoicePending }}</p>
              </div>
            </div>
          </div>
          <div class="justify-self-end w-[20px]">
            <img src="../assets/images/arrow-right.svg" alt="arrow right" />
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '../utils/firebaseConfig';
import { getAuth } from 'firebase/auth';

// Initialize Firebase to fetch the data
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const auth = getAuth();
const user = auth.currentUser; // to check which user is login from my db

// state variables
const loading = ref(true);
const invoiceData = ref([]);
const filterMenu = ref(false);
const filteredInvoice = ref(null);

// Fetch invoice data from Firebase on component mount. Not with fetch or Axios because the format data in FireBase is not json
onMounted(async () => {
  const getData = collection(db, 'invoices');
  const results = await getDocs(getData);

  results.forEach(doc => {
    const data = doc.data();

    invoiceData.value.push({
      docId: doc.id,
      country: data.country,
      currency: data.currency,
      invoiceDate: data.invoiceDate,
      invoiceNumber: data.invoiceNumber,
      invoicePending: data.invoicePending,
      issueName: data.issueName,
      paymentDueDate: data.paymentDueDate,
      pdfFile: data.pdfFile,
      totalAmount: data.totalAmount,
      vatNumber: data.vatNumber,
      userId: data.userId,
    });
  });
  loading.value = false;
});

// Filtering data by status and by login user (userId from db)
const filteredAndUserData = computed(() => {
  if (filteredInvoice.value === 'pending' || filteredInvoice.value === 'paid') {
    return invoiceData.value.filter(
      invoice =>
        invoice.userId === user.uid &&
        invoice.invoicePending === filteredInvoice.value
    );
  } else if (filteredInvoice.value === 'Clear Filter') {
    return invoiceData.value.filter(invoice => invoice.userId === user.uid);
  } else {
    return invoiceData.value.filter(invoice => invoice.userId === user.uid);
  }
});

// methods for toggling filter menu and filtering invoices
const toggleFilterMenu = () => {
  filterMenu.value = !filterMenu.value;
};

const filteredInvoices = e => {
  if (e.target.innerText === 'Clear Filter') {
    filteredInvoice.value = null;
    return;
  }
  filteredInvoice.value = e.target.innerText;
};
</script>

<style scoped></style>
