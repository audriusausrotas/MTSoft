<script setup lang="ts">
import { navigationLinks, optionLinks, gateLinks } from "~/data/initialValues";

const props = defineProps(["currentPath"]);

const optionsOpen = ref<boolean>(false);
const gateOpen = ref<boolean>(false);
</script>

<template>
  <div class="gap-4 md:justify-center flex-wrap flex-1 hidden md:flex font-semibold">
    <div
      v-for="link in navigationLinks"
      :key="link.name"
      @mouseenter="
        link.name === 'Vartai'
          ? (gateOpen = true)
          : link.name === 'Nustatymai'
          ? (optionsOpen = true)
          : ''
      "
      @mouseleave="
        link.name === 'Vartai'
          ? (gateOpen = false)
          : link.name === 'Nustatymai'
          ? (optionsOpen = false)
          : ''
      "
      class=""
    >
      <NuxtLink
        :to="link.link"
        class="md:flex gap-2 px-4 py-2 rounded-md w-40 justify-center hover:bg-red-full hover:text-white relative"
        :class="props.currentPath === link.name ? 'bg-red-full text-white' : ''"
      >
        <NuxtImg
          v-if="link.iconPath !== ''"
          :src="link.iconPath"
          width="20"
          height="20"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        />
        {{ link.name }}

        <div
          v-if="link.name === 'Vartai' && gateOpen"
          class="absolute top-10 left-0 w-40 z-40 bg-white shadow-lg rounded-md border border-dark-light"
        >
          <NuxtLink
            v-for="lnk in gateLinks"
            :key="lnk.name"
            :to="lnk.link"
            class="md:flex gap-2 px-4 py-2 rounded-md w-40 justify-center hover:bg-red-full hover:text-white hidden relative"
            :class="props.currentPath === lnk.name ? 'bg-red-full text-white' : 'text-black'"
            >{{ lnk.name }}</NuxtLink
          >
        </div>

        <div
          v-if="link.name === 'Nustatymai' && optionsOpen"
          class="absolute top-10 left-0 w-40 z-40 bg-white shadow-lg rounded-md border border-dark-light"
        >
          <NuxtLink
            v-for="lnk in optionLinks"
            :key="lnk.name"
            :to="lnk.link"
            class="md:flex gap-2 px-4 py-2 rounded-md w-40 justify-center hover:bg-red-full hover:text-white hidden relative"
            :class="props.currentPath === lnk.name ? 'bg-red-full text-white' : 'text-black'"
            >{{ lnk.name }}</NuxtLink
          >
        </div>
      </NuxtLink>
    </div>
  </div>
  <div class="h-0 border-0 sm:h-12 sm:border hidden md:block"></div>
</template>

<style scoped></style>
