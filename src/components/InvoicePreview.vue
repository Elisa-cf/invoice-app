<template>
  <div class="absolute w-screen bg-white z-50 inset-0">
    <div class="flex justify-center items-center">
      <div
        class="w-11/12 max-w-2xl flex flex-col gap-5 bg-white justify-center shadow-lg shadow-grey4"
      >
        <div class="flex gap-3 md:gap-5 items-center mt-20">
          <div class="bg-blue2 w-[100%] h-[26px]"></div>
          <h2
            class="text-grey4 font-semibold md:font-bold text-xl md:text-3xl uppercase whitespace-nowrap"
          >
            Invoice preview
          </h2>

          <div class="bg-blue2 w-[10%] max-w-[44px] h-[26px]"></div>
        </div>
        <div class="px-6 flex flex-col gap-10">
          <header class="flex flex-col gap-2">
            <p class="text-grey-4 text-xl font-semibold">Invoice issue by:</p>
            <div class="flex justify-between items-start">
              <div>
                <p>{{ issueName }}</p>
                <p class="text-grey-4">{{ country }}</p>
                <p class="text-grey-4">VAT Number: {{ vatNumber }}</p>
              </div>
              <div class="flex justify-between flex-col">
                <div class="text-grey-4 flex justify-between gap-4">
                  <p class="font-bold">Invoice #</p>
                  <p>{{ invoiceNumber }}</p>
                </div>

                <div class="text-grey-4 flex justify-between gap-4">
                  <p class="font-bold">Issue Date:</p>
                  <p>{{ formatDate(invoiceDate) }}</p>
                </div>
              </div>
            </div>
          </header>
          <div class="border border-grey4 flex gap-5 flex-col">
            <div class="bg-grey4 text-white p-2">
              <p class="text-grey-4">
                <span class="font-semibold">Invoice file imported:</span>
                {{ selectedPDF.name }}
              </p>
            </div>

            <p class="text-grey-4 p-2">
              <span class="font-semibold">Invoice Amount:</span>
              {{ totalAmount }}
              {{ currency }}
            </p>
            <p class="text-grey-4 p-2">
              <span class="font-semibold">Payment due date:</span>
              {{ formatDate(paymentDueDate) }}
            </p>
            <p class="text-grey-4 p-2 mb-10">
              <span class="font-semibold">Payment Status:</span>
              {{ invoicePending }}
            </p>
          </div>
          <div class="flex flex-col">
            <p class="font-bold text-red4">Warning!</p>
            <p class="italic">Invoices are not editable after sumbit</p>
            <p class="font-semibold">Submit with care</p>
          </div>
        </div>
        <div class="p-6 flex flex-col gap-5">
          <div class="flex gap-2 justify-between">
            <div class="flex justify-center w-full">
              <button
                @click="$emit('close')"
                class="bg-red2 border-2 text-white py-2 rounded-lg font-semibold w-full sm:py-3 sm:text-lg hover:bg-white hover:text-red4 hover:border-red4 hover:border-2"
              >
                Edit Invoice
              </button>
            </div>
            <div class="flex justify-center w-full">
              <button
                @click="$emit('submit')"
                type="submit"
                class="bg-blue2 border-2 text-white py-2 rounded-lg font-semibold w-full sm:py-3 sm:text-lg hover:bg-white hover:text-blue4 hover:border-blue4 hover:border-2"
              >
                Submit Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

//emit is needed to pass the close and submit click event to the parent (InvoiceForm)
const emit = defineEmits(['close', 'submit']);

//get the data from all the inputs of the form via props
const props = defineProps({
  invoiceNumber: {
    type: String,
    default: '',
  },
  currency: {
    type: String,
    default: '',
  },
  vatNumber: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
  issueName: {
    type: String,
    default: '',
  },
  invoiceDate: {
    type: String,
    default: '',
  },
  paymentDueDate: {
    type: String,
    default: '',
  },
  invoicePending: {
    type: String,
    default: '',
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  selectedPDF: Object,
  isOpen: {
    type: Boolean,
    default: false,
  },
  formatDate: Function,
});

function close() {
  emit('close');
}

function submit() {
  emit('submit');
}
</script>

<style scoped></style>
