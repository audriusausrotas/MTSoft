<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  item: any;
  index: number;
}>();

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

const cutQuantity = computed(() => (props.item.operation === "cut" ? props.item.totalQuantity : 0));

const bendQuantity = computed(() =>
  props.item.operation === "done" ? props.item.totalQuantity : 0,
);

const holesQuantity = computed(() =>
  props.item.operation === "holes" ? props.item.totalQuantity : 0,
);
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
      {{ cutQuantity }}
    </div>

    <div class="w-24 flex-shrink-0">
      {{ bendQuantity }}
    </div>

    <div class="w-24 flex-shrink-0">
      {{ holesQuantity }}
    </div>

    <div class="w-24 flex-shrink-0">
      {{ (item.totalLength / 100).toFixed(2) }}
    </div>
  </div>
</template>
