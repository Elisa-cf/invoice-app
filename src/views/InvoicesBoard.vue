<template>
  <header class="mt-6 w-11/12 mx-auto">
    <div class="flex flex-col">
      <h1 class="text-[#3B3738] font-bold text-4xl">Invoices</h1>
      <span class="text-[#3B3738] text-base">There are 1 total invoices</span>
    </div>
    <div class="flex justify-between items-center mt-4">
      <div
        @click="toggleFilterMenu"
        class="filter flex text-[#3B3738] font-bold gap-1 items-center"
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
        <ul v-show="filterMenu" class="filter-menu">
          <li @click="filteredInvoices">Draft</li>
          <li @click="filteredInvoices">Pending</li>
          <li @click="filteredInvoices">Paid</li>
          <li @click="filteredInvoices">Clear Filter</li>
        </ul>
      </div>
      <div>
        <RouterLink to="/"
          ><button
            class="flex items-center gap-1 bg-[#194680] p-2 rounded text-center text-white font-semibol"
          >
            <span class="bg-white rounded-full p-1">
              <img
                src="@/assets/images/plus-icon.svg"
                alt="plus icon"
                class="w-3" /></span
            >New Invoices
          </button></RouterLink
        >
      </div>
    </div>
  </header>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
