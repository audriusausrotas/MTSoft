<script setup lang="ts">
definePageMeta({
  layout: "order",
});
</script>

<template>
  <div class="flex flex-col gap-8">
    <h2
      class="text-2xl font-semibold bg-red-full rounded-xl p-3 text-white text-center"
    >
      Eiga
    </h2>
    <ol class="list-decimal text-xl font-semibold pl-10 flex flex-col gap-2">
      <li>Preliminarus sąmatos skaičiavimas pagal jūsų matavimus</li>
      <li>
        Klientui pageidaujant atvykstame, išmatuojame, pakonsultuojame ir
        paskaičiuojame tikslesnę sąmatą
      </li>
      <li>
        Avanso įmokėjimas. Įmokėjus avansą (30% sumos), užsakymas yra
        patvirtinamas ir užsakomos medžiagos
      </li>
      <li>
        Stulpų betonavimas. Atvykus betonuoti, reikalinga elektra ir vanduo
        betonavimo darbams
      </li>
      <li>
        Pamatėlių dėjimas. Sustingus betonui (po 7-10 dienų) sudedami
        pamatėliai. Pamatėlių dėjimui reikalinga elektra
      </li>
      <li>Tvoros montavimas. Montavimui reikalinga elektra</li>
      <li>Vartų montavimas. Vartų montavimui reikalinga elektra</li>
      <li>Vartų užpildo montavimas. Sumontavus vartus, sudedame užpildą</li>
      <li>
        Sąmatos perskaičiavimas pagal faktą ir atsiskaitymas už atliktus darbus
      </li>
    </ol>
  </div>
</template>
<style scoped></style>
