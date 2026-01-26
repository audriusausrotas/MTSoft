<script setup lang="ts">
const props = defineProps(["job", "isAdmin", "worker"]);
const emit = defineEmits(["onDelete"]);
const router = useRouter();
const userStore = useUserStore();
const productionStore = useProductionStore();

const menuOpen = ref<boolean>(false);

const status = computed(() => {
  if (props.worker.accountType !== "Gamyba") return null;

  const project = productionStore.production.find((item) => item._id === props.job._id);

  if (!project) return null;

  return project.status === "Gaminama"
    ? "bg-green-500"
    : project.status === "Laukiama"
      ? "bg-orange-500"
      : project.status === "Negaminti"
        ? " bg-red-600"
        : project.status === "Pagaminta"
          ? "bg-violet-500"
          : "bg-black";
});

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
    class="hover:cursor-pointer hover:bg-red-600 hover:text-white flex justify-center items-center gap-1"
  >
    <div v-if="status" class="w-2 h-2 rounded-full" :class="status"></div>
    <div>
      {{ props.job.address }}
    </div>
  </div>
  <div
    v-if="menuOpen"
    class="absolute left-0 z-30 bg-blue-600 border overflow-hidden border-stone-500 w-full h-fit"
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
      Atidaryti darbą
    </NuxtLink>
    <div class="hover:cursor-pointer hover:bg-red-600 text-white" @click="deleteHandler">
      Ištrinti darbą
    </div>
    <div class="hover:cursor-pointer hover:bg-red-600 text-white" @click="menuOpen = false">
      Uždaryti meniu
    </div>
  </div>
</template>

<style scoped></style>
