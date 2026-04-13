<script setup lang="ts">
const props = defineProps(["order", "index"]);
const { setError, setSuccess } = useCustomError();
const userStore = useUserStore();

const dateNow = new Date().getTime();
const orderDate = new Date(props.order?.deliveryDate).getTime();

const dateDifferenceMs = orderDate - dateNow;
const dateDifference = Math.floor(dateDifferenceMs / (1000 * 60 * 60 * 24));

const dateColor =
  dateDifference < -1000
    ? ""
    : dateDifference < -1
      ? "border-4 border-red-500 text-red-600"
      : dateDifference < 2
        ? "text-red-600"
        : dateDifference < 5
          ? "animate-pulse"
          : "";

const statusColor = computed(() => {
  const items = props?.order?.data ?? [];

  if (items.every((item: any) => !item.delivered && !item.inWarehouse && !item.ordered))
    return "bg-slate-200";
  else if (items.every((item: any) => item.delivered)) return "bg-stone-400";
  else if (items.every((item: any) => item.inWarehouse)) return "bg-green-500";
  else if (items.every((item: any) => item.ordered)) return "bg-yellow-400";
  else return "bg-yellow-300";
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
    class="group relative flex items-center gap-4 p-4 bg-white border-b border-gray-300 hover:bg-blue-50/50 hover:shadow-lg transition-all duration-150 cursor-pointer"
  >
    <div class="w-10 shrink-0 text-center">
      <p class="text-xs font-bold text-gray-400 uppercase">Nr</p>
      <span class="text-sm font-bold">{{ index + 1 }}</span>
    </div>

    <template
      v-if="
        userStore.user?.accountType === 'Administratorius' ||
        userStore.user?.accountType === 'Vadybininkas'
      "
    >
      <div class="w-24 shrink-0 text-center">
        <p class="text-xs font-bold text-gray-400 uppercase">Užsakymo nr</p>
        <span class="font-medium">{{ props.order?.projectOrderNr || "-------------" }}</span>
      </div>
      <div class="w-24 shrink-0 text-center">
        <p class="text-xs font-bold text-gray-400 uppercase">Užsakovas</p>
        <span class="font-medium">{{ props.order?.creator?.username }}</span>
      </div>
    </template>

    <div class="flex-1 min-w-[200px] text-center">
      <p class="text-xs font-bold text-gray-400 uppercase">Kliento adresas</p>
      <span class="font-semibold" :title="props.order?.client?.address">
        {{ props.order?.client?.address || "----------------" }}
      </span>
    </div>

    <div class="w-32 shrink-0 text-center">
      <p class="text-xs font-bold text-gray-400 uppercase">Atsiėmimas</p>
      <span class="font-medium text-gray-700">
        {{ props.order?.deliveryMethod }}
      </span>
    </div>

    <div class="w-24 shrink-0 text-center">
      <p class="text-xs font-bold text-gray-400 uppercase">Sistemos Nr</p>
      <span class="font-medium">{{ props.order?.orderNr || "---------" }}</span>
    </div>

    <template
      v-if="
        userStore.user?.accountType === 'Administratorius' ||
        userStore.user?.accountType === 'Vadybininkas'
      "
    >
      <div class="w-40 shrink-0 border-l border-gray-100 text-center">
        <p class="text-xs font-bold text-gray-400 uppercase">Tiekėjas</p>
        <span class="text-sm font-bold text-gray-800">{{
          props.order?.recipient[0]?.company
        }}</span>
      </div>

      <div class="w-56 shrink-0 relative group/emails text-center">
        <p class="text-xs font-bold text-gray-400 uppercase">Tiekėjo El. Paštas</p>
        <div class="flex items-center justify-center gap-1">
          <span class="text-sm font-medium text-blue-600">{{
            props.order.recipient[0].email
          }}</span>
          <span
            v-if="props.order.recipient.length > 1"
            class="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded-full font-bold"
          >
            +{{ props.order.recipient.length - 1 }}
          </span>
        </div>
        <div
          v-if="props.order.recipient.length > 1"
          class="absolute top-12 left-0 w-64 bg-slate-800 text-white p-3 rounded-lg shadow-xl z-50 invisible group-hover/emails:visible opacity-0 group-hover/emails:opacity-100 transition-all"
        >
          <p
            v-for="item of props.order.recipient"
            :key="item.email"
            class="py-0.5 border-b border-slate-700 last:border-0"
          >
            {{ item.email }}
          </p>
        </div>
      </div>
    </template>

    <div class="w-32 shrink-0 flex flex-col text-center">
      <p class="text-xs font-bold text-gray-400 uppercase">Pristatymo data</p>
      <div
        v-if="props.order.status"
        class="h-9 flex items-center justify-center rounded-lg font-bold tracking-wide"
        :class="[statusColor, dateColor]"
      >
        {{ props.order?.deliveryDate?.slice(0, 10) || "---------" }}
      </div>
      <div
        v-else
        class="h-9 flex items-center justify-center bg-stone-400 rounded-lg font-bold uppercase"
      >
        Baigta
      </div>
    </div>

    <div
      v-if="
        userStore.user?.accountType === 'Administratorius' ||
        userStore.user?.accountType === 'Vadybininkas'
      "
      @click.stop="deleteHandler"
      class="opacity-0 group-hover:opacity-100 absolute -left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md border border-red-100 hover:bg-red-500 hover:text-white transition-all cursor-pointer text-red-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      </svg>
    </div>
  </div>
</template>
