<script setup lang="ts">
const props = defineProps(["order", "index"]);
const { setError, setIsError } = useError();
const useMontavimas = useMontavimasStore();
const useUser = useUserStore();

const deleteHandler = async (): Promise<void> => {
  if (useUser.user?.accountType !== "Administratorius") {
    setError("Ištrinti gali tik administratorius");
    return;
  }

  const response: any = await $fetch("/api/montavimas", {
    method: "delete",
    body: { _id: props.order._id },
  });
  if (response.success) {
    useMontavimas.deleteMontavimasOrder(props.order._id);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const clickHandler = () => {
  navigateTo(`/montavimas/${props.order._id}`);
};
</script>

<template>
  <div
    class="flex flex-col divide-y select-none divide-black border border-black hover:border-red-full border-b text-sm sm:text-base"
  >
    <div class="flex">
      <div class="flex flex-1 hover:cursor-pointer" @click="clickHandler">
        <p
          class="flex items-center justify-center w-8 h-8 border-r border-black"
          :class="
            props.order.status === 'Sumontuota'
              ? 'bg-violet-500'
              : props.order.status === 'Nemontuoti'
              ? 'bg-red-full'
              : props.order.status === 'Laukiama'
              ? 'bg-orange-500'
              : 'bg-green-500'
          "
        >
          {{ index + 1 }}
        </p>
        <p class="flex flex-1 items-center justify-center h-8 border-r border-black">
          {{ order?.orderNumber }}
        </p>
        <p class="flex flex-1 items-center justify-center h-8 border-r border-black">
          {{ order?.creator.username }}
        </p>
      </div>
      <div
        @click="deleteHandler"
        class="flex items-center justify-center w-8 h-8 hover:cursor-pointer hover:bg-red-200"
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
    <p
      class="flex items-center justify-center h-8 hover:cursor-pointer font-bold"
      @click="clickHandler"
    >
      {{ order?.client.address }}
    </p>
    <p
      v-if="useUser.user?.accountType === 'Administratorius'"
      class="flex flex-1 items-center justify-center h-8 border-black"
    >
      {{ order?.worker.join(", ") }}
    </p>
  </div>
</template>
<style scoped></style>
