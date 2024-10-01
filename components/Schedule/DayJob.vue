<script setup lang="ts">
const props = defineProps(["job", "isAdmin"]);
const emit = defineEmits(["onDelete"]);
const router = useRouter();
const useUser = useUserStore();

const menuOpen = ref<boolean>(false);

const deleteHandler = () => {
  emit("onDelete", props.job._id);
};
</script>

<template>
  <div
    @click="
      props.isAdmin
        ? (menuOpen = true)
        : useUser.user?.accountType === 'Gamyba'
        ? router.push(`/gamyba/${props.job._id}`)
        : router.push(`/montavimas/${props.job._id}`)
    "
    class="hover:cursor-pointer hover:bg-red-600 hover:text-white"
  >
    {{ props.job.address }}
  </div>
  <div
    v-if="menuOpen"
    class="absolute left-0 z-50 bg-blue-600 border overflow-hidden border-stone-500 w-full h-fit"
  >
    <NuxtLink
      :to="
        useUser.user?.accountType === 'Administratorius'
          ? `/perziura/${props.job._id}`
          : `/montavimas/${props.job._id}`
      "
      class="hover:cursor-pointer hover:bg-red-600 text-white w-full block"
    >
      Atidaryti darbą
    </NuxtLink>
    <div
      class="hover:cursor-pointer hover:bg-red-600 text-white"
      @click="deleteHandler"
    >
      Ištrinti darbą
    </div>
    <div
      class="hover:cursor-pointer hover:bg-red-600 text-white"
      @click="menuOpen = false"
    >
      Uždaryti meniu
    </div>
  </div>
</template>

<style scoped></style>
