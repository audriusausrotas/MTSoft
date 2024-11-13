<script setup lang="ts">
import { v4 } from "uuid";

const props = defineProps(["data", "index"]);
const { setError, setIsError } = useError();
const useSettings = useSettingsStore();
const editable = ref<boolean>(false);

const saveHandler = async () => {
  const data: any = await $fetch("/api/selects", {
    method: "patch",
    body: {
      _id: props.data._id,
      values: useSettings.selects[props.index].values,
    },
  });
  if (data.success) {
    useSettings.updateSelect(props.index, data.data.values);
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
  editable.value = false;
};

const newHandler = () => {
  editable.value = true;
  useSettings.addSelectData(props.index);
};

const deleteHandler = async () => {
  const data: any = await $fetch("/api/selects", {
    method: "delete",
    body: { _id: props.data._id },
  });
  if (data.success) {
    useSettings.deleteSelect(props.index);
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
};
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex gap-2">
      <p class="font-semibold text-xl">{{ props.data.name }}:</p>
      <div class="flex gap-1 items-center">
        <NuxtImg
          @click="newHandler"
          src="/icons/plus.svg"
          alt="edit button"
          width="20"
          height="20"
          decoding="auto"
          :ismap="true"
          loading="lazy"
          class="hover:cursor-pointer hover:scale-125 transition-transform"
        />
        <NuxtImg
          v-if="!editable"
          @click="editable = true"
          src="/icons/edit.svg"
          alt="edit button"
          width="20"
          height="20"
          decoding="auto"
          :ismap="true"
          loading="lazy"
          class="hover:cursor-pointer hover:scale-125 transition-transform"
        />
        <NuxtImg
          v-else
          @click="saveHandler"
          width="20"
          height="20"
          src="/icons/save.svg"
          decoding="auto"
          loading="lazy"
          :ismap="true"
          class="hover:cursor-pointer hover:scale-125 transition-transform"
        />
        <NuxtImg
          @click="deleteHandler"
          src="/icons/delete.svg"
          alt="edit button"
          width="20"
          height="20"
          decoding="auto"
          :ismap="true"
          loading="lazy"
          class="hover:cursor-pointer hover:scale-125 transition-transform"
        />
      </div>
    </div>
    <div class="flex gap-4 flex-wrap">
      <SettingsSelectsElementValue
        v-for="(value, i) in props.data.values"
        :key="v4()"
        :value="value"
        :index="props.index"
        :editable="editable"
        :valueIndex="i"
        :_id="props.data._id"
      />
    </div>
  </div>
</template>
<style scoped></style>
