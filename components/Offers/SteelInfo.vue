<script setup lang="ts">
const props = defineProps(["hideEco", "blinds"]);
</script>

<template>
  <OffersBoxWrap>
    <div class="text-2xl font-bold text-center">Skardos informacija</div>
    <div
      class="sm:grid grid-cols-[1.2fr_1fr_1fr] border-2 border-black rounded-md hidden"
      :class="hideEco ? 'grid-cols-[1fr_1fr]' : 'grid-cols-[1.2fr_1fr_1fr]'"
    >
      <div class="px-4 py-1 border-b border-inherit border-r">
        Skardos tipas
      </div>
      <div class="px-4 py-1 border-b border-inherit border-r font-bold">
        Premium
      </div>
      <div v-if="!hideEco" class="px-4 py-1 border-b border-inherit font-bold">
        Eco
      </div>
      <div class="px-4 py-1 border-b border-inherit border-r">Gamintojas</div>
      <div class="px-4 py-1 border-b border-inherit border-r">
        Arcelor Ultramatt
      </div>
      <div v-if="!hideEco" class="px-4 py-1 border-b border-inherit">
        Ukraina
      </div>
      <div class="px-4 py-1 border-b border-inherit border-r">
        Gamintojo šalis
      </div>
      <div class="px-4 py-1 border-b border-inherit border-r">Belgija</div>
      <div v-if="!hideEco" class="px-4 py-1 border-b border-inherit">
        Ukraina
      </div>
      <div class="px-4 py-1 border-b border-inherit border-r">
        Techninė garantija
      </div>
      <div class="px-4 py-1 border-b border-inherit border-r">50 metų</div>
      <div v-if="!hideEco" class="px-4 py-1 border-b border-inherit">
        10 metų
      </div>
      <div class="px-4 py-1 border-b border-inherit border-r">
        Spalvos garantija
      </div>
      <div class="px-4 py-1 border-b border-inherit border-r">20 metų</div>
      <div v-if="!hideEco" class="px-4 py-1 border-b border-inherit">
        5 metai
      </div>
      <div class="px-4 py-1 border-b border-inherit border-r">
        Skardos storis
      </div>
      <div class="px-4 py-1 border-b border-inherit border-r">0.5 mm</div>
      <div v-if="!hideEco" class="px-4 py-1 border-b border-inherit">
        0.42 mm
      </div>
      <div class="px-4 py-1 border-b border-inherit border-r">
        Skardos identiško atspalvio garantas
      </div>
      <div class="px-4 py-1 border-b border-inherit border-r">Taip</div>
      <div v-if="!hideEco" class="px-4 py-1 border-b border-inherit">Ne</div>
      <div class="px-4 py-1 border-b border-inherit border-r">
        Rekomenduojamas elemento ilgis
      </div>
      <div class="px-4 py-1 border-b border-inherit border-r">
        {{ blinds ? "2000" : "2500" }} mm
      </div>
      <div v-if="!hideEco" class="px-4 py-1 border-b border-inherit">
        2000 mm
      </div>
      <div v-if="!blinds" class="px-4 py-1 border-b border-inherit border-r">
        Maksimalus elemento ilgis
      </div>
      <div v-if="!blinds" class="px-4 py-1 border-b border-inherit border-r">
        3000 mm
      </div>
      <div v-if="!hideEco" class="px-4 py-1 border-b border-inherit">
        2500 mm
      </div>
      <div class="px-4 py-1 border-b border-inherit border-r">
        Metalinės dangos masė (g/m2)
      </div>
      <div class="px-4 py-1 border-b border-inherit border-r">Zn 275</div>
      <div v-if="!hideEco" class="px-4 py-1 border-b border-inherit">
        Zn 100
      </div>
      <div class="px-4 py-1 border-r border-inherit">Padengimas</div>
      <div class="px-4 py-1 border-r border-inherit">min. 35 mikronai</div>
      <div v-if="!hideEco" class="px-4 py-1">25 mikronai</div>
    </div>

    <div class="sm:hidden grid-cols-2 border-2 border-black rounded-md grid">
      <div class="px-2 py-1 border-b border-inherit border-r">
        Skardos tipas
      </div>
      <div class="px-2 py-1 border-b border-inherit border-r font-bold">
        Premium
      </div>
      <div class="px-2 py-1 border-b border-inherit border-r">Gamintojas</div>
      <div class="px-2 py-1 border-b border-inherit border-r">
        Arcelor Ultramatt
      </div>
      <div class="px-2 py-1 border-b border-inherit border-r">
        Gamintojo šalis
      </div>
      <div class="px-2 py-1 border-b border-inherit border-r">Belgija</div>
      <div class="px-2 py-1 border-b border-inherit border-r">
        Techninė garantija
      </div>
      <div class="px-2 py-1 border-b border-inherit border-r">50 metų</div>
      <div class="px-2 py-1 border-b border-inherit border-r">
        Spalvos garantija
      </div>
      <div class="px-2 py-1 border-b border-inherit border-r">20 metų</div>
      <div class="px-2 py-1 border-b border-inherit border-r">
        Skardos storis
      </div>
      <div class="px-2 py-1 border-b border-inherit border-r">0.5 mm</div>
      <div class="px-2 py-1 border-b border-inherit border-r">
        Skardos identiško atspalvio garantas
      </div>
      <div class="px-2 py-1 border-b border-inherit border-r">Taip</div>
      <div class="px-2 py-1 border-b border-inherit border-r">
        Rekomenduojamas elemento ilgis
      </div>
      <div class="px-2 py-1 border-b border-inherit border-r">2500 mm</div>
      <div v-if="!blinds" class="px-2 py-1 border-b border-inherit border-r">
        Maksimalus elemento ilgis
      </div>
      <div v-if="!blinds" class="px-2 py-1 border-b border-inherit border-r">
        3000 mm
      </div>
      <div class="px-2 py-1 border-b border-inherit border-r">
        Metalinės dangos masė (g/m2)
      </div>
      <div class="px-2 py-1 border-b border-inherit border-r">ZN 275</div>
      <div class="px-2 py-1 border-r border-inherit">Padengimas</div>
      <div class="px-2 py-1 border-r border-inherit">
        min. 35 mikronų dviejų sluoksnių dengimo sistema
      </div>
    </div>

    <div
      v-if="!hideEco"
      class="sm:hidden grid-cols-2 border-2 border-black rounded-md grid"
    >
      <div class="px-2 py-1 border-b border-inherit border-r">
        Skardos tipas
      </div>
      <div class="px-2 py-1 border-b border-inherit font-bold">Eco</div>
      <div class="px-2 py-1 border-b border-inherit border-r">Gamintojas</div>
      <div class="px-2 py-1 border-b border-inherit">Ukraina</div>
      <div class="px-2 py-1 border-b border-inherit border-r">
        Gamintojo šalis
      </div>
      <div class="px-2 py-1 border-b border-inherit">Ukraina</div>
      <div class="px-2 py-1 border-b border-inherit border-r">
        Techninė garantija
      </div>
      <div class="px-2 py-1 border-b border-inherit">10 metų</div>
      <div class="px-2 py-1 border-b border-inherit border-r">
        Spalvos garantija
      </div>
      <div class="px-2 py-1 border-b border-inherit">5 metai</div>
      <div class="px-2 py-1 border-b border-inherit border-r">
        Skardos storis
      </div>
      <div class="px-2 py-1 border-b border-inherit">0.42 mm</div>
      <div class="px-2 py-1 border-b border-inherit border-r">
        Skardos identiško atspalvio garantas
      </div>
      <div class="px-2 py-1 border-b border-inherit">Ne</div>
      <div class="px-2 py-1 border-b border-inherit border-r">
        Rekomenduojamas elemento ilgis
      </div>
      <div class="px-2 py-1 border-b border-inherit">2000 mm</div>
      <div class="px-2 py-1 border-b border-inherit border-r">
        Maksimalus elemento ilgis
      </div>
      <div class="px-2 py-1 border-b border-inherit">2500 mm</div>
      <div class="px-2 py-1 border-b border-inherit border-r">
        Metalinės dangos masė (g/m2)
      </div>
      <div class="px-2 py-1 border-b border-inherit">Zn 100</div>
      <div class="px-2 py-1 border-r border-inherit">Padengimas</div>
      <div class="px-2 py-1">25 mikronai</div>
    </div>
  </OffersBoxWrap>
</template>
