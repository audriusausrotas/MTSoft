<script setup lang="ts">
import type { Project } from "~/data/interfaces";

const props = defineProps(["worker", "date", "isToday", "isWeekend"]);

const useProjects = useProjectsStore();
const useUser = useUserStore();

const selectedProject = ref<Project[]>([]);
const modalOpen = ref<boolean>(false);
const commentModalOpen = ref<boolean>(false);
const menuOpen = ref<boolean>(false);
const searchValue = ref<string>("");
const comment = ref<string>("");
const isAdmin = useUser.user?.accountType === "Administratorius";

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
  selectedProject.value.push(value);
};

const deleteHandler = (id: string) => {
  selectedProject.value = selectedProject.value.filter((project) => project._id !== id);
};

const commentDeleteHandler = () => {
  comment.value = "";
  menuOpen.value = false;
};

const cancelHandler = () => {
  commentModalOpen.value = false;
  comment.value = "";
};

const saveHandler = () => {
  commentModalOpen.value = false;
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
      class="hover:cursor-pointer absolute top-0.5 right-0.5 bg-inherit z-40 rounded-sm"
    />

    <p v-if="!commentModalOpen">{{ comment }}</p>

    <div v-if="menuOpen" class="absolute top-0 left-0 w-full h-full bg-blue-600 z-30 text-white">
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
      v-if="selectedProject.length > 0"
      v-for="project in selectedProject"
      :key="project._id"
      class="relative"
    >
      <ScheduleDayJob :project="project" :isAdmin="isAdmin" @onDelete="deleteHandler" />
    </div>

    <div
      v-if="commentModalOpen"
      class="bg-blue-600 absolute top-0 left-0 w-full h-full flex flex-col justify-end placeholder-white text-white"
    >
      <div class="border-y border-white">
        <input type="text" placeholder="Komentaras" v-model="comment" class="w-full p-1" />
      </div>
      <div class="flex justify">
        <div
          @click="saveHandler"
          class="hover:cursor-pointer p-1 flex-1 bg-green-600 hover:bg-red-600 hover:text-white"
        >
          Išsaugoti
        </div>
        <div
          @click="cancelHandler"
          class="flex items-center justify-center bg-red-400 w-8 hover:cursor-pointer hover:bg-red-600 hover:text-white"
        >
          X
        </div>
      </div>
    </div>

    <div v-if="modalOpen" class="absolute top-0 left-0 w-full min-w-96 z-50 rounded-lg">
      <BaseSearchFieldProduction
        width="w-full"
        :data="useProjects.projects"
        :name="searchValue"
        @onChange="(value) => (searchValue = value)"
        @modalClose="modalOpen = false"
        @onClick="selectHandler"
      />
    </div>
  </div>
</template>

<style scoped></style>
