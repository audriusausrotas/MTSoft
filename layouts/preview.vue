<script setup lang="ts"></script>

<template>
  <TopBar class="print:hidden" />
  <div class="flex flex-col items-center gap-8 px-12 print:px-0 py-10 m-auto sm:items-start sm:flex-row max-w-custom ">
    <Navigation class="print:hidden" />
    <div
      class="w-full px-8 py-12 print:px:0 print:py-0 border print:border-none flex flex-col gap-8 print:rounded-none rounded-3xl">
      <slot />
    </div>
  </div>
</template>
<style scoped></style>
