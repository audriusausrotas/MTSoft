<script setup lang="ts">
import { OffersStatus } from "~/data/selectFieldData";

const props = defineProps(["index", "client"]);
const { setError, setIsError } = useError();
const potentialClientsStore = usePotentialClientsStore();

const editable = ref<boolean>(false);
const name = ref<string>(props.client.name);
const email = ref<string>(props.client.email);
const phone = ref<string>(props.client.phone);
const address = ref<string>(props.client.address);
const status = ref<string>(props.client.status);

const deleteHandler = async () => {
  const response: any = await request.delete(`deletePotentialClient/${props.client._id}`);

  if (response.success) {
    !useSocketStore().connected && potentialClientsStore.deletePotentialClient(response.data._id);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const saveHandler = async () => {
  const client = {
    _id: props.client._id,
    name: name.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
    status: status.value,
  };

  const response: any = await request.patch("updateClient", client);

  if (response.success) {
    !useSocketStore().connected && potentialClientsStore.updatePotentialClients(response.data);
    setIsError(false);
    setError(response.message);
    editable.value = false;
  } else {
    setError(response.message);
  }
};

watch(
  () => props.client,
  (client) => {
    name.value = client.name;
    email.value = client.email;
    phone.value = client.phone;
    address.value = client.address;
    status.value = client.status;
  },
  { deep: true }
);
</script>

<template>
  <div
    class="flex w-fit border-b gap-4 items-center px-2 py-1 border"
    :class="[
      editable ? ' border-green-500 rounded-lg ' : 'border-transparent border-b-dark-light',
      props.client.status === 'Domina'
        ? 'bg-green-100'
        : props.client.status === 'Nelabai domina'
        ? 'bg-orange-100'
        : props.client.status === 'Nedomina'
        ? 'bg-red-100'
        : '',
    ]"
  >
    <p class="w-6">{{ props.index + 1 }}</p>
    <input type="text" v-model="name" class="w-48" :disabled="!editable" />
    <input type="text" v-model="email" class="w-60" :disabled="!editable" />
    <input type="text" v-model="phone" class="w-28" :disabled="!editable" />
    <input type="text" v-model="address" class="w-60" :disabled="!editable" />

    <BaseSelectField
      :values="OffersStatus"
      :defaultValue="status"
      :disable="!editable"
      @onChange="(value) => (status = value)"
    />

    <div class="w-6 hover:cursor-pointer hover:scale-150 transition-transform">
      <NuxtImg
        v-if="!editable"
        @click="editable = true"
        src="/icons/edit.svg"
        width="20"
        height="20"
        decoding="auto"
        :ismap="true"
        loading="lazy"
      />
      <NuxtImg
        v-else
        @click="saveHandler"
        src="/icons/save.svg"
        width="20"
        height="20"
        decoding="auto"
        :ismap="true"
        loading="lazy"
      />
    </div>
    <div
      @click="deleteHandler"
      class="w-6 hover:cursor-pointer hover:scale-150 transition-transform"
    >
      <NuxtImg
        src="/icons/delete.svg"
        width="20"
        height="20"
        decoding="auto"
        :ismap="true"
        loading="lazy"
      />
    </div>
  </div>
</template>
<style scoped></style>
