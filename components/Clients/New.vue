<script setup lang="ts">
const open = ref<boolean>(false);
const username = ref<string>("");
const email = ref<string>("");
const phone = ref<string>("");
const address = ref<string>("");

const saveHandler = () => {
  const client = {
    username: username.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
  };

  cancelHandler();
};

const cancelHandler = () => {
  username.value = "";
  email.value = "";
  phone.value = "";
  address.value = "";
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
        <BaseInput label="Vardas" placeholder="vardas" />
        <BaseInput label="el. paštas" placeholder="el. paštas" />
        <BaseInput label="telefono numeris" placeholder="telefono numeris" />
        <BaseInput label="adresas" placeholder="adresas" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
