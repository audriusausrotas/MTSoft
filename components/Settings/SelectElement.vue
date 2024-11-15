<script setup lang="ts">
const { setError, setIsError } = useError();
const props = defineProps(["data", "field", "name"]);
const useSettings = useSettingsStore();

const editable = ref<boolean>(false);
const values = ref<string[]>([...props.data]);

const clickHandler = () => {
  //   useSettings.changeDefaultValue(value.name, props.field);
};

const saveHandler = async () => {
  //   const response: any = await $fetch("/api/defaultValues", {
  //     method: "post",
  //     body: { value: props.value, field: props.field },
  //   });
  //   if (response.success) {
  //     editable.value = false;
  //     setIsError(false);
  //     setError(response.message);
  //   } else {
  //     setError(response.message);
  //   }
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 items-center">
      <BaseInfoField width="w-96" :name="props.name" />
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
      <div v-else class="flex gap-2">
        <NuxtImg
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
          @click="saveHandler"
          width="20"
          height="20"
          src="/icons/plus.svg"
          decoding="auto"
          loading="lazy"
          :ismap="true"
          class="hover:cursor-pointer hover:scale-125 transition-transform"
        />
      </div>
    </div>
    <div class="flex gap-4 flex-wrap">
      <SettingsSelectElementValue
        v-for="(value, index) in values"
        :key="value"
        :editable="editable"
        :index="index"
        :value="value"
      />
    </div>
  </div>
</template>
<style scoped></style>
