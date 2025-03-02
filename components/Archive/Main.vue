<script setup lang="ts">
const props = defineProps(["data", "location"]);
const useArchives = useArchivesStore();

const searchArchive = (value: string) => {
  useArchives.searchArchive(value, props.location);
};
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <BaseInput
      placeholder="Paieška"
      width="w-full max-w-[1160px]"
      variant="light"
      @onChange="(value: string): void => searchArchive(value)"
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
      v-for="(project, index) in props.data"
      :key="project._id"
      :index="index"
      :length="props.data.length"
      :project="project"
      :location="props.location"
    />
  </div>
</template>
<style scoped></style>
