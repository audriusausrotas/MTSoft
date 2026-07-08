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
    default:
      return "-";
  }
});
</script>

<template>
  <div class="flex p-4 gap-4 border-t items-center hover:bg-slate-50">
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

    <div class="w-24 flex-shrink-0">
      {{ action }}
    </div>

    <div class="w-24 flex-shrink-0">
      {{ props.item.totalQuantity }}
    </div>

    <div class="w-24 flex-shrink-0">
      {{ (item.totalLength / 100)?.toFixed(2) }}
    </div>

    <div class="w-24 flex-shrink-0">
      {{ props.item.totalBends }}
    </div>

    <div class="w-24 flex-shrink-0">
      {{ props.item.totalHoles }}
    </div>

    <div class="w-6 flex-shrink-0 relative">
      <img
        @mouseenter="open = true"
        @mouseleave="open = false"
        src="/icons/eye.svg"
        alt=""
        class="cursor-pointer"
      />
      <div
        v-if="open"
        class="absolute top-4 right-6 border w-fit overflow-hidden border-gray-300 rounded-md bg-white shadow-lg divide-y divide-gray-light"
      >
        <div class="flex gap-4 bg-gray-100 p-2">
          <div class="w-48">Pavadinimas</div>
          <div class="w-12">Kiekis</div>
          <div class="w-12">Ilgis</div>
          <div class="w-24">Data</div>
          <div class="w-24">Tvoros Nr.</div>
          <div class="w-24">Tarpo Nr</div>
        </div>
        <div class="flex flex-col max-w-96 overflow-y-auto">
          <ReportsProductionAditional
            v-for="element in props.item.elements"
            :key="element.timestamp + element.name"
            :element="element"
          />
        </div>
      </div>
    </div>
  </div>
</template>
