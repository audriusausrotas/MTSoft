<script setup lang="ts">

const useProject = useProjectStore();

const createFenceHandler = () => {
  useProject.addFence();
};
</script>

<template>
  <div class="flex flex-col gap-12">
    <div class="flex flex-col items-center gap-8 xl:items-start">
      <CalcClient />
      <BaseButton name="Sukurti Tvorą" @click="createFenceHandler" />
    </div>

    <div v-for="(fence, index) in useProject.fences" :key="fence.id">
      <CalcFence :fence="fence" :index="index" />
    </div>
  </div>
</template>
<style scoped></style>
