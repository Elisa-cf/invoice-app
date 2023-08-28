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
</template>

<script setup>
import { ref, computed } from 'vue';

const filterMenu = ref(false);
const filteredInvoice = ref(null);

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

const filteredData = computed(() => {
  return invoiceData.filter(invoice => {
    if (filteredInvoice.value === 'Pending') {
      return invoice.invoicePending === true;
    }
    if (filteredInvoice.value === 'Paid') {
      return invoice.invoicePaid === true;
    }
    return true;
  });
});
</script>

<style scoped></style>
