<script setup lang="ts">
import type { Supplier } from "~/data/interfaces";

const props = defineProps(["order", "index"]);
const { setError, setSuccess } = useError();
const userStore = useUserStore();

const dateNow = new Date().getTime();
const orderDate = new Date(props.order?.deliveryDate).getTime();

const dateDifferenceMs = orderDate - dateNow;
const dateDifference = Math.floor(dateDifferenceMs / (1000 * 60 * 60 * 24));

const dateColor =
  dateDifference < -1000
    ? ""
    : dateDifference < -1
    ? "border-4 border-red-500 "
    : dateDifference < 2
    ? "animate-bounce "
    : dateDifference < 5
    ? "animate-pulse"
    : "";

const statusColor = computed(() => {
  const items = props?.order?.data ?? [];

  if (items.every((item: any) => !item.delivered && !item.inWarehouse && !item.ordered))
    return "bg-white";
  else if (items.every((item: any) => item.delivered)) return "bg-stone-400";
  else if (items.every((item: any) => item.inWarehouse)) return "bg-green-500";
  else if (items.every((item: any) => item.ordered)) return "bg-yellow-500";
  else return "bg-yellow-500";
});

const deleteHandler = async () => {
  const response: any = await request.delete(`deleteOrder/${props.order?._id}`);

  if (response.success) {
    if (!useSocketStore().connected) {
      useOrderStore().deleteOrder(response.data?._id);
    }

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const clickHandler = () => {
  navigateTo("/uzsakymai/" + props.order?._id);
};
</script>

<template>
  <div class="flex gap-4 m-auto items-center">
    <div
      @click="clickHandler"
      class="flex sm:gap-2 gap-y-4 flex-wrap hover:scale-105 transition-transform hover:cursor-pointer select-none"
    >
      <BaseInput :name="index + 1" width="w-14 order-1" :disable="true" />
      <BaseInput :name="props.order?.orderNr" width="w-36 order-2" :disable="true" />
      <BaseInput
        :name="props.order?.client?.address"
        width="w-full md:w-80 order-6 md:order-3"
        :disable="true"
      />

      <BaseInfoField
        :name="props.order?.deliveryMethod"
        width="w-40 order-3 md:order-4"
        class="capitalize"
      />

      <div v-if="userStore.user?.accountType === 'Administratorius'" class="order-4 flex gap-2">
        <BaseInfoField :name="props.order?.recipient[0]?.company" width="w-40 " />

        <div
          class="flex flex-col items-center justify-center border rounded-lg shadow-sm border-dark-light bg-gray-ultra-light order-5 w-60"
        >
          <p v-for="item of props.order.recipient">{{ item.email }}</p>
        </div>
      </div>

      <BaseInfoField
        v-if="props.order.status"
        :name="props.order?.deliveryDate?.slice(0, 10)"
        width="w-32"
        class="order-6"
        :class="[statusColor, dateColor]"
      />

      <BaseInfoField v-else name="Baigta" width="w-32" class="order-7 bg-stone-400" />
    </div>

    <div
      v-if="userStore.user?.accountType === 'Administratorius'"
      @click="deleteHandler"
      class="hover:cursor-pointer hover:bg-red-200 flex items-center justify-center w-8 h-8 rounded-md"
    >
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
