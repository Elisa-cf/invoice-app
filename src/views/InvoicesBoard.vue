<template>
  <header class="mt-6 w-11/12 mx-auto max-w-4xl">
    <div class="flex flex-col">
      <h1 class="text-[#3B3738] font-bold text-4xl">Invoices</h1>
      <span class="text-[#3B3738] text-base">There are 1 total invoices</span>
    </div>
    <div class="flex justify-between items-center mt-4">
      <div
        @click="toggleFilterMenu"
        class="filter flex text-[#3B3738] font-bold gap-1 items-center relative"
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
          class="bg-[#e9e9e9] rounded-md top-6 absolute right-0 p-2 w-[135px] font-normal text-black"
        >
          <li @click="filteredInvoices">Draft</li>
          <li @click="filteredInvoices">Pending</li>
          <li @click="filteredInvoices">Paid</li>
          <li @click="filteredInvoices">Clear Filter</li>
        </ul>
      </div>
      <div>
        <RouterLink to="/"
          ><button
            class="flex items-center gap-1 bg-[#194680] p-2 rounded text-center text-white font-semibold"
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

<script>
export default {
  data() {
    return {
      filterMenu: false,
    };
  },
  methods: {
    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },
  },
};
</script>

<style lang="scss" scoped></style>
