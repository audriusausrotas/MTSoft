<script setup lang="ts"></script>

<template>
  <OffersBoxWrap>
    <div class="flex gap-8 items-center justify-evenly flex-wrap text-xl">
      <NuxtImg
        src="/images/logo.png"
        alt="Rombo tipo tvora"
        decoding="auto"
        loading="lazy"
        :ismap="true"
        width="150"
        height="75"
      />

      <a
        class="bg-red-full text-white py-4 rounded-lg w-72 text-center"
        href="mailto:audrius@modernitvora.lt"
      >
        audrius@modernitvora.lt
      </a>
      <a class="bg-red-full text-white py-4 rounded-lg w-72 text-center" href="tel:+37067517745"
        >+37067517745</a
      >
      <div class="bg-red-full text-white py-4 rounded-lg w-72 text-center">
        Kauno g. 31, Marijampolė
      </div>
    </div>
    <div class="text-center">
      Moderni tvora - viena didžiausių tvorų gamintoju Lietuvoje. Per 9 gyvavimo metus, įmonė padare
      kažką labai naglo ir bla bla bla bla bla. Aš nesugalvoju. Susisiekite nurodytais kontaktais.
    </div>
  </OffersBoxWrap>
</template>

<style scoped></style>
