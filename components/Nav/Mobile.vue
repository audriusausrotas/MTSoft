<script setup lang="ts">
import { navigationLinks } from "~/data/initialValues";

const props = defineProps(["currentPath"]);

const isMenuOpen = ref<boolean>(false);
</script>

<template>
  <div class="flex md:hidden" @click="isMenuOpen = !isMenuOpen">
    <NuxtImg
      src="/icons/hamburger.svg"
      width="24"
      height="24"
      decoding="auto"
      loading="lazy"
      :ismap="true"
    />
  </div>
  <div v-if="isMenuOpen" class="flex md:hidden border-t p-4 top-14 left-0 w-full">
    <div class="flex-1">
      <NuxtLink
        v-for="link in navigationLinks"
        :key="link.name"
        :to="link.link"
        class="flex gap-2 px-4 py-2 rounded-md w-40 hover:bg-red-full hover:text-white"
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
  </div>
</template>

<style scoped></style>
