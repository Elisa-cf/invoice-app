<template>
  <header class="mt-6 w-11/12 mx-auto max-w-4xl">
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
  <ul>
    <li v-for="invoice in invoiceData" :key="invoice.docId">
      <div>
        <span>#{{ invoice.invoiceNumber }}</span>
        <span>{{ invoice.paymentDueDate }}</span>
        <span>{{ invoice.issueName }}</span>
      </div>
      <div class="right flex">
        <span class="price"
          >{{ invoice.totalAmount }} {{ invoice.currency }}</span
        >
        <div>
          {{ invoice.invoicePending }}
        </div>
        <div class="icon">
          <img src="@/assets/icon-arrow-right.svg" alt="" />
        </div>
      </div>
    </li>
  </ul>
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

// computed property for filtered data
const filteredData = computed(() => {
  return invoiceData.value.filter(invoice => {
    if (filteredInvoice.value === 'Pending') {
      return invoice.invoicePending === true;
    }
    if (filteredInvoice.value === 'Paid') {
      return invoice.invoicePaid === true;
    }
    return true;
  });
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
