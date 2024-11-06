<script setup lang="ts">
import { navigationLinks, optionLinks } from "~/data/initialValues";

const props = defineProps(["currentPath"]);

const optionsOpen = ref<boolean>(false);
</script>

<template>
  <div class="gap-4 md:justify-center flex-wrap flex-1 hidden md:flex">
    <div v-for="link in navigationLinks" :key="link.name">
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
      </NuxtLink>
    </div>
    <div
      @mouseenter="optionsOpen = true"
      @mouseleave="optionsOpen = false"
      class="md:flex gap-2 px-4 py-2 rounded-md w-40 justify-center hover:bg-red-full hover:text-white relative hover:cursor-pointer"
    >
      <p>Admin</p>
      <div
        v-if="optionsOpen"
        class="absolute top-10 left-0 w-40 z-50 bg-white shadow-lg rounded-md border border-dark-light"
      >
        <NuxtLink
          v-for="link in optionLinks"
          :key="link.name"
          :to="link.link"
          class="md:flex gap-2 px-4 py-2 rounded-md w-40 justify-center hover:bg-red-full hover:text-white hidden relative"
          :class="
            props.currentPath === link.name
              ? 'bg-red-full text-white'
              : 'text-black'
          "
          >{{ link.name }}</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
