<script setup lang="ts">
const props = defineProps({
  location: {
    type: String as PropType<"archive" | "unconfirmed" | "deleted" | "backup">,
    required: true,
  },
});
const archiveStore = useArchiveStore();

const searchValue = ref("");

const filteredProjects = computed(() => {
  return searchValue.value.length > 2
    ? archiveStore.searchArchive(props.location, searchValue.value)
    : archiveStore.data[props.location];
});
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <BaseInput
      placeholder="Paieška"
      width="w-full"
      variant="light"
      :name="searchValue"
      @onChange="(value:string)=> searchValue = value"
    >
      <NuxtImg
        src="/icons/search.svg"
        width="14"
        height="14"
        alt="search icon"
        decoding="auto"
        loading="lazy"
        :ismap="true"
      />
    </BaseInput>

    <HomeProject
      v-for="(project, index) in filteredProjects"
      :key="project._id"
      :index="index"
      :length="filteredProjects.length"
      :project="project"
      :location="props.location"
    />
  </div>
</template>
