<template>
  <div
    class="bg-white flex flex-col justify-center items-center my-16 relative"
  >
    <h2 class="text-grey4 font-bold text-3xl items-start">
      Create a new invoice:
    </h2>

    <WizardForm :currentStep="currentStep" :numberOfSteps="numberOfSteps" />
    <form
      @submit.prevent="submitForm"
      class="flex flex-col py-6 w-11/12 mx-auto max-w-2xl bg-blue5 gap-5 p-2 rounded-md sm:p-6 shadow-md"
    >
      <fieldset>
        <legend class="sr-only">Invoice Form Inputs</legend>
        <!-- Step 1 -->
        <div v-if="currentStep === 1" class="flex flex-col gap-5">
          <div :class="containerField">
            <label :class="labelStyles" for="invoiceNumber"
              >Invoice Number</label
            >
            <input
              :class="inputStyles"
              required
              type="text"
              id="invoiceNumber"
              v-model="invoiceNumber"
              maxlength="15"
              @input="restrictToAlphanumeric('invoiceNumber')"
            />
          </div>
          <div :class="containerField">
            <label for="issueName" :class="labelStyles">Issue Name</label>
            <input
              :class="inputStyles"
              required
              type="text"
              id="issueName"
              v-model="issueName"
              maxlength="15"
              @input="restrictToAlphanumeric('issueName')"
            />
          </div>
          <div :class="containerField">
            <label :class="labelStyles" for="currency">Currency</label>

            <select required id="currency" v-model="currency">
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <div :class="containerField">
            <label :class="labelStyles" for="totalAmount">Total Amount</label>
            <input
              :class="inputStyles"
              required
              type="number"
              id="totalAmount"
              v-model="totalAmount"
            />
          </div>
          <div class="text-right">
            <button :class="nextBtn" @click="goToNextStep">Next</button>
          </div>
        </div>
        <!-- Step 2 -->
        <div v-if="currentStep === 2" class="flex flex-col gap-5">
          <div :class="containerField">
            <label :class="labelStyles" for="country">Select a country</label>

            <select required id="country" v-model="country">
              <option
                v-for="countryItem in countryCode"
                :key="countryItem.alpha2"
              >
                {{ countryItem.name }} [{{ countryItem.alpha2 }}]
              </option>
            </select>
          </div>
          <div :class="containerField">
            <label :class="labelStyles" for="vatNumber">VAT Number</label>
            <input
              :class="inputStyles"
              required
              type="text"
              id="vatNumber"
              v-model="vatNumber"
              @input="validateVatNumber"
            />
          </div>

          <div :class="containerField">
            <label for="invoiceDate" :class="labelStyles">Date Issue</label>
            <input
              type="date"
              v-bind:max="today"
              id="invoiceDate"
              v-model="invoiceDate"
              required
              :class="inputStyles"
            />
          </div>
          <div :class="containerField">
            <label for="paymentDueDate" :class="labelStyles">Due Date:</label>
            <input
              required
              type="date"
              id="paymentDueDate"
              v-model="paymentDueDate"
              :class="inputStyles"
              v-bind:min="today"
            />
          </div>

          <div :class="containerField">
            <label :class="labelStyles" for="invoicePending"
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

            <button :class="nextBtn" @click="goToNextStep">Next</button>
          </div>
        </div>

        <!-- Step 3 -->
        <div v-if="currentStep === 3" class="flex flex-col gap-5">
          <div :class="containerField">
            <label for="pdfFile" :class="labelStyles">Upload a PDF:</label>
            <input
              required
              type="file"
              id="pdfFile"
              :class="inputStyles"
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
              class="bg-blue1 text-white py-2 rounded-lg font-semibold w-full sm:py-3 sm:text-lg hover:bg-white hover:text-blue5"
            >
              Preview Invoice
            </button>
          </div>
        </div>

        <!-- Preview Invoice Modal -->
        <InvoicePreview
          v-if="isModalOpen"
          :invoiceNumber="invoiceNumber"
          :currency="currency"
          :vatNumber="vatNumber"
          :country="country"
          :issueName="issueName"
          :invoiceDate="invoiceDate"
          :paymentDueDate="paymentDueDate"
          :invoicePending="invoicePending"
          :totalAmount="totalAmount"
          :selectedPDF="selectedPDF"
          :isOpen="isModalOpen"
          :formatDate="formatDate"
          @close="closeModal"
          @submit="submitForm"
        />
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { countryCode } from '../utils/countryISO';
import router from '../router';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseConfig } from '../utils/firebaseConfig';
import { getAuth } from 'firebase/auth';
import WizardForm from './WizardForm.vue';
import InvoicePreview from './InvoicePreview.vue';

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
  } else alert('All fields are required');
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

//function to restricted  non numeric numbers and/or alphabetic characters
const restrictToAlphanumeric = field => {
  if (field === 'invoiceNumber') {
    invoiceNumber.value = invoiceNumber.value.replace(/[^a-zA-Z0-9]/g, '');
  } else if (field === 'issueName') {
    issueName.value = issueName.value.replace(/[^a-zA-Z0-9]/g, '');
  }
};

//formatting VAT number to be a valid one:
const vatPrefix = computed(() => {
  return country.value;
});

const keepJustCountryCode = computed(() => {
  return country.value.slice(-3, -1); //slice in order to take just the last 2 digits
});

const validateVatNumber = () => {
  if (!vatNumber.value.startsWith(keepJustCountryCode.value)) {
    vatNumber.value = keepJustCountryCode.value;
  } else {
    vatNumber.value =
      keepJustCountryCode.value +
      vatNumber.value.replace(/[^0-9]/g, '').substr(0, 9);
  }
};

watch(country, newCountry => {
  // Reset VAT number when country changes
  vatNumber.value = keepJustCountryCode.value;
});

//Tailwind CSS Classes in a constant
const inputStyles =
  'bg-white w-full rounded-md sm:p-2 p-1 focus:outline-none focus:ring-blue2 focus:ring-2 caret-blue2';
const labelStyles = 'text-white font-semibold';
const containerField = 'flex flex-col justify-center items-start';
const nextBtn =
  'bg-blue1 w-16 rounded text-white font-semibold py-1 hover:bg-white hover:text-blue5';
</script>

<style scoped></style>
