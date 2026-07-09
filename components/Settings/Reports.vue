<script setup lang="ts">
import type { ReportSettings } from "~/data/interfaces";

const { setError, setSuccess } = useCustomError();
const settingsStore = useSettingsStore();

const newOpen = ref<boolean>(false);
const name = ref<string>("");
const keyword = ref<string>("");
const bends = ref<string>("");

const saveHandler = async () => {
  const requestData: ReportSettings = {
    name: name.value,
    keyword: keyword.value,
    bends: bends.value,
  };
  const response: any = await request.post("newReport", requestData);
  if (response.success) {
    !useSocketStore().connected && settingsStore.newReport(response.data);

    setSuccess(response.message);
    newOpen.value = false;
    name.value = "";
    keyword.value = "";
    bends.value = "";
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex flex-col gap-4 border-b pb-8 border-red-full">
    <div class="flex gap-4 flex-wrap">
      <BaseButton
        :name="newOpen ? 'išsaugoti' : 'pridėti naują'"
        @click="newOpen ? saveHandler() : (newOpen = true)"
      />
      <BaseInput
        v-if="newOpen"
        :name="name"
        @onChange="(value: string) => (name = value)"
        placeholder="Pavadinimas"
      />
      <BaseInput
        v-if="newOpen"
        :name="keyword"
        @onChange="(value: string) => (keyword = value)"
        placeholder="Raktinis žodis"
      />
      <BaseInput
        v-if="newOpen"
        :name="bends"
        @onChange="(value: string) => (bends = value)"
        placeholder="Lenkumų skaičius"
        type="number"
      />
    </div>
    <div class="flex gap-4 border py-2 rounded-md border-gray-300 bg-gray-300">
      <div class="w-12 pl-2">Nr.</div>
      <div class="w-60 pl-2">Pavadinimas</div>
      <div class="w-60 pl-2">Raktinis žodis</div>
      <div class="w-36 pl-2">Lenkumų skaičius</div>
      <div class="w-24 pl-2">Veiksmai</div>
    </div>
    <div class="flex flex-col gap-4">
      <SettingsReportElement
        v-for="(element, index) in settingsStore.reports"
        :key="element._id"
        :element="element"
        :index="index"
      />
    </div>
  </div>
</template>
<style scoped></style>
