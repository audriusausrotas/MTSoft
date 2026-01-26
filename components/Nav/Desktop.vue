<script setup lang="ts">
const props = defineProps(["currentPath", "currentLinks", "adminLinks", "optionLinks"]);
const optionsOpen = ref<boolean>(false);
const adminOpen = ref<boolean>(false);
</script>

<template>
  <div class="gap-1 sm:justify-center flex-wrap flex-1 hidden sm:flex">
    <div v-for="link in props.currentLinks" :key="link.name">
      <NuxtLink
        :to="link.link"
        class="sm:flex gap-2 py-2 rounded-md w-36 justify-center hover:bg-red-full hover:text-white relative"
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
      v-if="props.optionLinks"
      @mouseenter="optionsOpen = true"
      @mouseleave="optionsOpen = false"
      class="md:flex gap-2 px-4 py-2 rounded-md w-40 justify-center hover:bg-red-full hover:text-white relative hover:cursor-pointer"
      :class="props.currentPath === 'Kita' ? 'bg-red-full text-white' : ''"
    >
      <p>Kita</p>

      <div
        v-if="optionsOpen"
        class="absolute top-10 left-0 w-40 z-50 bg-white shadow-lg rounded-md border border-dark-light"
      >
        <NuxtLink
          v-for="link in props.optionLinks"
          :key="link.name"
          :to="link.link"
          class="md:flex gap-2 px-4 py-2 rounded-md w-40 justify-center hover:bg-red-full hover:text-white hidden relative"
          :class="props.currentPath === link.name ? 'bg-red-full text-white' : 'text-black'"
          >{{ link.name }}</NuxtLink
        >
      </div>
    </div>
    <div
      v-if="props.adminLinks"
      @mouseenter="adminOpen = true"
      @mouseleave="adminOpen = false"
      class="md:flex gap-2 px-4 py-2 rounded-md w-40 justify-center hover:bg-red-full hover:text-white relative hover:cursor-pointer"
      :class="props.currentPath === 'Admin' ? 'bg-red-full text-white' : ''"
    >
      <p>Admin</p>

      <div
        v-if="adminOpen"
        class="absolute top-10 left-0 w-40 z-50 bg-white shadow-lg rounded-md border border-dark-light"
      >
        <NuxtLink
          v-for="link in props.adminLinks"
          :key="link.name"
          :to="link.link"
          class="md:flex gap-2 px-4 py-2 rounded-md w-40 justify-center hover:bg-red-full hover:text-white hidden relative"
          :class="props.currentPath === link.name ? 'bg-red-full text-white' : 'text-black'"
          >{{ link.name }}</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
