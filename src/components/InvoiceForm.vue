<template>
  <div class="bg-white flex justify-center items-center my-16 relative">
    <form
      @submit.prevent="submitForm"
      class="flex flex-col py-6 w-11/12 mx-auto max-w-2xl bg-blue1/40 gap-5 p-2 rounded-md sm:p-6"
    >
      <div class="flex flex-col justify-center items-start">
        <label class="text-grey4 font-semibold" for="clientEmail"
          >Invoice Number</label
        >
        <input
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-blue2 focus:ring-2 caret-blue2"
          required
          type="text"
          id="invoiceNumber"
          v-model="invoiceNumber"
        />
      </div>
      <div class="flex flex-col justify-center items-start">
        <label for="issueName" class="text-grey4 font-semibold"
          >Issue Name</label
        >
        <input
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-blue2 focus:ring-2 caret-blue2"
          required
          type="text"
          id="issueName"
          v-model="issueName"
        />
      </div>
      <div class="flex flex-col justify-center items-start">
        <label class="text-grey4 font-semibold" for="currency">Currency</label>

        <select required type="text" id="currency" v-model="currency">
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      <div class="flex flex-col justify-center items-start">
        <label class="text-grey4 font-semibold" for="totalAmount"
          >Total Amount</label
        >
        <input
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-blue2 focus:ring-2 caret-blue2"
          required
          type="number"
          id="totalAmount"
          v-model="totalAmount"
        />
      </div>
      <div class="flex flex-col justify-center items-start">
        <label class="text-grey4 font-semibold" for="clientCity">Country</label>
        <input
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-blue2 focus:ring-2 caret-blue2"
          required
          type="text"
          id="country"
          v-model="country"
        />
      </div>
      <div class="flex flex-col justify-center items-start">
        <label class="text-grey4 font-semibold" for="vatNumber"
          >VAT Number</label
        >
        <input
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-blue2 focus:ring-2 caret-blue2"
          required
          type="text"
          id="vatNumber"
          v-model="vatNumber"
        />
      </div>

      <div class="flex flex-col justify-center items-start">
        <label for="invoiceDate" class="text-grey4 font-semibold"
          >Date Issue</label
        >
        <input
          type="date"
          v-bind:max="today"
          id="invoiceDate"
          v-model="invoiceDate"
          required
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-blue2 focus:ring-2 caret-blue2"
        />
      </div>
      <div class="flex flex-col justify-center items-start">
        <label for="paymentDueDate" class="text-grey4 font-semibold"
          >Due Date:</label
        >
        <input
          required
          type="date"
          id="paymentDueDate"
          v-model="paymentDueDate"
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-blue2 focus:ring-2 caret-blue2"
          v-bind:min="today"
        />
      </div>

      <div class="flex flex-col justify-center items-start">
        <label class="text-grey4 font-semibold" for="invoicePending"
          >Invoice Status</label
        >

        <select
          required
          type="text"
          id="invoicePending"
          v-model="invoicePending"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <div class="flex flex-col justify-center items-start">
        <label for="pdfFile" class="text-grey4 font-semibold"
          >Upload a PDF:</label
        >
        <input
          required
          type="file"
          id="pdfFile"
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-blue2 focus:ring-2 caret-blue2"
          accept="application/pdf"
          @change="handleFileChange"
        />
      </div>

      <div>
        <div class="flex justify-center">
          <button
            @click.prevent="openModal"
            class="bg-blue5 text-white py-2 rounded-lg font-semibold w-full sm:py-3 sm:text-lg"
          >
            Preview Invoice
          </button>
        </div>
      </div>
      <!-- Preview Invoice -->
      <div v-if="isModalOpen" class="absolute w-screen bg-white z-50 inset-0">
        <div class="flex justify-center items-center">
          <div
            class="w-11/12 max-w-2xl h-screen p-6 flex flex-col gap-5 justify-center"
            @click.stop
          >
            <h2 class="text-grey4 font-bold text-4xl">Invoice Preview</h2>
            <p class="text-grey-4">Invoice Number: {{ invoiceNumber }}</p>
            <p class="text-grey-4">Issue Name: {{ issueName }}</p>
            <p class="text-grey-4">VAT Number: {{ vatNumber }}</p>
            <p class="text-grey-4">Country: {{ country }}</p>
            <p class="text-grey-4">
              Invoice Date: {{ formatDate(invoiceDate) }}
            </p>
            <p class="text-grey-4">
              Invoice Amount: {{ formattedTotalAmountPreview }} {{ currency }}
            </p>

            <p class="text-grey-4">
              Payment due date: {{ formatDate(paymentDueDate) }}
            </p>
            <p class="text-grey-4">Invoice Status: {{ invoicePending }}</p>
            <p class="text-grey-4">Invoice file: {{ selectedPDF.name }}</p>

            <div class="flex gap-2 justify-between">
              <div class="flex justify-center w-full">
                <button
                  @click="closeModal"
                  class="bg-red2 text-white py-2 rounded-lg font-semibold w-full sm:py-3 sm:text-lg cursor-pointer"
                >
                  Edit Invoice
                </button>
              </div>
              <div class="flex justify-center w-full">
                <button
                  @click.prevent="submitForm"
                  type="submit"
                  class="bg-blue5 text-white py-2 rounded-lg font-semibold w-full sm:py-3 sm:text-lg cursor-pointer"
                >
                  Create Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import router from '../router';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseConfig } from '../utils/firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const invoiceNumber = ref(null);
const currency = ref(null);
const vatNumber = ref(null);
const country = ref(null);
const issueName = ref(null);
const invoiceDate = ref(null);
const paymentDueDate = ref(null);
const invoicePending = ref(null);
const totalAmount = ref(null);
const pdfFile = ref(null);
const today = ref(getCurrentDate());
const selectedPDF = ref(null);
const editInvoice = ref(false);
const isModalOpen = ref(false);

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const formatDate = date => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
};

const formattedTotalAmountPreview = computed(() => {
  return totalAmount.value.toFixed(2);
});

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    selectedPDF.value = file;
    console.log(`Selected file: ${file.name}`);
  }
}

const openModal = () => {
  if (
    currency.value &&
    vatNumber.value &&
    country.value &&
    issueName.value &&
    invoiceDate.value &&
    paymentDueDate.value &&
    invoicePending.value &&
    totalAmount.value
  ) {
    isModalOpen.value = true;
  }
};

const closeModal = () => {
  isModalOpen.value = false;
};

const submitForm = async () => {
  const invoiceData = {
    invoiceNumber: invoiceNumber.value,
    currency: currency.value,
    vatNumber: vatNumber.value,
    country: country.value,
    issueName: issueName.value,
    invoiceDate: invoiceDate.value,
    paymentDueDate: paymentDueDate.value,
    invoicePending: invoicePending.value,
    totalAmount: totalAmount.value,
    pdfFile: pdfFile.value,
  };

  try {
    const invoicesCollectionRef = collection(db, 'invoices');
    await addDoc(invoicesCollectionRef, invoiceData);
    console.log('Invoice added successfully');
    router.push('/invoicesboard');
  } catch (error) {
    console.error('Error adding invoice:', error);
  }
};
</script>

<style scoped></style>
