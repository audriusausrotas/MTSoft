<script setup lang="ts">
import { fetchArchive } from "~/utils/fetchData";
const route = useRoute();
const offer = await fetchArchive(route.params.id);
</script>
<template>
  <div class="flex flex-col gap-4">
    <PreviewClient :offer="offer" />
    <PreviewMain :offer="offer" />
  </div>
</template>
