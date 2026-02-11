<script setup lang="ts">
const props = defineProps(["name", "width", "label"]);

const googleLink = computed(() => {
  return `https://www.google.com/maps/search/?api=1&query=${props.name}`;
});

const wazeLink = computed(() => {
  return `waze://?q=${encodeURIComponent(props.name)}&navigate=yes`;
});

const uniqueId = computed(
  () =>
    `address-link-${props.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "")}`,
);
</script>

<template>
  <div
    class="flex flex-col min-w-60"
    :class="[props.width ? props.width : 'w-60', props.label ? 'h-16' : 'h-10']"
  >
    <label v-if="label" :for="uniqueId" class="pl-2 pb-1 capitalize text-sm bg-inherit">{{
      label
    }}</label>

    <div
      class="flex border rounded-lg shadow-sm border-dark-light overflow-hidden bg-gray-ultra-light"
    >
      <a
        :href="googleLink"
        target="_blank"
        :id="uniqueId"
        class="flex-1 flex items-center justify-center h-10 px-2"
      >
        {{ props.name }}
      </a>
      <a :href="wazeLink" class="block xl:hidden">
        <NuxtImg src="/icons/waze.svg" alt="Waze ikona" width="40" height="40" loading="lazy" />
      </a>
    </div>
  </div>
</template>
<style scoped></style>
