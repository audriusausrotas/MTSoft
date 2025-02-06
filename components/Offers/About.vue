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
            >+37067517745</a
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
        Moderni tvora - viena didžiausių tvorų gamintoju Lietuvoje. Per 9
        gyvavimo metus, įmonė padare kažką labai naglo ir bla bla bla bla bla.
        Aš nesugalvoju. Susisiekite nurodytais kontaktais.
      </div>
    </div>
  </OffersBoxWrap>
</template>

<style scoped></style>
