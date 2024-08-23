<script setup lang="ts">
const useMontavimas = useMontavimasStore();
const useUser = useUserStore()

const filteredMontavimas = computed(() => {
  if (useUser.user!.accountType === "Administratorius") {
    return useMontavimas.montavimasList;
  } else {
    return useMontavimas.montavimasList.filter(item => item.worker === useUser.user?.email);
  }
});

</script>

<template>
  <div class="flex flex-col max-w-96 m-auto  gap-4">
    <div v-for="(order, index) in useMontavimas.montavimasList" :key="order._id" :dataIndex="index">
      <MontavimasOrder :order="order" :index="index" />
    </div>
  </div>
</template>

<style scoped></style>
