<script setup lang="ts">
const { setError, setSuccess } = useCustomError();
const suppliersStore = useSuppliersStore();

const deleteHandler = async (_id: string) => {
  const response: any = await request.delete(`deleteSupplier/${_id}`);

  if (response.success) {
    !useSocketStore().connected && suppliersStore.deleteSupplier(response.data._id);
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 border-b">
      <p class="w-6">Nr</p>
      <p class="w-60">Vardas</p>
      <p class="w-60">Įmonė</p>
      <p class="w-60">El. Paštas</p>
      <p class="w-28">Telefonas</p>
      <p class="w-60">Adresas</p>
    </div>
    <div
      v-for="(supplier, index) in suppliersStore.suppliers"
      :key="supplier?._id"
      class="flex gap-4 border-b"
    >
      <p class="w-6">{{ index + 1 }}</p>
      <p class="w-60">{{ supplier?.username }}</p>
      <p class="w-60">{{ supplier?.company }}</p>
      <p class="w-60">{{ supplier?.email }}</p>
      <p class="w-28">{{ supplier?.phone }}</p>
      <p class="w-60">{{ supplier?.address }}</p>
      <div @click="deleteHandler(supplier._id!)" class="w-6 hover:cursor-pointer">
        <NuxtImg
          src="/icons/delete.svg"
          width="18"
          height="18"
          decoding="auto"
          :ismap="true"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
