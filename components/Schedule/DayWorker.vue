<script setup lang="ts">
import type { Project, Job } from "~/data/interfaces";

const props = defineProps(["worker", "date", "isToday", "isWeekend"]);

const { setError, setIsError } = useError();

const useProjects = useProjectsStore();
const useSchedule = useScheduleStore();
const useGamyba = useGamybaStore();
const useUser = useUserStore();

const commentModalOpen = ref<boolean>(false);
const modalOpen = ref<boolean>(false);
const menuOpen = ref<boolean>(false);
const canSave = ref<boolean>(false);
const selectedJobs = ref<Job[]>([]);
const searchValue = ref<string>("");
const comment = ref<string>("");
const isAdmin = useUser.user?.accountType === "Administratorius";

const loadSelectedJobs = () => {
  const scheduleItem = useSchedule.schedule.find((schedule) => {
    return (
      schedule.worker._id === props.worker._id &&
      new Date(schedule.date).toISOString() ===
        new Date(props.date).toISOString()
    );
  });

  selectedJobs.value = scheduleItem ? scheduleItem.jobs : [];
  comment.value = scheduleItem ? scheduleItem.comment : "";
};

loadSelectedJobs();

const newWorkHandler = () => {
  modalOpen.value = true;
  menuOpen.value = false;
};

const newCommentHandler = () => {
  comment.value = "";
  commentModalOpen.value = true;
  menuOpen.value = false;
};

const selectHandler = (value: Project) => {
  modalOpen.value = false;
  selectedJobs.value.push({ _id: value._id, address: value.client.address });
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
  const data = {
    date: props.date,
    comment: comment.value,
    selectedJobs: selectedJobs.value,
    worker: { _id: props.worker._id, lastName: props.worker.lastName },
  };

  const response: any = await $fetch("/api/schedule", {
    method: "post",
    body: data,
  });
  if (response.success) {
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
  canSave.value = false;
};
</script>

<template>
  <div
    :class="
      props.isToday(props.date)
        ? 'bg-green-400'
        : props.isWeekend(props.date)
        ? 'bg-red-300'
        : 'bg-stone-100'
    "
    class="border relative flex-1 rounded-md flex flex-col border-stone-500 justify-start"
  >
    <NuxtImg
      v-if="isAdmin"
      @click="menuOpen = !menuOpen"
      src="/icons/hamburger.svg"
      width="20"
      height="20"
      decoding="auto"
      loading="lazy"
      :ismap="true"
      class="hover:cursor-pointer absolute top-0.5 right-0.5 bg-inherit z-30 rounded-sm"
    />
    <NuxtImg
      v-if="isAdmin && canSave"
      @click="saveHandler"
      src="/icons/save.svg"
      width="20"
      height="20"
      decoding="auto"
      loading="lazy"
      :ismap="true"
      class="hover:cursor-pointer absolute top-0.5 left-0.5 bg-inherit z-30 rounded-sm"
    />

    <p v-if="!commentModalOpen">{{ comment }}</p>

    <div
      v-if="menuOpen"
      class="absolute top-0 left-0 w-full h-full bg-blue-600 z-20 text-white"
    >
      <div
        v-if="isAdmin"
        @click="newWorkHandler"
        class="hover:cursor-pointer hover:bg-red-600 hover:text-white"
      >
        Pridėti darbą
      </div>
      <div
        v-if="isAdmin"
        @click="newCommentHandler"
        class="hover:cursor-pointer hover:bg-red-600 hover:text-white"
      >
        Pridėti komentarą
      </div>
      <div
        v-if="isAdmin && comment !== ''"
        @click="commentDeleteHandler"
        class="hover:cursor-pointer hover:bg-red-600 hover:text-white"
      >
        Ištrinti komentarą
      </div>
    </div>

    <div
      v-if="selectedJobs.length > 0"
      v-for="job in selectedJobs"
      :key="job._id"
      class="relative"
    >
      <ScheduleDayJob :job="job" :isAdmin="isAdmin" @onDelete="deleteHandler" />
    </div>

    <div
      v-if="commentModalOpen"
      class="bg-blue-600 absolute top-0 left-0 w-full h-full flex flex-col justify-end placeholder-white text-white"
    >
      <div class="border-y border-white">
        <input
          type="text"
          placeholder="Komentaras"
          v-model="comment"
          class="w-full p-1"
        />
      </div>
      <div class="flex justify">
        <div
          @click="cancelHandler"
          class="hover:cursor-pointer p-1 flex-1 bg-green-600 hover:bg-red-600 hover:text-white"
        >
          Uždaryti
        </div>
      </div>
    </div>

    <div
      v-if="modalOpen"
      class="absolute top-0 left-0 w-full bg-white min-w-96 z-40 rounded-lg"
    >
      <BaseSearchFieldProduction
        width="w-full"
        :data="
          props.worker.accountType === 'Gamyba'
            ? useGamyba.gamybaList
            : useProjects.projects
        "
        :name="searchValue"
        @onChange="(value) => (searchValue = value)"
        @modalClose="modalOpen = false"
        @onClick="selectHandler"
      />
    </div>
  </div>
</template>

<style scoped></style>
