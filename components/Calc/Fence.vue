<script setup lang="ts">
const props = defineProps(["fence", "index"]);

const useCalculations = useCalculationsStore();

const open = ref<boolean>(true);

const deleteHandler = (): void => {
  useCalculations.deleteFence(props.fence.id);
};
</script>

<template>
  <div class="flex flex-col gap-8 pt-8 border-t-2 border-red-full">
    <div class="flex gap-8">
      <CalcTitle
        :open="open"
        :name="'Tvora ' + (props.index + 1)"
        @onClick="open = !open"
      />
      <NuxtImg
        src="/icons/delete.svg"
        width="24"
        height="24"
        class="cursor-pointer"
        decoding="auto"
        @click="deleteHandler"
      />
    </div>
    <CalcFenceDetails v-if="open" :index="props.index" />
  </div>
</template>
