<script setup lang="ts">
import { v4 } from "uuid";
const useSettings = useSettingsStore();
const { setError, setIsError } = useError();

const open = ref<boolean>(false);
const name = ref<string>("");

const newHandler = async () => {
  const data: any = await $fetch("/api/selects", {
    method: "post",
    body: { name: name.value },
  });
  if (data.success) {
    useSettings.addSelect(data.data);
    name.value = "";
    open.value = false;
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
};
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex gap-4 items-end">
      <BaseInput
        v-if="open"
        variant="light"
        placeholder="Pavadinimas"
        :name="name"
        @onChange="(value: string)=> (name = value)"
      />
      <BaseButton
        :name="open ? 'Išsaugoti' : 'Pridėti naują'"
        @click="open ? newHandler() : (open = true)"
      />
    </div>
    <SettingsSelectsElement
      v-for="(data, index) in useSettings.selects"
      :key="v4()"
      :data="data"
      :index="index"
    />
  </div>
</template>
<style scoped></style>
