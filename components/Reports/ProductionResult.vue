<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  item: any;
  index: number;
}>();

const open = ref<boolean>(false);

const action = computed(() => {
  switch (props.item.operation) {
    case "cut":
      return "Pjovimas";
    case "done":
      return "Lenkimas";
    case "holes":
      return "Skylutės";
    case "defect":
      return "Defektas";
    default:
      return "-";
  }
});
</script>

<template>
  <div class="flex p-4 gap-4 border-t items-center hover:bg-gray-50">
    <div class="w-8 flex-shrink-0">
      {{ index + 1 }}
    </div>

    <div class="w-28 flex-shrink-0 font-medium">
      {{ item.orderNumber }}
    </div>

    <div class="w-60 flex-shrink-0">{{ item.user?.username }} {{ item.user?.lastName }}</div>

    <div class="w-60 flex-shrink-0">
      {{ item.machine }}
    </div>

    <div class="w-24 flex-shrink-0" :class="action === 'Defektas' ? 'text-red-500' : ''">
      {{ action }}
    </div>

    <div class="w-14 flex-shrink-0">
      {{ props.item.totalQuantity }}
    </div>

    <div class="w-14 flex-shrink-0">
      {{ (item.totalLength / 100)?.toFixed(2) }}
    </div>

    <div class="w-20 flex-shrink-0">
      {{ props.item.totalBends }}
    </div>
    <div class="w-28 flex-shrink-0">
      {{ (props.item.totalBendLength / 100)?.toFixed(2) }}
    </div>

    <div class="w-20 flex-shrink-0">
      {{ props.item.totalHoles }}
    </div>

    <div class="w-6 flex-shrink-0 relative">
      <img
        @click="open = !open"
        :src="`/icons/eye${open ? '2' : ''}.svg`"
        alt=""
        class="cursor-pointer"
      />
      <div
        v-if="open"
        class="absolute top-4 right-6 border w-fit flex flex-col h-fit max-h-[600px] overflow-y-auto overflow-x-hidden border-gray-300 rounded-md bg-white shadow-lg divide-y divide-gray-light"
      >
        <div class="flex gap-4 bg-gray-300 p-2 font-medium text sticky top-0 text-center">
          <div class="w-8">Nr</div>
          <div class="w-48">Pavadinimas</div>
          <div class="w-14">Kiekis</div>
          <div class="w-14">Ilgis</div>
          <div class="w-24">Bendras ilgis</div>
          <div class="w-20">Lenkimai</div>
          <div class="w-28">Išlenkta metrų</div>
          <div class="w-40">Data</div>
          <div class="w-20">Tvoros Nr.</div>
          <div class="w-20">Tarpo Nr.</div>
        </div>
        <div class="divide-y divide-gray-light">
          <ReportsProductionAditional
            v-for="(element, index) in props.item.elements"
            :key="element.timestamp + element.name + index"
            :element="element"
            :index="+index"
          />
        </div>
      </div>
    </div>
  </div>
</template>
