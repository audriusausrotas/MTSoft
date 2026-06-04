<script setup lang="ts">
import { RALcolors } from "~/data/initialValues";

const props = defineProps(["job", "isAdmin", "worker"]);
const emit = defineEmits(["onDelete"]);
const router = useRouter();
const userStore = useUserStore();
const productionStore = useProductionStore();

type RALColorCode = keyof typeof RALcolors;

const menuOpen = ref<boolean>(false);

const status = computed(() => {
  if (props.worker.accountType !== "Gamyba") return null;

  const project = productionStore.production.find((item) => item._id === props.job._id);

  if (!project) return null;

  return project.status === "Gaminama"
    ? "bg-green-700 text-white"
    : project.status === "Laukiama"
      ? "bg-orange-500 text-white"
      : project.status === "Negaminti"
        ? " bg-red-600 text-white"
        : project.status === "Pagaminta"
          ? "bg-violet-600 text-white"
          : "bg-white text-black ";
});

const RALcolor = computed(() => RALcolors[props.job.color as RALColorCode] || "#000000");

const deleteHandler = () => {
  emit("onDelete", props.job._id);
};
</script>

<template>
  <div
    @click="
      props.isAdmin
        ? (menuOpen = true)
        : userStore.user?.accountType === 'Gamyba' || userStore.user?.accountType === 'Sandėlys'
          ? router.push(`/gamyba/${props.job._id}`)
          : router.push(`/montavimas/${props.job._id}`)
    "
    class="hover:cursor-pointer flex items-center text-sm h-full last:border-b-0 border-b border-white"
  >
    <div
      v-if="props.job?.orderNumber"
      :class="`bg-[${RALcolor}]   flex items-center justify-center  h-full w-[88px]  ${RALcolor === '#000000' ? 'text-black bg-white border-black border font-medium' : 'text-white'} `"
    >
      {{ props.job?.orderNumber }} {{ props.job?.manufacturer?.slice(0, 1) }}
    </div>
    <div :class="`${status} ${!status ? '  bg-gray-300 font-medium' : ''} p-1 flex-1 `">
      {{ props.job?.address }}
    </div>
  </div>
  <div
    v-if="menuOpen"
    class="absolute left-0 top-0 z-30 h-full bg-gray-600 overflow-hidden w-full flex flex-col"
  >
    <NuxtLink
      :to="
        userStore.user?.accountType === 'Administratorius' ||
        userStore.user?.accountType === 'Vadybininkas'
          ? `/perziura/${props.job._id}`
          : `/montavimas/${props.job._id}`
      "
      class="hover:cursor-pointer hover:bg-red-600 text-white p-0.5"
    >
      Atidaryti projektą
    </NuxtLink>
    <NuxtLink
      v-if="
        userStore.user?.accountType === 'Administratorius' ||
        userStore.user?.accountType === 'Vadybininkas'
      "
      :to="`/gamyba/${props.job._id}`"
      class="hover:cursor-pointer hover:bg-red-600 text-white p-0.5"
    >
      Atidaryti gamybą
    </NuxtLink>
    <div class="hover:cursor-pointer hover:bg-red-600 text-white p-0.5" @click="deleteHandler">
      Ištrinti darbą
    </div>
    <div
      class="absolute top-0 right-0 hover:cursor-pointer hover:scale-105 transition-transform text-white h-7 w-7 flex items-center justify-center rounded-md bg-red-600 border"
      @click="menuOpen = false"
    >
      X
    </div>
  </div>
</template>

<style scoped></style>
