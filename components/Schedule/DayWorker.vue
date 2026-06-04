<script setup lang="ts">
import type { Job, Production, Project } from "~/data/interfaces";

const props = defineProps(["worker", "date", "isToday", "isWeekend"]);

const { setError, setSuccess } = useCustomError();

const projectsStore = useProjectsStore();
const scheduleStore = useScheduleStore();
const productionStore = useProductionStore();
const userStore = useUserStore();

const schedule = computed(() =>
  scheduleStore.getScheduleByWorkerAndDate(props.worker._id, props.date),
);

const commentModalOpen = ref<boolean>(false);
const modalOpen = ref<boolean>(false);
const menuOpen = ref<boolean>(false);
const canSave = ref<boolean>(false);
const selectedJobs = ref<Job[]>(schedule.value?.jobs || []);
const comment = ref<string>(schedule.value?.comment || "");

const isAdmin =
  userStore.user?.accountType === "Administratorius" ||
  userStore.user?.accountType === "Vadybininkas";

const newWorkHandler = () => {
  modalOpen.value = true;
  menuOpen.value = false;
};

const newCommentHandler = () => {
  comment.value = "";
  commentModalOpen.value = true;
  menuOpen.value = false;
};

const selectHandler = (value: Production | Project) => {
  modalOpen.value = false;

  selectedJobs.value.push({
    _id: value._id!,
    address: value.client.address,
    orderNumber: value.orderNumber,
    color:
      (value as Production)?.fences?.[0]?.color ||
      (value as Production)?.bindings?.[0]?.color ||
      (value as Project)?.fenceMeasures?.[0]?.color ||
      "#000",
    manufacturer:
      (value as Production)?.fences?.[0]?.manufacturer ||
      (value as Project)?.fenceMeasures?.[0]?.manufacturer ||
      "",
  });
  canSave.value = true;
};

const deleteHandler = (id: string) => {
  selectedJobs.value = selectedJobs.value.filter((job) => job._id !== id);
  canSave.value = true;
};

const commentDeleteHandler = () => {
  comment.value = "";
  menuOpen.value = false;
  canSave.value = true;
};

const cancelHandler = () => {
  commentModalOpen.value = false;
  canSave.value = true;
};

const saveHandler = async () => {
  const requestData = {
    date: props.date,
    comment: comment.value,
    selectedJobs: selectedJobs.value,
    worker: { _id: props.worker._id, lastName: props.worker.lastName },
  };

  const response: any = await request.post("addSchedule", requestData);

  if (response.success) {
    !useSocketStore().connected && scheduleStore.addSchedule(response.data);
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
  canSave.value = false;
};

watch(
  schedule,
  (newVal) => {
    selectedJobs.value = newVal?.jobs || [];
    comment.value = newVal?.comment || "";
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <div
    :class="
      props.isToday(props.date)
        ? 'bg-green-400'
        : props.isWeekend(props.date)
          ? 'bg-red-300'
          : 'bg-white'
    "
    class="relative flex-1 flex flex-col justify-start"
  >
    <NuxtImg
      v-if="isAdmin"
      @click="menuOpen = !menuOpen"
      src="/icons/hamburger.svg"
      width="23"
      height="23"
      decoding="auto"
      loading="lazy"
      :ismap="true"
      class="hover:cursor-pointer absolute top-[1.8px] right-[1px] bg-white z-30 rounded hover:scale-110"
    />
    <NuxtImg
      v-if="isAdmin && canSave"
      @click="saveHandler"
      src="/icons/save.svg"
      width="23"
      height="23"
      decoding="auto"
      loading="lazy"
      :ismap="true"
      class="hover:cursor-pointer absolute bottom-[1.8px] right-[1px] bg-white z-40 rounded p-0.5 hover:scale-110"
    />

    <p
      v-if="!commentModalOpen && comment"
      class="items-center flex justify-center text-sm font-medium h-[28px] bg-gray-300 border-b border-white"
    >
      {{ comment }}
    </p>

    <div v-if="menuOpen" class="absolute top-0 left-0 w-full h-full bg-gray-600 z-30 text-white">
      <div
        v-if="isAdmin"
        @click="newWorkHandler"
        class="hover:cursor-pointer hover:bg-red-600 hover:text-white p-0.5"
      >
        Pridėti darbą
      </div>
      <div
        v-if="isAdmin"
        @click="newCommentHandler"
        class="hover:cursor-pointer hover:bg-red-600 hover:text-white p-0.5"
      >
        Pridėti komentarą
      </div>
      <div
        v-if="isAdmin && comment !== ''"
        @click="commentDeleteHandler"
        class="hover:cursor-pointer hover:bg-red-600 hover:text-white p-0.5"
      >
        Ištrinti komentarą
      </div>
      <div
        class="absolute top-0 right-0 hover:cursor-pointer hover:scale-105 transition-transform text-white h-7 w-7 flex items-center justify-center rounded-md bg-red-600 border"
        @click="menuOpen = false"
      >
        X
      </div>
    </div>

    <div class="flex flex-col">
      <ScheduleDayJob
        v-if="selectedJobs.length > 0"
        v-for="job in selectedJobs"
        :key="job._id"
        :job="job"
        :isAdmin="isAdmin"
        @onDelete="deleteHandler"
        :worker="props.worker"
      />
    </div>

    <div
      v-if="commentModalOpen"
      class="bg-gray-600 absolute top-0 left-0 w-full h-full flex flex-col placeholder-white text-white"
    >
      <div class="bg-white text-black">
        <input type="text" placeholder="Komentaras" v-model="comment" class="w-full p-1" />
      </div>
      <div class="flex">
        <div
          @click="cancelHandler"
          class="hover:cursor-pointer p-1 flex-1 hover:bg-red-600 hover:text-white"
        >
          Uždaryti
        </div>
      </div>
    </div>

    <div v-if="modalOpen" class="absolute top-0 left-0 w-full bg-white min-w-96 z-40 rounded-lg">
      <BaseSearchFieldProduction
        width="w-full"
        :data="
          props.worker.accountType === 'Gamyba'
            ? productionStore.production
            : projectsStore.projects
        "
        @modalClose="modalOpen = false"
        @onClick="selectHandler"
      />
    </div>
  </div>
</template>

<style scoped></style>
