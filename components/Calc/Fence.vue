<script setup lang="ts">
const props = defineProps(["fence", "index"]);

const calculationsStore = useCalculationsStore();

const open = ref<boolean>(true);

const deleteHandler = (): void => {
  calculationsStore.deleteFence(props.fence.id);
};
</script>

<template>
  <div class="flex flex-col gap-8 pt-8 border-t-2 flex-wrap border-red-full">
    <div class="flex">
      <div class="flex gap-8">
        <CalcTitle :open="open" :name="'Tvora ' + (props.index + 1)" @onClick="open = !open" />
        <NuxtImg
          src="/icons/delete.svg"
          width="24"
          height="24"
          class="cursor-pointer"
          decoding="auto"
          @click="deleteHandler"
        />
      </div>

      <div class="flex flex-wrap gap-10 m-auto">
        <p>
          Bendras Ilgis:
          {{ calculationsStore.fences[props.index]?.totalLength || 0 }} m
        </p>
        <p class="flex">
          Kvadratiniai metrai:
          {{ calculationsStore.fences[props.index]?.totalQuantity || 0 }} m<span
            class="text-[10px] font-semibold"
            >2</span
          >
        </p>
      </div>
    </div>
    <CalcFenceDetails v-if="open" :index="props.index" />
  </div>
</template>
