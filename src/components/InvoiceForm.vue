<template>
  <div
    class="bg-white flex flex-col justify-center items-center my-16 relative"
  >
    <WizardForm :currentStep="currentStep" :numberOfSteps="numberOfSteps" />
    <form
      @submit.prevent="submitForm"
      class="flex flex-col py-6 w-11/12 mx-auto max-w-2xl bg-blue1/40 gap-5 p-2 rounded-md sm:p-6 shadow-md"
    >
      <fieldset>
        <legend class="sr-only">Invoice Form Inputs</legend>
        <!-- Step 1 -->
        <div v-if="currentStep === 1" class="flex flex-col gap-5">
          <div class="flex flex-col justify-center items-start">
            <label class="text-grey4 font-semibold" for="invoiceNumber"
              >Invoice Number</label
            >
            <input
              class="bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-blue2 focus:ring-2 caret-blue2"
              required
              type="text"
              id="invoiceNumber"
              v-model="invoiceNumber"
              maxlength="15"
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
              maxlength="15"
            />
          </div>
          <div class="flex flex-col justify-center items-start">
            <label class="text-grey4 font-semibold" for="currency"
              >Currency</label
            >

            <select required id="currency" v-model="currency">
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
          <div class="text-right">
            <button
              class="bg-blue5 w-16 rounded text-white py-1 border-2 hover:bg-white border-blue5 hover:text-blue5"
              @click="goToNextStep"
            >
              Next
            </button>
          </div>
        </div>
        <!-- Step 2 -->
        <div v-if="currentStep === 2" class="flex flex-col gap-5">
          <div class="flex flex-col justify-center items-start">
            <label class="text-grey4 font-semibold" for="country"
              >Select a country</label
            >

            <select required id="country" v-model="country">
              <option
                v-for="countryItem in countryCode"
                :key="countryItem.alpha2"
              >
                {{ countryItem.name }} [{{ countryItem.alpha2 }}]
              </option>
            </select>
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
              maxlength="11"
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

            <select required id="invoicePending" v-model="invoicePending">
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          <div class="flex justify-between">
            <button
              class="bg-red2/50 w-16 rounded text-white py-1 border-2 hover:bg-white border-red2/50 hover:text-red2"
              @click="goToPreviousStep"
            >
              Back
            </button>

            <button
              class="bg-blue5 w-16 rounded text-white py-1 border-2 hover:bg-white border-blue5 hover:text-blue5"
              @click="goToNextStep"
            >
              Next
            </button>
          </div>
        </div>

        <!-- Step 3 -->
        <div v-if="currentStep === 3" class="flex flex-col gap-5">
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
          <button
            class="bg-red2/50 w-16 rounded text-white py-1 border-2 hover:bg-white border-red2/50 hover:text-red2"
            @click="goToPreviousStep"
          >
            Back
          </button>
          <div class="flex justify-center mt-4">
            <button
              @click.prevent="openModal"
              class="bg-blue5 text-white py-2 rounded-lg font-semibold w-full sm:py-3 sm:text-lg hover:bg-gradient-to-r hover:from-blue1 hover:to-blue5"
            >
              Preview Invoice
            </button>
          </div>
        </div>

        <!-- Preview Invoice -->
        <div v-if="isModalOpen" class="absolute w-screen bg-white z-50 inset-0">
          <div class="flex justify-center items-center">
            <div
              class="w-11/12 max-w-2xl flex flex-col gap-5 bg-white justify-center shadow-lg shadow-grey4"
            >
              <div class="flex gap-3 md:gap-5 items-center mt-20">
                <div class="bg-blue2 w-[100%] h-[26px]"></div>
                <h2
                  class="text-grey4 font-semibold md:font-bold text-xl md:text-3xl uppercase whitespace-nowrap"
                >
                  <!--Invoice Preview -->
                </h2>
                <div class="bg-blue2 w-[10%] max-w-[44px] h-[26px]"></div>
              </div>
              <div class="px-6 flex flex-col gap-10">
                <header class="flex flex-col gap-2">
                  <p class="text-grey-4 text-xl font-semibold">
                    Invoice issue by:
                  </p>
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
                    {{ formattedTotalAmountPreview }}
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
                      @click="closeModal"
                      class="bg-red2 border-2 text-white py-2 rounded-lg font-semibold w-full sm:py-3 sm:text-lg hover:bg-white hover:text-red4 hover:border-red4 hover:border-2"
                    >
                      Edit Invoice
                    </button>
                  </div>
                  <div class="flex justify-center w-full">
                    <button
                      @click.prevent="submitForm"
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
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { countryCode } from '../utils/countryISO';
import router from '../router';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseConfig } from '../utils/firebaseConfig';
import { getAuth } from 'firebase/auth';
import WizardForm from './WizardForm.vue';

//Conection to FireBase db
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth();
const user = auth.currentUser; //to get my login user data from FireBase

//This is all the data from the form that I want to send to FireBase. As a default is null because I
// dont want anything to appear in any input
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
const selectedPDF = ref(null);
//
const currentStep = ref(1); //default step starts with 1
const numberOfSteps = 3; //total of steps in the wizard
const today = ref(getCurrentDate());
const isModalOpen = ref(false);

// Function to get the current date in both calendars
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const formatDate = date => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
};

const formattedTotalAmountPreview = computed(() => {
  return totalAmount.value.toFixed(2);
});

// function to upload the file from local machine
function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    selectedPDF.value = file;
  }
}

// the preview modal will open just if these values are fill up
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

// function to send the data to FireBase db
const submitForm = async () => {
  const invoiceData = {
    invoiceNumber: invoiceNumber.value,
    currency: currency.value,
    vatNumber: vatNumber.value,
    country: country.value,
    issueName: issueName.value,
    invoiceDate: formatDate(invoiceDate.value),
    paymentDueDate: formatDate(paymentDueDate.value),
    invoicePending: invoicePending.value,
    totalAmount: totalAmount.value.toFixed(2),
    pdfFile: pdfFile.value,
    userId: user.uid, // extracting the currentUser id from firebase db and sending it with the form as a data
  };
  try {
    const invoicesCollectionRef = collection(db, 'invoices');
    await addDoc(invoicesCollectionRef, invoiceData);
    router.push('/invoicesboard');
  } catch (error) {
    console.error('Error adding invoice:', error);
  }
};

function goToNextStep() {
  if (currentStep.value < numberOfSteps) {
    currentStep.value++;
  }
}

function goToPreviousStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}
</script>

<style scoped></style>
