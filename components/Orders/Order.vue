<script setup lang="ts">
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
    return "bg-gray-ultra-light";
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
  <div
    @click="clickHandler"
    class="flex gap-2 flex-wrap hover:cursor-pointer select-none group relative p-4 rounded-xl"
    :class="'rounded-xl p-4 border border-gray-300 shadow-md hover:bg-stone-100 hover:shadow-inner hover:shadow-stone-400 transition-all duration-50'"
  >
    <BaseInput :name="index + 1" width="w-14 " :disable="true" label="Nr" />
    <div v-if="userStore.user?.accountType === 'Administratorius'" class="flex gap-2">
      <BaseInput
        disable="true"
        :name="props.order?.projectOrderNr"
        width="w-28 "
        label="Užsakymo nr"
      />
      <BaseInput
        disable="true"
        :name="props.order?.creator?.username"
        width="w-28 "
        label="Užsakovas"
      />
    </div>

    <BaseInput
      :name="props.order?.client?.address"
      width="w-[240px]"
      :disable="true"
      label="Kliento adresas"
    />

    <BaseInput
      disable="true"
      :name="props.order?.deliveryMethod"
      width="w-40  "
      class="capitalize"
      label="Atsiėmimo"
    />

    <BaseInput :name="props.order?.orderNr" width="w-32 " :disable="true" label="Užsakymo nr" />

    <div v-if="userStore.user?.accountType === 'Administratorius'" class="flex gap-2 h-16">
      <BaseInput
        disable="true"
        :name="props.order?.recipient[0]?.company"
        width="w-40 "
        label="Tiekėjo įmonė"
      />

      <div class="relative group/2">
        <BaseInput
          disable="true"
          :name="
            props.order.recipient[0].email +
            (props.order.recipient.length > 1 ? ' +' + (props.order.recipient.length - 1) : '')
          "
          width="w-60 "
          label="Tiekėjo el. paštas"
        />
        <div
          v-if="props.order.recipient.length > 1"
          class="absolute top-16 left-0 w-60 flex-col border border-stone-300 bg-stone-100 rounded-lg px-4 py-2 z-50 group-hover/2:visible invisible flex"
        >
          <div v-for="item of props.order.recipient">{{ item.email }}</div>
        </div>
      </div>
    </div>

    <div v-if="props.order.status" class="w-32">
      <p class="pl-2 pb-1 capitalize text-sm">Pristatymo data</p>
      <div
        class="border rounded-lg h-10 py-2 px-4 border-dark-light justify-center flex items-center"
        :class="[statusColor, dateColor]"
      >
        {{ props.order?.deliveryDate?.slice(0, 10) }}
      </div>
    </div>

    <BaseInput
      disable="true"
      v-else
      name="Baigta"
      width="w-32"
      class="bg-stone-400"
      label="Pristatymo data"
    />

    <NuxtImg
      v-if="userStore.user?.accountType === 'Administratorius'"
      src="/icons/delete.svg"
      width="20"
      height="20"
      decoding="auto"
      :ismap="true"
      loading="lazy"
      @click.stop="deleteHandler"
      class="hover:cursor-pointer hover:scale-125 transition-transform absolute top-4 left-12 hidden z-50 group-hover:block"
    />
  </div>
</template>
