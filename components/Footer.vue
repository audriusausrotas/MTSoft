<script setup lang="ts"></script>

<template>
  <div class="flex bg-dark-full h-48 items-center text-white">
    <div
      class="w-[1200px] m-auto flex justify-between items-center text-center"
    >
      <div class="flex flex-col items-center">
        <NuxtImg
          src="/images/logoLight.png"
          alt="Moderni Tvora logotipas"
          width="100"
          height="60"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        />
        <p>©2024. Visos teisės saugomos.</p>
      </div>
      <div class="flex flex-col">
        <p>Įmonės kodas: 305174431</p>
        <p>PVM kodas: LT100013165913</p>
      </div>
      <div class="flex flex-col">
        <p>Bankas: Swedbank AB</p>
        <p>Banko sąskaita: LT247300010158952845</p>
      </div>
      <div class="flex flex-col">
        <a href="tel:++37066347011">+370 663 47011</a>
        <a href="mailto:info@modernitvora.lt">info@modernitvora.lt</a>
      </div>
      <div class="flex flex-col">
        <p>Mes įsikūrę: Kauno g. 31,</p>
        <p>Marijampolė, LT-68178, Lietuva</p>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
