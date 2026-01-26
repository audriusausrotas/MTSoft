<script setup lang="ts">
const props = defineProps(["order", "index"]);
const { setError, setSuccess } = useError();
const productionStore = useProductionStore();
const userStore = useUserStore();
const router = useRouter();

const deleteHandler = async (): Promise<void> => {
  const confirmed = confirm("Ar tikrai norite ištrinti projektą?");
  if (!confirmed) return;

  if (
    userStore.user?.accountType !== "Administratorius" &&
    userStore.user?.accountType !== "Vadybininkas"
  ) {
    setError("Ištrinti gali tik administratorius");
    return;
  }

  const response: any = await request.delete(`deleteProduction/${props.order._id}`);

  if (response.success) {
    !useSocketStore().connected && productionStore.deleteProductionOrder(response.data._id);
    await router.replace("/gamyba");
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const clickHandler = () => {
  navigateTo(`/gamyba/${props.order._id}`);
};
</script>

<template>
  <div
    class="flex gap-4 hover:cursor-pointer hover:scale-105 transition-all items-center"
    @click="clickHandler"
  >
    <div class="pointer-events-none w-4">{{ index + 1 }}</div>
    <BaseInfoField
      class="pointer-events-none"
      :name="props.order?.orderNumber"
      width="w-24"
      :class="
        props.order.status === 'Pagaminta'
          ? 'bg-violet-500'
          : props.order.status === 'Negaminti'
            ? 'bg-red-full'
            : props.order.status === 'Laukiama'
              ? 'bg-orange-500'
              : 'bg-green-500'
      "
    />
    <BaseInfoField class="pointer-events-none" :name="order?.client?.address" width="w-96" />
    <BaseInfoField class="pointer-events-none" :name="order?.creator?.username" width="w-24" />
    <div @click.stop="deleteHandler" class="hover:cursor-pointer hover:bg-red-200 rounded-md p-1">
      <NuxtImg
        src="/icons/delete.svg"
        width="24"
        height="24"
        decoding="auto"
        :ismap="true"
        loading="lazy"
      />
    </div>
  </div>
</template>
<style scoped></style>
