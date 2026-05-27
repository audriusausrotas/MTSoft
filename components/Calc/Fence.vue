<script setup lang="ts">
const props = defineProps(["fence", "index"]);

const calculationsStore = useCalculationsStore();

const open = ref<boolean>(true);

const deleteHandler = (): void => {
  calculationsStore.deleteFence(props.fence.id);
};
</script>

<template>
  <div class="flex flex-col gap-8 pt-8 flex-wrap">
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
    </div>
    <CalcFenceDetails v-if="open" :index="props.index" />
  </div>
</template>
