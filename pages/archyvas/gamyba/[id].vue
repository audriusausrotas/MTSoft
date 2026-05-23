<script setup lang="ts">
const { setError } = useCustomError();
const route = useRoute();

const order = ref<any>(null);

onBeforeMount(async () => {
  const response = await request.get(`getArchiveProduction/${route.params.id}`);

  if (response.success) {
    order.value = response.data;
  } else {
    setError(response.message);
  }
});
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex gap-4 items-end flex-wrap">
      <div class="border rounded-lg px-4 py-2">{{ order?.orderNumber }}</div>
      <div class="border rounded-lg px-4 py-2">{{ order?.client.address }}</div>
      <div class="border rounded-lg px-4 py-2">{{ order?.creator.username }}</div>
      <div class="border rounded-lg px-4 py-2">{{ order?.status }}</div>
    </div>

    <div>
      <div v-for="(comment, index) in order?.comments" :key="index">
        <div class="flex flex-col md:flex-row gap-2 border-b items-center">
          <div class="flex gap-2 items-center flex-wrap">
            <div class="font-semibold text-red-500">{{ comment.creator }}</div>
          </div>
          <div class="flex-1">
            {{ comment.comment }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-4 flex-col">
      <ArchiveProductionFence v-for="fence in order?.fences" :key="fence._id" :fence="fence" />
    </div>

    <div class="flex flex-col gap-8">
      <div class="flex flex-col select-none">
        <div class="flex gap-4 items-center mb-2">
          <p class="text-2xl font-bold">Apkaustai</p>
        </div>
        <div class="flex w-fit border-y items-center h-8 border-black select-none">
          <p
            class="hover:cursor-pointer h-full items-center w-10 border-x border-black flex justify-evenly"
          >
            Nr
          </p>
          <p class="w-48 border-r border-black h-full flex justify-center items-center">tipas</p>
          <p
            class="hover:cursor-pointer w-16 flex gap-1 justify-center border-r border-black h-full items-center"
          >
            Ilgis
          </p>
          <p class="w-16 border-r border-black h-full flex justify-center items-center">Kiekis</p>
          <p class="w-16 border-r border-black h-full flex justify-center items-center">spalva</p>
          <p class="w-24 border-r border-black h-full flex justify-center items-center">Išpjauta</p>
          <p class="w-24 border-r border-black h-full flex justify-center items-center">
            Pagaminta
          </p>
        </div>

        <ArchiveProductionBindings
          v-for="(binding, index) in order?.bindings"
          :key="binding.id"
          :binding="binding"
          :index="index"
          :_id="order._id"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
