<template>
  <div
    @click="checkClick"
    ref="invoiceWrap"
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
          id="clientName"
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
        <label class="text-[#3B3738] font-semibold" for="clientCity"
          >Total Amount</label
        >
        <input
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-[#2275BB] focus:ring-2 caret-[#2275BB]"
          required
          type="text"
          id="TotalAmount"
          v-model="TotalAmount"
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
        <label class="text-[#3B3738] font-semibold" for="DateIssue"
          >Date Issue</label
        >
        <input
          disabled
          type="text"
          id="DateIssue"
          v-model="DateIssue"
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-[#2275BB] focus:ring-2 caret-[#2275BB]"
        />
      </div>
      <div class="flex flex-col justify-center items-start">
        <label class="text-[#3B3738] font-semibold" for="dueDate"
          >Due Date:</label
        >
        <input
          disabled
          type="text"
          id="dueDate"
          v-model="dueDate"
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-[#2275BB] focus:ring-2 caret-[#2275BB]"
        />
      </div>

      <div class="flex flex-col justify-center items-start">
        <label class="text-[#3B3738] font-semibold" for="pdfFile"
          >PDF File</label
        >
        <input
          disabled
          type="text"
          id="pdfFile"
          v-model="pdfFile"
          class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-[#2275BB] focus:ring-2 caret-[#2275BB]"
        />
      </div>

      <div>
        <div class="flex justify-center">
          <button
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

const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
const invoiceNumber = ref(null);
const currency = ref(null);
const vatNumber = ref(null);
const loading = ref(null);
const country = ref(null);
const issueName = ref(null);
const invoiceDateUnix = ref(null);
const invoiceDate = ref(null);
const paymentDueDateUnix = ref(null);
const paymentDueDate = ref(null);
const invoicePending = ref(null);
const invoiceTotal = ref(0);
const pdfFile = ref(null);
</script>

<style scoped></style>
