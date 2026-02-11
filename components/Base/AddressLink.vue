<script setup lang="ts">
const props = defineProps(["name", "width", "label"]);

const googleLink = computed(() => {
  return `comgooglemaps://?q=${encodeURIComponent(props.name)}`;
});

const wazeLink = computed(() => {
  return `waze://?q=${encodeURIComponent(props.name)}&navigate=yes`;
});

const googleWebLink = computed(() => {
  return `https://www.google.com/maps/search/?api=1&query=${props.name}`;
});

const wazeWebLink = computed(() => {
  return `https://www.waze.com/ul?q=${encodeURIComponent(props.name)}&navigate=yes`;
});

const uniqueId = computed(() => {
  return props.label || `address-link-${Math.random().toString(36).substr(2, 9)}`;
});

const handleGoogleClick = (event: MouseEvent) => {
  event.preventDefault();
  window.location.href = googleLink.value;

  setTimeout(() => {
    window.open(googleWebLink.value, "_blank");
  }, 2000);
};

const handleWazeClick = (event: MouseEvent) => {
  event.preventDefault();
  window.location.href = wazeLink.value;

  setTimeout(() => {
    window.open(wazeWebLink.value, "_blank");
  }, 2000);
};
</script>

<template>
  <div
    class="flex flex-col"
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
        :id="uniqueId"
        class="flex-1 flex items-center justify-center h-10 px-2"
        @click="handleGoogleClick"
      >
        {{ props.name }}
      </a>
      <a :href="wazeLink" @click="handleWazeClick">
        <NuxtImg
          src="/icons/waze.svg"
          alt="Waze ikona"
          width="40"
          height="40"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        />
      </a>
    </div>
  </div>
</template>
<style scoped></style>
