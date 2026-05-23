<script setup lang="ts">
const props = defineProps({
  location: {
    type: String as PropType<
      "archive" | "finished" | "unconfirmed" | "deleted" | "backup" | "production"
    >,
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
      @onChange="(value: string) => (searchValue = value)"
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
      v-if="location !== 'production'"
      v-for="(project, index) in filteredProjects"
      :key="project._id"
      :index="index"
      :length="filteredProjects.length"
      :project="project"
      :location="props.location"
    />
    <div v-else class="text-center text-black">
      <div v-for="(order, index) in archiveStore.data.production" :key="order._id" :index="index">
        <ArchiveProduction :order="order" :index="index" />
      </div>
    </div>
  </div>
</template>
