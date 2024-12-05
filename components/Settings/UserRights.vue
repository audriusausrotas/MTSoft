<script setup lang="ts">
const { setError, setIsError } = useError();
const installationBox = ref<boolean>(false);
const props = defineProps(["accountType"]);
const productionBox = ref<boolean>(false);
const scheduleBox = ref<boolean>(false);
const projectBox = ref<boolean>(false);
const editable = ref<boolean>(false);
const adminBox = ref<boolean>(false);
const gateBox = ref<boolean>(false);

const saveHandler = async () => {
  const data = {
    accountType: props.accountType,
    project: projectBox.value,
    schedule: scheduleBox.value,
    production: productionBox.value,
    installation: installationBox.value,
    gate: gateBox.value,
    admin: adminBox.value,
  };

  const response: any = $fetch("/api/userRights", {
    method: "post",
    body: data,
  });
  if (response.success) {
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }

  editable.value = false;
};
</script>

<template>
  <div class="flex gap-4">
    <div class="w-48">{{ props.accountType }}</div>
    <div class="w-24 flex justify-center">
      <input
        type="checkbox"
        class="w-5"
        :disabled="!editable"
        v-model="projectBox"
      />
    </div>
    <div class="w-24 flex justify-center">
      <input
        type="checkbox"
        class="w-5"
        :disabled="!editable"
        v-model="scheduleBox"
      />
    </div>
    <div class="w-24 flex justify-center">
      <input
        type="checkbox"
        class="w-5"
        :disabled="!editable"
        v-model="productionBox"
      />
    </div>
    <div class="w-24 flex justify-center">
      <input
        type="checkbox"
        class="w-5"
        :disabled="!editable"
        v-model="installationBox"
      />
    </div>
    <div class="w-24 flex justify-center">
      <input
        type="checkbox"
        class="w-5"
        :disabled="!editable"
        v-model="gateBox"
      />
    </div>
    <div class="w-24 flex justify-center">
      <input
        type="checkbox"
        class="w-5"
        :disabled="!editable"
        v-model="adminBox"
      />
    </div>
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
  </div>
</template>
<style scoped></style>
