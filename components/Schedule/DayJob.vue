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
        ? " bg-red-700 text-white"
        : project.status === "Pagaminta"
          ? "bg-violet-700 text-white"
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
    class="hover:cursor-pointer hover:scale-[1.02] transition-transform flex p-0.5 items-center gap-0.5 text-sm h-full"
  >
    <div
      v-if="props.job?.orderNumber"
      :class="`bg-[${RALcolor}]  p-1 flex items-center rounded h-full  ${RALcolor === '#000000' ? 'text-black border-black border font-medium' : 'text-white'} `"
    >
      {{ props.job?.orderNumber }}
    </div>
    <div :class="`${status} p-1 rounded flex-1`">
      {{ props.job?.address }}
    </div>
  </div>
  <div
    v-if="menuOpen"
    class="absolute left-0 top-0 z-30 h-full bg-blue-600 border overflow-hidden border-stone-500 w-full"
  >
    <NuxtLink
      :to="
        userStore.user?.accountType === 'Administratorius' ||
        userStore.user?.accountType === 'Vadybininkas'
          ? `/perziura/${props.job._id}`
          : `/montavimas/${props.job._id}`
      "
      class="hover:cursor-pointer hover:bg-red-600 text-white w-full block"
    >
      Atidaryti projektą
    </NuxtLink>
    <NuxtLink
      v-if="
        userStore.user?.accountType === 'Administratorius' ||
        userStore.user?.accountType === 'Vadybininkas'
      "
      :to="`/gamyba/${props.job._id}`"
      class="hover:cursor-pointer hover:bg-red-600 text-white w-full block"
    >
      Atidaryti gamybą
    </NuxtLink>
    <div class="hover:cursor-pointer hover:bg-red-600 text-white" @click="deleteHandler">
      Ištrinti projektą
    </div>
    <div class="hover:cursor-pointer hover:bg-red-600 text-white" @click="menuOpen = false">
      Uždaryti meniu
    </div>
  </div>
</template>

<style scoped></style>
