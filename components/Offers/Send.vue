<script setup lang="ts">
import type { PotentialClient } from "~/data/interfaces";

const usePotentialClients = usePotentialClientsStore();
const { setError, setIsError } = useError();
const loading = ref<boolean>(false);
const files = ref<any>([]);
const text = ref<string>("");

const filteredData = reactive<any>([]);
const input = ref<string>("");

const sendHandler = async () => {
  loading.value = true;

  const recipients = usePotentialClients.potentialClients.filter((client) => client.send);

  const formData = new FormData();
  formData.append("message", text.value);
  formData.append("title", "Komercinis pasiūlymas");
  formData.append("to", JSON.stringify(recipients));

  files.value.forEach((file: any, index: number) => {
    formData.append(`file${index}`, file);
  });

  const response: any = await $fetch("http://localhost:3001/sendRetailOffers", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (response.success) {
    files.value = [];
    text.value = "";
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }

  loading.value = false;
};

const selectAllHandler = async (value: boolean) => {
  const requestData = { all: true, value };

  const response: any = await request.patch("selectClients", requestData);
  if (response.success) {
    usePotentialClients.selectPotentialClients(value);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const searchHandler = (value: string) => {
  input.value = value;
  if (value.length > 2) {
    const foundProjects = usePotentialClients.potentialClients.filter(
      (client: PotentialClient) =>
        client.address.toLowerCase().includes(value.toLowerCase()) ||
        client.email.toLowerCase().includes(value.toLowerCase()) ||
        client.phone.toLowerCase().includes(value.toLowerCase()) ||
        client.name.toLowerCase().includes(value.toLowerCase())
    );
    filteredData.value = [...foundProjects];
  } else {
    filteredData.value = [...usePotentialClients.potentialClients];
  }
};

const handleFileChange = (event: any) => {
  files.value = Array.from(event.target.files);
};

const removeFile = (index: number) => {
  files.value.splice(index, 1);
};

onMounted(() => {
  filteredData.value = [...usePotentialClients.potentialClients];
});

watch(
  () => usePotentialClients.potentialClients,
  (newClients) => {
    if (input.value.length === 0) filteredData.value = [...newClients];
  }
);
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex gap-4 items-center flex-wrap">
      <BaseButton name="siūsti pasiūlymą" @click="sendHandler" :isLoading="loading" />
      <BaseButton name="pažymėti visus" @click="selectAllHandler(true)" />
      <BaseButton name="atžymėti visus" @click="selectAllHandler(false)" />

      <div class="relative bg-dark-full text-white w-60 h-10 rounded-lg">
        <input
          id="file-upload"
          type="file"
          multiple
          @change="handleFileChange"
          class="inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        <label
          for="file-upload"
          class="absolute w-60 h-10 top-0 left-0 rounded-lg hover:cursor-pointer flex items-center justify-center"
        >
          Upload File
        </label>
      </div>
      <BaseInput
        :name="input"
        @onChange="searchHandler"
        variant="light"
        placeholder="Paieška"
        width="flex-1"
      >
        <NuxtImg
          src="/icons/search.svg"
          width="14"
          height="14"
          alt="search icon"
          decoding="auto"
          loading="lazy"
          :ismap="true"
      /></BaseInput>
    </div>

    <div v-if="files.length" class="flex flex-col gap-1">
      <p class="text-lg">Įkelti failai:</p>
      <ul class="text-white flex gap-2 flex-wrap">
        <li
          v-for="(file, index) in files"
          :key="index"
          class="bg-dark-full px-2 py-1 rounded-lg text-sm"
        >
          {{ file.name }}
          <button
            @click="removeFile(index)"
            class="ml-2 text-red-600 hover:text-black hover:bg-red-600 transition w-5 rounded-md"
          >
            ✕
          </button>
        </li>
      </ul>
    </div>

    <div>
      <label for="text">Teskstas klientui </label>
      <textarea
        v-model="text"
        name="message"
        id="text"
        class="w-full h-auto border border-dark-light rounded-lg p-2"
      ></textarea>
    </div>

    <div class="flex flex-col">
      <div class="flex gap-4 border-b-2 mb-1 px-2 w-fit">
        <p class="w-6 ml-8">Nr</p>
        <p class="w-48">Vardas</p>
        <p class="w-80">El. Paštas</p>
        <p class="w-28">Telefonas</p>
        <p class="w-60">Adresas</p>
        <p class="w-32">Statusas</p>
      </div>
      <div class="flex flex-col">
        <OffersSendUsers
          v-for="(client, index) in filteredData.value"
          :key="client?._id"
          :index="index"
          :client="client"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
