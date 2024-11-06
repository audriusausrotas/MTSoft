<script setup lang="ts">
const selected = ref<string>("bendri");
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <div
      class="flex text-center border border-dark-light rounded-lg overflow-hidden divide-x divide-dark-light"
    >
      <div
        @click="selected = 'bendri'"
        class="flex-1 p-2 border-dark-light hover:cursor-pointer hover:bg-red-600 hover:text-white"
        :class="selected === 'bendri' ? 'bg-red-full text-white' : ''"
      >
        Bendri nustatymai
      </div>
      <div
        @click="selected = 'tvoros'"
        class="flex-1 p-2 border-dark-light hover:cursor-pointer hover:bg-red-full hover:text-white"
        :class="selected === 'tvoros' ? 'bg-red-full text-white' : ''"
      >
        Tvorų nustatymai
      </div>
      <div
        @click="selected = 'vartotojai'"
        class="flex-1 p-2 border-dark-light hover:cursor-pointer hover:bg-red-full hover:text-white"
        :class="selected === 'vartotojai' ? 'bg-red-full text-white' : ''"
      >
        Vartotojų nustatymai
      </div>
      <div
        @click="selected = 'pasirinkimai'"
        class="flex-1 p-2 border-dark-light hover:cursor-pointer hover:bg-red-600 hover:text-white"
        :class="selected === 'pasirinkimai' ? 'bg-red-full text-white' : ''"
      >
        Pasirinkimo laukų nustatymai
      </div>
    </div>
    <SettingsGeneral v-if="selected === 'bendri'" />
    <SettingsFences v-else-if="selected === 'tvoros'" />
    <SettingsUsers v-else-if="selected === 'vartotojai'" />
    <SettingsSelect v-else-if="selected === 'pasirinkimai'" />
  </div>
</template>
<style scoped></style>
