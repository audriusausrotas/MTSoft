<script setup lang="ts"></script>

<template>
  <OffersBoxWrap class="bg-gray-600 text-white">
    <div class="flex flex-col gap-8 flex-wrap text-xl">
      <div class="flex gap-8">
        <NuxtImg
          src="/images/stipriausi.jpg"
          alt="Rombo tipo tvora"
          decoding="auto"
          loading="lazy"
          :ismap="true"
          class="object-contain w-auto h-60 rounded-md"
        />
        <div class="flex gap-2 flex-col m-auto">
          <a
            class="py-3 w-72 text-center border-b-[3px] hover:scale-110 border-red-600 hover:bg-red-600 hover:rounded-md transition-all"
            href="mailto:audrius@modernitvora.lt"
          >
            audrius@modernitvora.lt
          </a>
          <a
            class="py-3 w-72 text-center border-b-[3px] hover:scale-110 border-red-600 hover:bg-red-600 hover:rounded-md transition-all"
            href="tel:+37067517745"
            >+370 675 17745</a
          >

          <NuxtLink
            class="py-3 w-72 text-center border-b-[3px] hover:scale-110 border-red-600 hover:bg-red-600 hover:rounded-md transition-all"
            to="https://maps.app.goo.gl/YThusc8NVmJxAMAS9"
            target="_blank"
            >Kauno g. 31, Marijampolė</NuxtLink
          >

          <NuxtLink
            class="py-3 w-72 text-center border-b-[3px] hover:scale-110 border-red-600 hover:bg-red-600 hover:rounded-md transition-all"
            to="https://modernitvora.lt/lt/about-us"
            target="_blank"
            >Apie mus</NuxtLink
          >
        </div>
      </div>
      <div class="text-justify">
        „Moderni Tvora“ – šiuolaikiškus tvorų sprendimus siūlanti įmonė. Ilgametę patirtį turinti
        profesionalų komanda specializuojasi skardinių tvorų gamyboje. Didelį dėmesį skiria gaminių
        kokybei bei valdymo procesams, kurie užtikrina aukščiausią gaminių kokybę ir greitą bei
        skalndų užsakymų įgyvendinimą.
      </div>
    </div>
  </OffersBoxWrap>
</template>

<style scoped></style>
