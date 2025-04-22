<script setup lang="ts">
import { reactive, watchEffect } from "vue";

const props = defineProps(["accountType"]);
const { setError, setIsError } = useError();
const useSettings = useSettingsStore();

const editable = ref(false);
const rights = reactive({
  installation: false,
  production: false,
  schedule: false,
  project: false,
  admin: false,
  gate: false,
});

watchEffect(() => {
  const user = useSettings.userRights.find(
    (u) => u.accountType === props.accountType
  );

  if (user) {
    rights.installation = user.installation;
    rights.production = user.production;
    rights.schedule = user.schedule;
    rights.project = user.project;
    rights.admin = user.admin;
    rights.gate = user.gate;
  }
});

const saveHandler = async () => {
  const requestData = {
    accountType: props.accountType,
    ...rights,
  };

  const response: any = await request.post("newUserRights", requestData);

  if (response.success) {
    !useSocketStore().connected && useSettings.updateUserRights(response.data);
    editable.value = false;
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
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
        v-model="rights.project"
      />
    </div>
    <div class="w-24 flex justify-center">
      <input
        type="checkbox"
        class="w-5"
        :disabled="!editable"
        v-model="rights.schedule"
      />
    </div>
    <div class="w-24 flex justify-center">
      <input
        type="checkbox"
        class="w-5"
        :disabled="!editable"
        v-model="rights.production"
      />
    </div>
    <div class="w-24 flex justify-center">
      <input
        type="checkbox"
        class="w-5"
        :disabled="!editable"
        v-model="rights.installation"
      />
    </div>
    <div class="w-24 flex justify-center">
      <input
        type="checkbox"
        class="w-5"
        :disabled="!editable"
        v-model="rights.gate"
      />
    </div>
    <div class="w-24 flex justify-center">
      <input
        type="checkbox"
        class="w-5"
        :disabled="!editable"
        v-model="rights.admin"
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
