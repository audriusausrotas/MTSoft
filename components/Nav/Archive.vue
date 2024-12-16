<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div
    class="flex w-full text-center border border-dark-light rounded-lg overflow-hidden divide-x divide-dark-light"
  >
    <NuxtLink
      to="/archyvas/archyvas"
      class="flex-1 p-2 border-dark-light hover:cursor-pointer min-w-28 hover:bg-red-600 hover:text-white"
      :class="
        route.path === '/archyvas/archyvas' ? 'bg-red-full text-white' : ''
      "
    >
      Archyvas
    </NuxtLink>

    <NuxtLink
      to="/archyvas/nepasitvirtine"
      class="flex-1 p-2 border-dark-light hover:cursor-pointer min-w-28 hover:bg-red-full hover:text-white"
      :class="
        route.path === '/archyvas/nepasitvirtine'
          ? 'bg-red-full text-white'
          : ''
      "
    >
      Nepasitvirtinę
    </NuxtLink>

    <NuxtLink
      to="/archyvas/istrinti"
      class="flex-1 p-2 border-dark-light hover:cursor-pointer min-w-28 hover:bg-red-full hover:text-white"
      :class="
        route.path === '/archyvas/istrinti' ? 'bg-red-full text-white' : ''
      "
    >
      Ištrinti
    </NuxtLink>

    <NuxtLink
      to="/archyvas/atsargines_kopijos"
      class="flex-1 p-2 border-dark-light hover:cursor-pointer min-w-28 hover:bg-red-full hover:text-white"
      :class="
        route.path === '/archyvas/atsargines_kopijos'
          ? 'bg-red-full text-white'
          : ''
      "
    >
      Atsarginės kopijos
    </NuxtLink>
  </div>
</template>
<style scoped></style>
