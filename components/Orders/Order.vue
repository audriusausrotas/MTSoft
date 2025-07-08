<script setup lang="ts">
const props = defineProps(["order", "index"]);
const { setError, setSuccess } = useError();
const userStore = useUserStore();

const dateNow = new Date().getTime();
const dateCreated = new Date(props.order?.orderDate).getTime();

const dateDifferenceMs = dateNow - dateCreated;
const dateDifference = Math.floor(dateDifferenceMs / (1000 * 60 * 60 * 24));

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
      <BaseInput
        :name="props.order?.orderNr"
        width="w-36 order-2"
        :disable="true"
      />
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

      <BaseInfoField
        v-if="userStore.user?.accountType === 'Administratorius'"
        :name="props.order?.recipient?.split('@')[0].replace('.', ' ')"
        width="w-52 order-4 "
        class="capitalize"
      />

      <BaseInfoField
        v-if="props.order?.status"
        :name="props.order?.deliveryDate?.slice(0, 10)"
        width="w-32"
        class="order-5"
        :class="
          dateDifference < 25
            ? 'bg-green-500'
            : dateDifference < 45
            ? 'bg-orange-500'
            : dateDifference < 60
            ? 'bg-red-600'
            : 'bg-red-800 text-white animate-bounce'
        "
      />
      <BaseInfoField
        v-else
        name="Baigtas"
        width="w-32"
        class="order-5 bg-green-500"
      />
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
