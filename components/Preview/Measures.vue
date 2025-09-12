<script setup lang="ts">
const props = defineProps(["fence", "index"]);

const isFenceBoard = props.fence.elements;
const isSegment = props.fence.type.includes("Segmentas");
</script>

<template>
  <div class="flex flex-col rounded-md shadow-lg border w-[312px]">
    <p v-if="fence.comment">Komentarai: {{ fence.comment }}</p>

    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2 text-center">Tvoros informacija</h3>
      <div class="grid grid-cols-2 gap-y-1 border-t border-black pt-2">
        <div class="font-medium">Tvoros pusė</div>
        <div>{{ props.fence.side }}</div>

        <div class="font-medium">Pavadinimas</div>
        <div>{{ props.fence.type }}</div>

        <div class="font-medium">Tvoros spalva</div>
        <div>RAL {{ props.fence.color }}</div>

        <div v-if="!isFenceBoard && !isSegment" class="font-medium">
          Pramatomumas
        </div>
        <div v-if="!isFenceBoard && !isSegment">
          {{ props.fence.seeThrough }}
        </div>

        <div v-if="!isFenceBoard && !isSegment" class="font-medium">
          Žingsnis
        </div>
        <div v-if="!isFenceBoard && !isSegment">
          {{
            (fence.measures[0].height / fence.measures[0].elements).toFixed(2)
          }}
          cm
        </div>

        <div v-if="isFenceBoard" class="font-medium">Dvipusė</div>
        <div v-if="isFenceBoard">
          {{ props.fence.twoSided }}
        </div>

        <div v-if="isFenceBoard" class="font-medium">Tarpas</div>
        <div v-if="isFenceBoard">{{ props.fence.space }} mm</div>

        <div class="font-medium">Metražas</div>
        <div>{{ props.fence.totalLength }} m</div>

        <div v-if="isFenceBoard" class="font-medium">Viso elementų</div>
        <div v-if="isFenceBoard">{{ isFenceBoard }} vnt</div>

        <div v-if="!isFenceBoard && props.fence.type" class="font-medium">
          Kvadratūra
        </div>
        <div v-if="!isFenceBoard">
          {{ props.fence.totalQuantity }} m<span>²</span>
        </div>
      </div>

      <p v-if="props.fence.comment" class="text-sm text-gray-700 italic">
        Komentarai: {{ props.fence.comment }}
      </p>
    </div>

    <div class="table_layout">
      <p class="table_cells w-10">Nr</p>
      <p class="table_cells flex-1">Ilgis</p>
      <p class="table_cells flex-1">Aukštis</p>
      <p class="table_cells flex-1">Elementai</p>
    </div>

    <div class="flex flex-col flex-1">
      <PreviewMeasure
        v-for="(data, index) in fence.measures"
        :key="data.index"
        :data="data"
        :index="index"
        :fenceSide="props.fence.side"
        :_id="data._id"
      />
    </div>
  </div>
</template>

<style scoped>
.table_cells {
  @apply flex items-center justify-center h-full;
}

.table_layout {
  @apply flex w-full border-y items-center h-8 border-gray-400 select-none;
}

.info_cell {
  @apply px-2 py-1 flex-1;
}
</style>
