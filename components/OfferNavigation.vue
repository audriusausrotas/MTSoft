<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="py-4 shadow-bottom print:hidden">
    <div class="flex lg:justify-between flex-wrap justify-center max-w-[1400px] m-auto">
      <NuxtLink to="https://www.modernitvora.lt">
        <NuxtImg
          src="/images/logo.png"
          alt="Moderni Tvora logotipas"
          width="86"
          height="48"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        />
      </NuxtLink>
      <div class="border border-red-full w-full md:hidden"></div>
      <div class="flex justify-center flex-wrap">
        <BaseOrderLink name="pasiūlymas" :id="route.params.id" />
        <BaseOrderLink name="tvoros informacija" :id="route.params.id + '/tvoros_informacija'" />
        <BaseOrderLink name="Bendra informacija" :id="route.params.id + '/bendra_informacija'" />

        <NuxtLink
          class="hover:text-white py-3 w-48 rounded-lg capitalize text-center hover:bg-red-full hover:cursor-pointer font-medium"
          to="https://www.modernitvora.lt/lt/about-us"
          target="_blank"
        >
          Apie Mus
        </NuxtLink>

        <BaseOrderLink name="privatumo politika" :id="route.params.id + '/privatumas'" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
