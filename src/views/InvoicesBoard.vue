<template>
  <header class="my-6 w-11/12 mx-auto max-w-4xl">
    <div class="flex flex-col">
      <h1 class="text-grey4 font-bold text-4xl">Invoices</h1>
      <span class="text-grey4 text-base">There are 1 total invoices</span>
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
            Pending
          </li>
          <li class="hover:bg-grey1 px-2 py-1" @click="filteredInvoices">
            Paid
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

  <div class="flex flex-col gap-3 w-11/12 mx-auto max-w-4xl justify-center">
    <article
      class="flex justify-between items-center bg-blue5 text-white rounded-md p-5 shadow-md shadow-grey3"
      v-for="invoice in invoiceData"
      :key="invoice.docId"
    >
      <div
        class="grid grid-cols-2 gap-2 xs:grid-cols-3 xs:gap-x-10 sm:gap-x-20 md:grid-cols-5 lg:gap-x-14 md:gap-x-10 items-center"
      >
        <p class="font-bold justify-self-start">#{{ invoice.invoiceNumber }}</p>
        <p class="justify-self-start">Due {{ invoice.paymentDueDate }}</p>
        <p class="">{{ invoice.issueName }}</p>

        <p class="font-bold justify-self-end">
          {{ invoice.totalAmount }} {{ invoice.currency }}
        </p>
        <div class="">
          <div
            v-if="invoice.invoicePending === 'pending'"
            class="justify-self-end flex gap-2 border border-red4/30 sm:py-2 sm:px-4 rounded-lg bg-red4/20 py-1 px-2"
          >
            <p class="text-red4">●</p>

            <p class="font-semibold">{{ invoice.invoicePending }}</p>
          </div>
          <div
            v-else-if="invoice.invoicePending === 'paid'"
            class="justify-self-end flex gap-2 border border-green/30 sm:py-2 sm:px-4 rounded-lg bg-green/20 sm:pl-10 py-1 px-2"
          >
            <p class="text-green">●</p>
            <p class="font-semibold">{{ invoice.invoicePending }}</p>
          </div>
        </div>
      </div>
      <div class="justify-self-end w-[20px]">
        <img src="../assets/images/arrow-right.svg" alt="arrow right" />
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '../utils/firebaseConfig';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// state variables
const invoiceData = ref([]);
const filterMenu = ref(false);
const filteredInvoice = ref(null);

// Fetch invoice data from Firebase on component mount
onMounted(async () => {
  const getData = collection(db, 'invoices');
  const results = await getDocs(getData);
  results.forEach(doc => {
    const data = doc.data();
    console.log(invoiceData.value);
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
    });
  });
});

const filteredData = computed(() => {
  if (filteredInvoice.value === null) {
    return invoiceData.value;
  } else {
    return invoiceData.value.filter(
      invoice => invoice.invoicePending === filteredInvoice.value
    );
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
