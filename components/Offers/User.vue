<script setup lang="ts">
import type { PotentialClient } from "~/data/interfaces";
import { OffersStatus } from "~/data/selectFieldData";

const props = defineProps(["index", "client"]);
const { setError, setSuccess } = useError();
const potentialClientsStore = usePotentialClientsStore();

const editable = ref<boolean>(false);
const name = ref<string>(props.client.name);
const email = ref<string>(props.client.email);
const phone = ref<string>(props.client.phone);
const address = ref<string>(props.client.address);
const status = ref<string>(props.client.status);
const open = ref<boolean>(false);
const input = ref<string>(props.client.comment);

if (props.client.name === "testas") console.log(props.client);

const deleteHandler = async () => {
  const response: any = await request.delete(
    `deletePotentialClient/${props.client._id}`
  );

  if (response.success) {
    !useSocketStore().connected &&
      potentialClientsStore.deletePotentialClient(response.data._id);

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const saveHandler = async () => {
  const client: PotentialClient = {
    _id: props.client._id,
    name: name.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
    status: status.value,
    comment: input.value,
    send: false,
  };

  const response: any = await request.patch("updateClient", client);

  if (response.success) {
    !useSocketStore().connected &&
      potentialClientsStore.updatePotentialClients(response.data);

    setSuccess(response.message);
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
    class="flex flex-col px-2"
    :class="[
      editable ? ' border-green-500 rounded-lg ' : '',
      props.client.status === 'Domina'
        ? 'bg-green-100'
        : props.client.status === 'Nelabai domina'
        ? 'bg-orange-100'
        : props.client.status === 'Nedomina'
        ? 'bg-red-100'
        : '',
    ]"
  >
    <div
      class="flex w-fit gap-4 items-center px-2 py-1 border-gray-300"
      :class="open ? 'border-b ' : ''"
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

      <div
        @click="open = !open"
        class="hover:cursor-pointer select-none flex gap-1 items-center justify-center rotate"
      >
        <p>Komentarai</p>
        <NuxtImg
          src="/icons/arrowDown.svg"
          width="12"
          height="12"
          decoding="auto"
          :ismap="true"
          loading="lazy"
          :class="open ? 'rotate-180' : ''"
        />
      </div>

      <div
        class="w-6 hover:cursor-pointer hover:scale-150 transition-transform"
      >
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
    <input
      v-if="open"
      placeholder="Komentaras"
      :type="'text'"
      class="px-2 py-1 outline-none w-full"
      v-model="input"
      :disabled="!editable"
    />
  </div>
</template>
<style scoped></style>
