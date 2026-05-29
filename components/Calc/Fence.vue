<script setup lang="ts">
import { fenceSide } from "~/data/selectFieldData";

const props = defineProps(["fence", "index"]);

const calculationsStore = useCalculationsStore();
const currentFence = calculationsStore.fences[props.index];

const open = ref<boolean>(true);

const deleteHandler = (): void => {
  calculationsStore.deleteFence(props.fence.id);
};
</script>

<template>
  <div class="flex flex-col gap-4 pt-8 flex-wrap">
    <div class="flex gap-4">
      <BaseSelectField
        :values="fenceSide"
        id="fenceSide"
        :defaultValue="currentFence.side"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateSide(props.index, value)"
      />
      <BaseInput
        placeholder="Komentarai"
        variant="light"
        width="w-full max-w-[1264px]"
        :name="currentFence.comment"
        @onChange="(value: string) => calculationsStore.updateComment(props.index, value)"
      />
      <CalcTitle :open="open" @onClick="open = !open" />
      <NuxtImg
        @click="deleteHandler"
        src="/icons/delete.svg"
        width="20"
        height="20"
        decoding="auto"
        :ismap="true"
        loading="lazy"
        class="hover:cursor-pointer hover:scale-110 transition-transform border h-10 rounded-lg w-10 p-2 bg-gray-ultra-light border-dark-light;"
      />
    </div>

    <CalcFenceDetails v-if="open" :index="props.index" />
  </div>
</template>
