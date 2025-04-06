<script setup lang="ts">
const { setError, setIsError } = useError();
const useProduction = useProductionStore();

const newOpen = ref<boolean>(false);
const orderNr = ref<string>("");
const orderAddress = ref<string>("");
const orderCreator = ref<string>("");
const loading = ref<boolean>(false);

const newHandler = async () => {
  loading.value = true;

  const requestData = {
    number: orderNr.value,
    address: orderAddress.value,
    creator: orderCreator.value,
  };

  const response: any = await request.post("addNewProduction", requestData);

  if (response.success) {
    !useSocketStore().connected && useProduction.addProduction(response.data);
    setIsError(false);
    setError(response.message);
    newOpen.value = false;
    orderNr.value = "";
    orderAddress.value = "";
    orderCreator.value = "";
  } else {
    setError(response.message);
  }
  loading.value = false;
};

const cancelHandler = () => {
  newOpen.value = false;
  orderNr.value = "";
  orderAddress.value = "";
  orderCreator.value = "";
};
</script>

<template>
  <BaseButton v-if="!newOpen" name="Sukurti naują" @click="newOpen = true" />

  <div v-else class="flex flex-col gap-4 w-full">
    <div class="flex gap-4">
      <BaseButton name="Išsaugoti užsakymą" @click="newHandler" />
      <BaseButton name="Atšaukti" @click="cancelHandler" />
    </div>
    <div class="flex gap-4">
      <BaseInput
        placeholder="Nr"
        width="w-24"
        :name="orderNr"
        @onChange="
          (value) => {
            orderNr = value;
          }
        "
      />
      <BaseInput
        placeholder="Adresas"
        width="min-w-40 flex-1"
        :name="orderAddress"
        @onChange="
          (value) => {
            orderAddress = value;
          }
        "
      />
      <BaseInput
        placeholder=" Kūrėjas"
        width="w-24"
        :name="orderCreator"
        @onChange="
          (value) => {
            orderCreator = value;
          }
        "
      />
    </div>
  </div>
</template>

<style scoped></style>
