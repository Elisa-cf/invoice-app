<template>
  <div
    @click="checkClick"
    class="bg-white h-screen w-screen flex justify-center items-center"
  >
    <form
      @submit.prevent="submitForm"
      class="flex flex-col py-6 w-11/12 mx-auto max-w-2xl bg-[#2AA9E1]/40 gap-5 p-2 rounded-md sm:p-6"
    >
      <div class="flex flex-col justify-center items-start">
        <label class="text-[#3B3738] font-semibold" for="clientEmail"
          >Invoice Number</label
        >
        <input
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-[#2275BB] focus:ring-2 caret-[#2275BB]"
          required
          type="text"
          id="invoiceNumber"
          v-model="invoiceNumber"
        />
      </div>
      <div class="flex flex-col justify-center items-start">
        <label for="issueName" class="text-[#3B3738] font-semibold"
          >Issue Name</label
        >
        <input
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-[#2275BB] focus:ring-2 caret-[#2275BB]"
          required
          type="text"
          id="issueName"
          v-model="issueName"
        />
      </div>
      <div class="flex flex-col justify-center items-start">
        <label class="text-[#3B3738] font-semibold" for="currency"
          >Currency</label
        >

        <select required type="text" id="currency" v-model="currency">
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      <div class="flex flex-col justify-center items-start">
        <label class="text-[#3B3738] font-semibold" for="totalAmount"
          >Total Amount</label
        >
        <input
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-[#2275BB] focus:ring-2 caret-[#2275BB]"
          required
          type="text"
          id="totalAmount"
          v-model="totalAmount"
        />
      </div>
      <div class="flex flex-col justify-center items-start">
        <label class="text-[#3B3738] font-semibold" for="clientCity"
          >Country</label
        >
        <input
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-[#2275BB] focus:ring-2 caret-[#2275BB]"
          required
          type="text"
          id="country"
          v-model="country"
        />
      </div>
      <div class="flex flex-col justify-center items-start">
        <label class="text-[#3B3738] font-semibold" for="VatNumber"
          >VAT Number</label
        >
        <input
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-[#2275BB] focus:ring-2 caret-[#2275BB]"
          required
          type="text"
          id="VatNumber"
          v-model="VatNumber"
        />
      </div>

      <div class="flex flex-col justify-center items-start">
        <label for="DateIssue" class="text-[#3B3738] font-semibold"
          >Date Issue</label
        >
        <input
          type="date"
          v-bind:max="today"
          id="DateIssue"
          v-model="DateIssue"
          required
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-[#2275BB] focus:ring-2 caret-[#2275BB]"
        />
      </div>
      <div class="flex flex-col justify-center items-start">
        <label for="dueDate" class="text-[#3B3738] font-semibold"
          >Due Date:</label
        >
        <input
          required
          type="date"
          id="dueDate"
          v-model="dueDate"
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-[#2275BB] focus:ring-2 caret-[#2275BB]"
          v-bind:min="today"
        />
      </div>

      <div class="flex flex-col justify-center items-start">
        <label class="text-[#3B3738] font-semibold" for="invoicePending"
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
        <label for="pdfFile" class="text-[#3B3738] font-semibold"
          >Upload a PDF:</label
        >
        <input
          required
          type="file"
          id="pdfFile"
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-[#2275BB] focus:ring-2 caret-[#2275BB]"
          accept="application/pdf"
          @change="handleFileChange"
        />
      </div>

      <div>
        <div class="flex justify-center">
          <button
            @click="publishInvoice"
            type="sumbit"
            class="bg-[#1E417A] text-white py-2 rounded-lg font-semibold w-full"
          >
            Create Invoice
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBSKXVi8bLWmDm36Pl1XebXesubHUluIFM',
  authDomain: 'bankable-a113d.firebaseapp.com',
  projectId: 'bankable-a113d',
  storageBucket: 'bankable-a113d.appspot.com',
  messagingSenderId: '460820204014',
  appId: '1:460820204014:web:facf89f3b64562cf0f66ff',
};

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
const totalAmount = ref(0);
const pdfFile = ref(null);
const today = ref(getCurrentDate());
const selectedPDF = ref(null);
const editInvoice = ref(false);

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    selectedPDF.value = file;
    console.log(`Selected file: ${file.name}`);
  }
}

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
  } catch (error) {
    console.error('Error adding invoice:', error);
  }
};
</script>

<style scoped></style>
