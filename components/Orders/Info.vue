<script setup lang="ts">
const props = defineProps(["order"]);
const { setError, setSuccess } = useCustomError();

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
  <div class="flex flex-col gap-12">
    <div class="flex justify-center lg:justify-between gap-4 flex-wrap">
      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-semibold">Pristatymo duomenys</h3>
        <BaseInput
          :disable="true"
          :name="props.order?.orderDate"
          label="Užsakymo data"
          class="hover:cursor-pointer"
          @click="clipboardHandler(props.order?.orderDate)"
        />
        <BaseInput
          :disable="true"
          :name="props.order?.deliveryDate"
          label="Pristatyti iki"
          class="hover:cursor-pointer"
          @click="clipboardHandler(props.order?.deliveryDate)"
        />

        <BaseInput
          :disable="true"
          :name="props.order?.deliveryMethod"
          label="Pristatymas"
          class="hover:cursor-pointer"
          @click="clipboardHandler(props.order?.deliveryMethod)"
        />
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-semibold">Užsakymo duomenys</h3>

        <BaseInput
          :disable="true"
          :name="props.order?.creator?.email"
          label="Užsakovas"
          class="hover:cursor-pointer"
          @click="clipboardHandler(props.order?.creator?.username)"
        />
        <BaseInput
          :disable="true"
          :name="props.order?.status ? 'Užsakyta' : 'Baigta'"
          label="Būsena"
          class="hover:cursor-pointer"
          @click="clipboardHandler(props.order?.status ? 'Užsakyta' : 'Baigta')"
        />

        <BaseInput
          :disable="true"
          :name="props.order?.orderNr"
          label="Užsakymo numeris"
          class="hover:cursor-pointer"
          @click="clipboardHandler(props.order?.client?.orderNr)"
        />
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-semibold">Kliento duomenys</h3>
        <BaseInput
          :disable="true"
          :name="props.order?.client?.username"
          label="klientas"
          width="w-80"
          class="hover:cursor-pointer"
          @click="clipboardHandler(props.order?.client?.username)"
        />
        <BaseInput
          :disable="true"
          :name="props.order?.client?.address"
          label="adresas"
          width="w-80"
          class="hover:cursor-pointer"
          @click="clipboardHandler(props.order?.client?.address)"
        />

        <BaseInput
          :disable="true"
          :name="props.order?.client?.phone"
          label="telefono numeris"
          class="hover:cursor-pointer"
          width="w-80"
          @click="clipboardHandler(props.order?.client?.phone)"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
