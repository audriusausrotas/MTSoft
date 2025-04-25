<script setup lang="ts">
const props = defineProps(["order", "index"]);
const { setError, setIsError } = useError();
const installationStore = useInstallationStore();
const userStore = useUserStore();

const statusColor = computed(() =>
  props.order.status === "Sumontuota"
    ? "bg-violet-500"
    : props.order.status === "Nemontuoti"
    ? "bg-red-600"
    : props.order.status === "Laukiama"
    ? "bg-orange-500"
    : "bg-green-500"
);

const deleteHandler = async (): Promise<void> => {
  const confirmed = confirm("Ar tikrai norite ištrinti darbą?");
  if (!confirmed) return;

  if (userStore.user?.accountType !== "Administratorius") {
    setError("Ištrinti gali tik administratorius");
    return;
  }

  const response: any = await request.delete(`deleteInstallation/${props.order._id}`);

  if (response.success) {
    !useSocketStore().connected && installationStore.deleteInstallationOrder(response.data._id);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const workerDeleteHandler = async (worker: string) => {
  const requestData = { _id: props.order._id, worker };

  const response: any = await request.delete("deleteWorker", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      installationStore.deleteInstallationWorker(response.data._id, response.data.worker);
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
    class="flex flex-col w-[378px] divide-y rounded-md overflow-hidden select-none divide-black border border-black hover:scale-105 transition-transform text-sm sm:text-base font-semibold"
  >
    <div class="flex">
      <div class="flex flex-1 hover:cursor-pointer" @click="clickHandler" :class="statusColor">
        <p class="flex items-center justify-center w-8 h-8 border-r border-black">
          {{ index + 1 }}
        </p>
        <p class="flex flex-1 items-center justify-center h-8 border-r border-black">
          {{ order?.orderNumber }}
        </p>
        <p class="flex flex-1 items-center justify-center h-8 border-r border-black">
          {{ order?.creator.username }}
        </p>
        <div
          @click.stop="deleteHandler"
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
    </div>
    <p class="flex items-center justify-center h-8 hover:cursor-pointer" @click="clickHandler">
      {{ order?.client.address }}
    </p>
    <div
      v-if="userStore.user?.accountType === 'Administratorius'"
      class="flex flex-1 items-center justify-around h-8 border-black bg-stone-300"
    >
      <div v-for="worker in props.order.workers" :key="worker" class="flex gap-1">
        <p>{{ worker }}</p>
        <NuxtImg
          @click="workerDeleteHandler(worker)"
          src="/icons/delete.svg"
          width="16"
          height="16"
          decoding="auto"
          :ismap="true"
          loading="lazy"
          class="hover:cursor-pointer hover:bg-green-500"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
