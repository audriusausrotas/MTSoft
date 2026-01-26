<script setup lang="ts">
import { reactive, watchEffect } from "vue";

const props = defineProps(["accountType"]);
const { setError, setSuccess } = useError();
const settingsStore = useSettingsStore();

const editable = ref(false);

const rights = reactive({
  installation: false,
  production: false,
  warehouse: false,
  schedule: false,
  project: false,
  orders: false,
  admin: false,
  other: false,
});

const saveHandler = async () => {
  const requestData = {
    accountType: props.accountType,
    ...rights,
  };

  const response: any = await request.post("newUserRights", requestData);

  if (response.success) {
    !useSocketStore().connected && settingsStore.updateUserRights(response.data);
    editable.value = false;
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

watchEffect(() => {
  const user = settingsStore.userRights.find((u) => u.accountType === props.accountType);

  if (user) {
    rights.installation = user.installation;
    rights.production = user.production;
    rights.warehouse = user.warehouse;
    rights.schedule = user.schedule;
    rights.project = user.project;
    rights.orders = user.orders;
    rights.admin = user.admin;
    rights.other = user.other;
  }
});
</script>

<template>
  <div class="flex gap-4">
    <div class="w-48">{{ props.accountType }}</div>
    <div class="w-28 flex justify-center">
      <input type="checkbox" class="w-5" :disabled="!editable" v-model="rights.project" />
    </div>
    <div class="w-28 flex justify-center">
      <input type="checkbox" class="w-5" :disabled="!editable" v-model="rights.schedule" />
    </div>
    <div class="w-28 flex justify-center">
      <input type="checkbox" class="w-5" :disabled="!editable" v-model="rights.production" />
    </div>
    <div class="w-28 flex justify-center">
      <input type="checkbox" class="w-5" :disabled="!editable" v-model="rights.installation" />
    </div>
    <div class="w-28 flex justify-center">
      <input type="checkbox" class="w-5" :disabled="!editable" v-model="rights.warehouse" />
    </div>
    <div class="w-28 flex justify-center">
      <input type="checkbox" class="w-5" :disabled="!editable" v-model="rights.orders" />
    </div>
    <div class="w-28 flex justify-center">
      <input type="checkbox" class="w-5" :disabled="!editable" v-model="rights.other" />
    </div>
    <div class="w-28 flex justify-center">
      <input type="checkbox" class="w-5" :disabled="!editable" v-model="rights.admin" />
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
