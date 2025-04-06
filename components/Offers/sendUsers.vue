<script setup lang="ts">
const props = defineProps(["index", "client"]);
const usePotentialClients = usePotentialClientsStore();
const { setError, setIsError } = useError();

const updateHandler = async (value: boolean) => {
  const requestData = { _id: props.client._id, all: false, send: value };

  const response: any = await request.patch("selectClients", requestData);

  if (response.success) {
    !useSocketStore().connected && usePotentialClients.updatePotentialClients(response.data);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div
    class="flex w-fit border-b border-black gap-4 items-center px-2 py-1"
    :class="
      props.client.status === 'Domina'
        ? 'bg-green-100'
        : props.client.status === 'Nelabai domina'
        ? 'bg-orange-100'
        : props.client.status === 'Nedomina'
        ? 'bg-red-100'
        : ''
    "
  >
    <BaseCheckField height="h-4" :checked="props.client.send" @onChange="updateHandler" />
    <p class="w-6">{{ props.index + 1 }}</p>
    <p class="w-48">{{ props.client.name }}</p>
    <p class="w-80">{{ props.client.email }}</p>
    <p class="w-28">{{ props.client.phone }}</p>
    <p class="w-60">{{ props.client.address }}</p>
    <p class="w-32">{{ props.client.status }}</p>
  </div>
</template>
<style scoped></style>
