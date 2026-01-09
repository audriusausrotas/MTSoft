<script setup lang="ts">
const { setError, setSuccess } = useError();

const open = ref<boolean>(false);
const username = ref<string>("");
const email = ref<string>("");
const phone = ref<string>("");
const address = ref<string>("");
const company = ref<string>("");

const saveHandler = async () => {
  const supplier = {
    username: username.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
    company: company.value,
  };

  const response: any = await request.post("newSupplier", supplier);
  if (response.success) {
    !useSocketStore().connected && useSuppliersStore().addSupplier(response.data);
    setSuccess(response.message);
  } else {
    setError(response.message);
  }

  cancelHandler();
};

const cancelHandler = () => {
  username.value = "";
  email.value = "";
  phone.value = "";
  address.value = "";
  company.value = "";
  open.value = false;
};
</script>

<template>
  <div class="">
    <BaseButton v-if="!open" name="naujas tiekėjas" @click="open = true" />
    <div v-else class="flex flex-col gap-4">
      <div class="flex gap-4">
        <BaseButton name="išsaugoti klientą" @click="saveHandler" />
        <BaseButton name="Atšaukti" @click="cancelHandler" />
      </div>
      <div class="flex gap-4 flex-wrap">
        <BaseInput label="Vardas" placeholder="vardas" @onChange="(value) => (username = value)" />
        <BaseInput
          label="įmonė"
          placeholder="įmonės pavadinimas"
          @onChange="(value) => (company = value)"
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
        <BaseInput label="adresas" placeholder="adresas" @onChange="(value) => (address = value)" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
