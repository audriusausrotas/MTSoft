<script setup lang="ts">
import { OffersStatus } from "~/data/selectFieldData";

const { setError, setIsError } = useError();
const usePotentialClients = usePotentialClientsStore();

const open = ref<boolean>(false);
const name = ref<string>("");
const email = ref<string>("");
const phone = ref<string>("");
const address = ref<string>("");
const status = ref<string>("Nežinoma");

const saveHandler = async () => {
  const client = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
    status: status.value,
  };

  const response: any = await $fetch("/api/potentialClients", {
    method: "post",
    body: client,
  });
  if (response.success) {
    usePotentialClients.addPotentialClient(response.data);
    setIsError(false);
    setError(response.message);
    cancelHandler();
  } else {
    setError(response.message);
  }
};

const cancelHandler = () => {
  name.value = "";
  email.value = "";
  phone.value = "";
  address.value = "";
  status.value = "Nežinoma";
  open.value = false;
};
</script>

<template>
  <div class="">
    <BaseButton v-if="!open" name="naujas klientas" @click="open = true" />
    <div v-else class="flex flex-col gap-4">
      <div class="flex gap-4">
        <BaseButton name="išsaugoti klientą" @click="saveHandler" />
        <BaseButton name="Atšaukti" @click="cancelHandler" />
      </div>
      <div class="flex gap-4 flex-wrap">
        <BaseInput
          label="Vardas"
          placeholder="vardas"
          @onChange="(value) => (name = value)"
        />
        <BaseInput
          label="el. paštas"
          placeholder="el. paštas"
          @onChange="(value) => (email = value)"
        />
        <BaseInput
          label="telefono numeris"
          placeholder="telefono numeris"
          @onChange="(value) => (phone = value)"
        />
        <BaseInput
          label="adresas"
          placeholder="adresas"
          @onChange="(value) => (address = value)"
        />
        <BaseSelectField
          id="pasiumynuStatusas"
          label="Statusas"
          :defaultValue="status"
          :values="OffersStatus"
          @onChange="(value) => (status = value)"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
