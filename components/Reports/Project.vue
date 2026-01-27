<script setup lang="ts">
import type { Project } from "~/data/interfaces";

defineProps<{
  project: Project;
  index: number;
}>();

const getStatusColor = (status: string) => {
  switch (status) {
    case "Patvirtintas":
      return "bg-green-400";
    case "Betonuojama":
      return "bg-emerald-400";
    case "Gaminama":
      return "bg-teal-400";
    case "Montuojama":
      return "bg-indigo-400";
    case "Laukiam Vartų":
      return "bg-blue-400";
    case "Vartai Sumontuoti":
      return "bg-violet-400";
    case "Pridavimas":
      return "bg-lime-400";
    case "Apmokėjimas":
      return "bg-fuchsia-400";
    case "Baigtas":
      return "bg-gray-400 ";
    default:
      return "bg-yellow-400";
  }
};
</script>

<template>
  <div class="flex items-center px-4 py-4 gap-4">
    <div class="w-8 flex-shrink-0">
      <div
        class="rounded-full text-white font-bold py-1 text-center w-8 h-8"
        :class="getStatusColor(project.status)"
      >
        {{ index + 1 }}
      </div>
    </div>
    <div class="w-28 flex-shrink-0 font-semibold">
      {{ project?.orderNumber }}
    </div>
    <div class="w-72 flex-shrink-0">{{ project?.client?.address }}</div>
    <div class="w-32 flex-shrink-0">
      {{ project?.creator?.username }} {{ project?.creator?.lastName?.slice(0, 1) }}.
    </div>
    <div class="w-32 flex-shrink-0">{{ project?.dates?.dateCreated?.slice(0, 10) }}</div>
    <div class="w-24 flex-shrink-0 font-medium">{{ project?.advance }} €</div>
    <div class="w-24 flex-shrink-0 font-medium">
      {{
        (
          (project.discount ? project.priceWithDiscount : project.totalPrice) - project.advance
        ).toFixed(2)
      }}
      €
    </div>
    <div class="w-24 flex-shrink-0 font-medium">{{ project?.totalCost }} €</div>
    <div class="w-24 flex-shrink-0 font-medium">{{ project?.totalPrice }} €</div>
    <div class="w-24 flex-shrink-0 font-medium text-red-600">{{ project?.totalProfit }} €</div>
    <div class="font-medium">{{ project?.totalMargin }} %</div>
  </div>
</template>

<style scoped></style>
