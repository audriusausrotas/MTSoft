<script setup lang="ts">
const props = defineProps(["order"]);
const { setError, setSuccess } = useError();

const clipboardHandler = async (value: string) => {
  if (!value) return;
  try {
    await navigator.clipboard.writeText(value);
    setSuccess("nukopijuota");
  } catch (err) {
    setError("įvyko klaida");
  }
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 w-full flex-wrap justify-around lg:justify-normal">
      <BaseInput
        :disable="true"
        :name="props.order?.client?.username"
        label="klientas"
        class="hover:cursor-pointer"
        @click="clipboardHandler(props.order?.client?.username)"
      />
      <BaseInput
        :disable="true"
        :name="props.order?.client?.address"
        label="adresas"
        width="w-96"
        class="hover:cursor-pointer"
        @click="clipboardHandler(props.order?.client?.address)"
      />

      <BaseInput
        :disable="true"
        :name="props.order?.client?.phone"
        label="telefono numeris"
        class="hover:cursor-pointer"
        @click="clipboardHandler(props.order?.client?.phone)"
      />

      <BaseInput
        :disable="true"
        :name="props.order?.creator?.username"
        label="Užsakovas"
        class="hover:cursor-pointer"
        @click="clipboardHandler(props.order?.creator?.username)"
      />
    </div>
    <div class="flex gap-4 w-full flex-wrap justify-around lg:justify-normal">
      <BaseInput
        :disable="true"
        :name="props.order?.orderNr"
        label="Užsakymo numeris"
        class="hover:cursor-pointer"
        @click="clipboardHandler(props.order?.client?.orderNr)"
      />
      <BaseInput
        :disable="true"
        :name="props.order?.deliveryMethod"
        label="Pristatymas"
        class="hover:cursor-pointer"
        @click="clipboardHandler(props.order?.deliveryMethod)"
      />
      <BaseInput
        :disable="true"
        :name="props.order?.orderDate"
        label="Užsakymo data"
        width="w-48"
        class="hover:cursor-pointer"
        @click="clipboardHandler(props.order?.orderDate)"
      />
      <BaseInput
        :disable="true"
        :name="props.order?.deliveryDate"
        label="Pristyti iki"
        width="w-48"
        class="hover:cursor-pointer"
        @click="clipboardHandler(props.order?.deliveryDate)"
      />
      <BaseInput
        :disable="true"
        :name="props.order?.status ? 'Užsakyta' : 'Baigta'"
        label="Būsena"
        width="w-56"
        class="hover:cursor-pointer"
        @click="clipboardHandler(props.order?.status ? 'Užsakyta' : 'Baigta')"
      />
    </div>
  </div>
</template>
<style scoped></style>
